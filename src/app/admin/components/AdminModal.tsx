'use client';
import React, { useState, useEffect, useRef } from 'react';
import { X, Save, Image as ImageIcon, Link as LinkIcon, Folder, LayoutGrid, Award, Briefcase, Trash2, Crop } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import ImageCropperModal from './ImageCropperModal';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  type: 'achievements' | 'projects' | 'experience';
  initialData?: any; // If null, we are adding new
  onSuccess: () => void;
  onDelete: (item: any) => void;
  allTags?: string[];
  items?: any[];
}

export default function AdminModal({ isOpen, onClose, type, initialData, onSuccess, onDelete, allTags = [], items = [] }: Props) {
  const [formData, setFormData] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [currentType, setCurrentType] = useState(type);
  const [isCropperOpen, setIsCropperOpen] = useState(false);
  const [masterImage, setMasterImage] = useState<string | null>(null);
  const [chosenMasterImage, setChosenMasterImage] = useState<string | null>(null);
  const [selectorUrls, setSelectorUrls] = useState<string[]>([]);
  const [activeCropTarget, setActiveCropTarget] = useState<'preview' | 'home' | 'highlight' | null>(null);
  const [activeRoleIndex, setActiveRoleIndex] = useState(0);
  const [currentTypeItems, setCurrentTypeItems] = useState<any[]>(items);

  useEffect(() => {
    if (formData.media && formData.media.length > 0 && !chosenMasterImage) {
      setChosenMasterImage(formData.media[0]);
    }
  }, [formData.media]);

  const handleEditCover = (target: 'preview' | 'home' | 'highlight' | null = null) => {
    if (chosenMasterImage) {
      setActiveCropTarget(target);
      setMasterImage(chosenMasterImage);
      setIsCropperOpen(true);
    } else {
      alert('Please upload media first before configuring covers.');
    }
  };

  const handleChangeMasterPhoto = () => {
    if (formData.media && formData.media.length > 1) {
      setSelectorUrls(formData.media);
    } else {
      alert('You only have one media item uploaded. Upload more to change the master cover photo.');
    }
  };

  useEffect(() => {
    if (currentType === type) {
      setCurrentTypeItems(items);
    } else {
      const fetchTypeItems = async () => {
        const tableName = currentType === 'experience' ? 'experiences' : currentType;
        const { data } = await supabase.from(tableName).select('*').order('updated_at', { ascending: false });
        setCurrentTypeItems(data || []);
      };
      fetchTypeItems();
    }
  }, [currentType, type, items]);

  useEffect(() => {
    if (isOpen) {
      const defaultData = initialData || { tags: [], media: [] };
      if (type === 'experience' && !initialData) {
        defaultData.roles = [{ position: '', isCurrent: true, startDate: '', endDate: '', location: '', locationType: '', skills: [], points: [], images: [] }];
      }
      setFormData(defaultData);
      setError(null);
      setMasterImage(null);
      setIsCropperOpen(false);
      setSelectorUrls([]);
      setConfirmDelete(false);
      setCurrentType(type);
      setActiveRoleIndex(0);
    }
  }, [isOpen, initialData, type]);

  useEffect(() => {
    if (currentType === 'experience' && (!formData.roles || formData.roles.length === 0)) {
      setFormData((prev: any) => ({ ...prev, roles: [{ position: '', isCurrent: true, startDate: '', endDate: '', location: '', locationType: '', skills: [], points: [], images: [] }] }));
      setActiveRoleIndex(0);
    }
  }, [currentType]);

  if (!isOpen) return null;

  const handleChange = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    const isTopRanked = typeof formData.rpRank === 'number' && formData.rpRank >= 1 && formData.rpRank <= 4;
    
    if (isTopRanked) {
      if (!formData.media || formData.media.length === 0) {
        alert("Top ranked items require media uploads.");
        return;
      }
      if (!formData.homeCover || !formData.previewCover || !formData.highlightCover) {
        alert("Top ranked items require all 3 cover images to be configured. Please configure them now.");
        handleEditCover(null);
        return;
      }
    }

    setLoading(true);
    setError(null);
    try {
      const dataToSave = { ...formData };
      if (!dataToSave.id && currentType !== 'experience') {
        const title = dataToSave.title || dataToSave.name;
        dataToSave.id = title ? title.toLowerCase().replace(/[^a-z0-9]+/g, '-') : Date.now().toString();
      }

      // Rank Cascading Logic
      const newR = dataToSave.rpRank;
      const oldR = initialData?.rpRank;

      if (newR !== oldR) {
        if (typeof newR === 'number') {
          if (typeof oldR !== 'number') {
            // Added new rank (Scenario A/D)
            const { data } = await supabase.from(currentType).select('id, rpRank').gte('rpRank', newR);
            if (data) {
              for (const item of data) {
                await supabase.from(currentType).update({ rpRank: item.rpRank + 1 }).eq('id', item.id);
              }
            }
          } else if (oldR > newR) {
            // Moved UP in rank (e.g., 4 to 2)
            const { data } = await supabase.from(currentType).select('id, rpRank').gte('rpRank', newR).lt('rpRank', oldR);
            if (data) {
              for (const item of data) {
                await supabase.from(currentType).update({ rpRank: item.rpRank + 1 }).eq('id', item.id);
              }
            }
          } else if (oldR < newR) {
            // Moved DOWN in rank (e.g., 2 to 4)
            const { data } = await supabase.from(currentType).select('id, rpRank').gt('rpRank', oldR).lte('rpRank', newR);
            if (data) {
              for (const item of data) {
                await supabase.from(currentType).update({ rpRank: item.rpRank - 1 }).eq('id', item.id);
              }
            }
          }
        } else if (typeof oldR === 'number') {
          // Rank removed (Scenario C)
          const { data } = await supabase.from(currentType).select('id, rpRank').gt('rpRank', oldR);
          if (data) {
            for (const item of data) {
              await supabase.from(currentType).update({ rpRank: item.rpRank - 1 }).eq('id', item.id);
            }
          }
        }
      }

      if (initialData) {
        const tableName = currentType === 'experience' ? 'experiences' : currentType;
        const matchField = 'id';
        const { error } = await supabase.from(tableName).update(dataToSave).eq(matchField, initialData[matchField]);
        if (error) throw error;
      } else {
        const tableName = currentType === 'experience' ? 'experiences' : currentType;
        const { error } = await supabase.from(tableName).insert([dataToSave]);
        if (error) throw error;
      }
      
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message || 'An error occurred while saving.');
    } finally {
      setLoading(false);
    }
  };

  const renderFields = () => {
    const getTopRanks = () => {
      const sorted = [...currentTypeItems]
        .filter(item => typeof item.rpRank === 'number')
        .sort((a, b) => a.rpRank - b.rpRank)
        .slice(0, 4);
      if (sorted.length === 0) return null;
      return (
        <div className="flex flex-col h-full space-y-2">
          <label className="text-sm font-medium text-neutral-400">Current Top Ranks</label>
          <div className="flex-1 flex flex-wrap items-center gap-x-4 gap-y-2 px-4 py-3 bg-white/[0.02] border border-white/5 rounded-2xl shadow-inner text-xs text-neutral-400">
            {sorted.map(s => (
              <span key={s.id} className="bg-white/5 px-2 py-1 rounded-md">#{s.rpRank}: {s.title || s.name || s.company}</span>
            ))}
          </div>
        </div>
      );
    };

    const getCoversPreview = () => {
      if (!formData.media || formData.media.length === 0) return null;
      return (
        <div className="space-y-4 pt-4 border-t border-white/5">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider flex items-center gap-2">
              <Crop className="w-4 h-4" /> Configured Covers
            </h4>
            {formData.media && formData.media.length > 1 && (
              <button
                type="button"
                onClick={handleChangeMasterPhoto}
                className="px-3 py-1.5 bg-white/10 hover:bg-white/20 border border-white/10 rounded-lg text-xs font-medium transition-all flex items-center gap-2 text-white"
              >
                Change Master Photo
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 bg-white/[0.02] p-4 rounded-2xl border border-white/5 items-start">
            
            <div className="flex flex-col space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-medium text-neutral-500">Square Cover (1:1)</span>
                <button type="button" onClick={() => handleEditCover('preview')} className="text-xs text-red-400 hover:text-red-300">
                  {formData.previewCover ? 'Change' : 'Set Cover'}
                </button>
              </div>
              <div className="w-full aspect-square rounded-xl overflow-hidden border border-white/10 relative bg-black shadow-inner">
                {formData.previewCover ? (
                  <img src={formData.previewCover} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-neutral-600">
                    <Crop className="w-6 h-6 mb-2 opacity-30" />
                    <span className="text-[10px] uppercase font-bold tracking-widest opacity-50">Not Set</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-medium text-neutral-500">Standard Cover (4:3)</span>
                <button type="button" onClick={() => handleEditCover('home')} className="text-xs text-red-400 hover:text-red-300">
                  {formData.homeCover ? 'Change' : 'Set Cover'}
                </button>
              </div>
              <div className="w-full aspect-[4/3] rounded-xl overflow-hidden border border-white/10 relative bg-black shadow-inner">
                {formData.homeCover ? (
                  <img src={formData.homeCover} alt="Home" className="absolute inset-0 w-full h-full object-cover" />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-neutral-600">
                    <Crop className="w-6 h-6 mb-2 opacity-30" />
                    <span className="text-[10px] uppercase font-bold tracking-widest opacity-50">Not Set</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-medium text-neutral-500">Wide Cover (16:9)</span>
                <button type="button" onClick={() => handleEditCover('highlight')} className="text-xs text-red-400 hover:text-red-300">
                  {formData.highlightCover ? 'Change' : 'Set Cover'}
                </button>
              </div>
              <div className="w-full aspect-video rounded-xl overflow-hidden border border-white/10 relative bg-black shadow-inner">
                {formData.highlightCover ? (
                  <img src={formData.highlightCover} alt="Highlight" className="absolute inset-0 w-full h-full object-cover" />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-neutral-600">
                    <Crop className="w-6 h-6 mb-2 opacity-30" />
                    <span className="text-[10px] uppercase font-bold tracking-widest opacity-50">Not Set</span>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      );
    };

    const getMediaPreview = () => {
      if (!formData.media || formData.media.length === 0) return null;
      return (
        <div className="space-y-4 pt-4 border-t border-white/5 mt-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider flex items-center gap-2">
              <ImageIcon className="w-4 h-4" /> Uploaded Media Gallery
            </h4>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-white/[0.02] p-4 rounded-2xl border border-white/5">
            {formData.media.map((url: string, idx: number) => (
              <div key={idx} className="relative group rounded-xl overflow-hidden aspect-video border border-white/10 bg-black shadow-inner">
                <img src={url} alt={`Media ${idx}`} className="absolute inset-0 w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => {
                    const newMedia = formData.media.filter((_: string, i: number) => i !== idx);
                    handleChange('media', newMedia);
                  }}
                  className="absolute top-2 right-2 p-1.5 bg-black/60 hover:bg-red-500/80 backdrop-blur-md rounded-full text-white opacity-0 group-hover:opacity-100 transition-all"
                  title="Remove Image"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      );
    };


    if (currentType === 'achievements') {
      return (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField label="ID" value={formData.id} onChange={(v: any) => handleChange('id', v)} placeholder="(Leave blank to auto-generate)" />
            <InputField label="Title" value={formData.title} onChange={(v: any) => handleChange('title', v)} />
            <InputField label="Date" type="date" value={formData.date} onChange={(v: any) => handleChange('date', v)} placeholder="YYYY-MM-DD" uppercase />
            <AutocompleteInputField 
              label="Category" 
              value={formData.category} 
              onChange={(v: any) => handleChange('category', v)} 
              suggestions={['Internship', 'Own Project', 'Fun Project', 'Everyday Help', 'Award', 'Certification', 'Hackathon']} 
              placeholder="Select or type new..."
            />
            <TagsInputField label="Tags" value={formData.tags || []} onChange={(v: any) => handleChange('tags', v)} allTags={allTags} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col space-y-2">
              <InputField label="RP Rank" type="number" value={formData.rpRank} onChange={(v: any) => handleChange('rpRank', parseInt(v))} />
            </div>
            {getTopRanks()}
          </div>
          <TextAreaField label="Description" value={formData.description} onChange={(v: any) => handleChange('description', v)} />
          
          <div className="space-y-4 pt-4 border-t border-white/5">
            <h4 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider flex items-center gap-2">
              <ImageIcon className="w-4 h-4" /> Media URLs
            </h4>
            
            <MediaPathField 
              label="Upload Images (Comma separated)" 
              value={formData.media || []} 
              onChange={(v: any) => handleChange('media', v)} 
              onUploadComplete={(urls: string[]) => {}}
              basePath="/achievements/" 
              itemId={formData.id || (formData.title || 'new').toLowerCase().replace(/[^a-z0-9]+/g, '-')} 
            />
            {getMediaPreview()}
            {getCoversPreview()}
          </div>
        </div>
      );
    }

    if (currentType === 'projects') {
      return (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField label="ID" value={formData.id} onChange={(v: any) => handleChange('id', v)} placeholder="(Leave blank to auto-generate)" />
            <InputField label="Name" value={formData.name} onChange={(v: any) => handleChange('name', v)} />
            <AutocompleteInputField 
              label="Category" 
              value={formData.category} 
              onChange={(v: any) => handleChange('category', v)} 
              suggestions={['Internship', 'Own Project', 'Fun Project', 'Everyday Help', 'Freelance', 'Open Source']} 
              placeholder="Select or type new..."
            />
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium text-neutral-400">Period (Month, Year)</label>
              <div className="flex gap-2">
                <CustomSelect 
                  placeholder="Month"
                  value={formData.period?.split(' ')[0]?.replace(',', '') || ''}
                  options={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']}
                  onChange={(val: string) => {
                    const year = formData.period?.split(' ')[1] || new Date().getFullYear().toString();
                    handleChange('period', `${val}, ${year}`);
                  }}
                />
                <CustomSelect 
                  placeholder="Year"
                  value={formData.period?.split(' ')[1] || ''}
                  options={Array.from({ length: 27 }, (_, i) => (2004 + i).toString())}
                  onChange={(val: string) => {
                    const month = formData.period?.split(' ')[0]?.replace(',', '') || 'Jan';
                    handleChange('period', `${month}, ${val}`);
                  }}
                />
              </div>
            </div>
          </div>
          <TagsInputField label="Tags" value={formData.tags || []} onChange={(v: any) => handleChange('tags', v)} allTags={allTags} />

          <div className="space-y-4 pt-4 border-t border-white/5">
            <h4 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider flex items-center gap-2">
              <LinkIcon className="w-4 h-4" /> Additional Info
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <InputField label="Client" value={formData.client} onChange={(v: any) => handleChange('client', v)} />
              <InputField label="Service" value={formData.service} onChange={(v: any) => handleChange('service', v)} />
              <InputField label="Live URL" value={formData.liveUrl} onChange={(v: any) => handleChange('liveUrl', v)} />
            </div>
          </div>

          <div className="space-y-6 pt-4 border-t border-white/5">
            <TextAreaField label="Description" value={formData.description} onChange={(v: any) => handleChange('description', v)} />
            
            <MediaPathField 
              label="Cover Image (Media 1)" 
              value={formData.media?.[0] ? [formData.media[0]] : []} 
              onChange={(v: any) => {
                const newMedia = [...(formData.media || [])];
                newMedia[0] = v[0] || '';
                handleChange('media', newMedia);
              }}
              onUploadComplete={(urls: string[]) => {}}
              basePath="/projects/" 
              itemId={formData.id || (formData.name || 'new').toLowerCase().replace(/[^a-z0-9]+/g, '-')} 
            />
            {formData.media?.[0] && <div className="w-32 h-20 relative rounded-xl overflow-hidden border border-white/10 -mt-2"><img src={formData.media[0]} className="object-cover w-full h-full" /></div>}

            <TextAreaField label="Info: Goal" value={formData.infoGoal} onChange={(v: any) => handleChange('infoGoal', v)} />
            
            <MediaPathField 
              label="Goal Image (Media 2)" 
              value={formData.media?.[1] ? [formData.media[1]] : []} 
              onChange={(v: any) => {
                const newMedia = [...(formData.media || [])];
                newMedia[1] = v[0] || '';
                handleChange('media', newMedia);
              }}
              onUploadComplete={(urls: string[]) => {}}
              basePath="/projects/" 
              itemId={formData.id || (formData.name || 'new').toLowerCase().replace(/[^a-z0-9]+/g, '-')} 
            />
            {formData.media?.[1] && <div className="w-32 h-20 relative rounded-xl overflow-hidden border border-white/10 -mt-2"><img src={formData.media[1]} className="object-cover w-full h-full" /></div>}

            <TextAreaField label="Info: Challenge" value={formData.infoChallenge} onChange={(v: any) => handleChange('infoChallenge', v)} />
            
            <MediaPathField 
              label="Challenge Image (Media 3)" 
              value={formData.media?.[2] ? [formData.media[2]] : []} 
              onChange={(v: any) => {
                const newMedia = [...(formData.media || [])];
                newMedia[2] = v[0] || '';
                handleChange('media', newMedia);
              }}
              onUploadComplete={(urls: string[]) => {}}
              basePath="/projects/" 
              itemId={formData.id || (formData.name || 'new').toLowerCase().replace(/[^a-z0-9]+/g, '-')} 
            />
            {formData.media?.[2] && <div className="w-32 h-20 relative rounded-xl overflow-hidden border border-white/10 -mt-2"><img src={formData.media[2]} className="object-cover w-full h-full" /></div>}

            <TextAreaField label="Info: Result" value={formData.infoResult} onChange={(v: any) => handleChange('infoResult', v)} />
            
            <MediaPathField 
              label="Result Image (Media 4)" 
              value={formData.media?.[3] ? [formData.media[3]] : []} 
              onChange={(v: any) => {
                const newMedia = [...(formData.media || [])];
                newMedia[3] = v[0] || '';
                handleChange('media', newMedia);
              }}
              onUploadComplete={(urls: string[]) => {}}
              basePath="/projects/" 
              itemId={formData.id || (formData.name || 'new').toLowerCase().replace(/[^a-z0-9]+/g, '-')} 
            />
            {formData.media?.[3] && <div className="w-32 h-20 relative rounded-xl overflow-hidden border border-white/10 -mt-2"><img src={formData.media[3]} className="object-cover w-full h-full" /></div>}
          </div>

          <div className="space-y-4 pt-4 border-t border-white/5">
            <h4 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider flex items-center gap-2">
              <Award className="w-4 h-4" /> Ranking & Covers
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col space-y-2">
                <InputField label="RP Rank" type="number" value={formData.rpRank} onChange={(v: any) => handleChange('rpRank', parseInt(v))} />
              </div>
              {getTopRanks()}
            </div>
            {getCoversPreview()}
          </div>
        </div>
      );
    }

    if (currentType === 'experience') {
      const roles = formData.roles || [];
      const addRole = () => {
        handleChange('roles', [...roles, { position: '', isCurrent: true, startDate: '', endDate: '', location: '', locationType: '', skills: [], points: [], images: [] }]);
        setActiveRoleIndex(roles.length);
      };
      const updateRole = (index: number, field: string, value: any) => {
        const newRoles = [...roles];
        newRoles[index] = { ...newRoles[index], [field]: value };
        handleChange('roles', newRoles);
      };
      const removeRole = (index: number) => {
        if (window.confirm('Are you sure you want to remove this role?')) {
          const newRoles = roles.filter((_: any, i: number) => i !== index);
          handleChange('roles', newRoles);
          setActiveRoleIndex(Math.max(0, index - 1));
        }
      };

      const handleCompanyChange = (val: string) => {
        handleChange('company', val);
        const existing = currentTypeItems.find(i => i.company?.toLowerCase() === val.toLowerCase());
        if (existing && !formData.id) {
          if (window.confirm(`Company '${val}' already exists. Edit the existing entry instead of creating a duplicate?`)) {
            handleChange('id', existing.id);
            handleChange('logo', existing.logo);
            handleChange('location', existing.location);
            handleChange('rpRank', existing.rpRank);
            
            const existingRoles = existing.roles || [];
            const newRole = { position: '', isCurrent: true, startDate: '', endDate: '', location: '', locationType: '', skills: [], points: [], images: [] };
            handleChange('roles', [...existingRoles, newRole]);
            setActiveRoleIndex(existingRoles.length); // auto open the new role
          }
        }
      };

      return (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <AutocompleteInputField 
              label="Company Name" 
              value={formData.company} 
              onChange={handleCompanyChange} 
              suggestions={currentTypeItems.map(i => i.company).filter(Boolean)}
              placeholder="e.g. Google"
            />
            <MediaPathField label="Company Logo" value={formData.logo ? [formData.logo] : []} onChange={(v: any) => handleChange('logo', v[0] || '')} onUploadComplete={(urls: string[]) => { if(urls[0]) handleChange('logo', urls[0]); }} basePath="/experience/" itemId={formData.id || (formData.company || 'new').toLowerCase().replace(/[^a-z0-9]+/g, '-')} />
          </div>
          
          <div className="space-y-4 pt-4 border-t border-white/5">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider">Roles at Company</h4>
              <button onClick={addRole} type="button" className="px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-semibold rounded-lg transition-all border border-red-500/20">
                + Add Role
              </button>
            </div>
            
            {roles.length > 0 ? (
              <div className="flex flex-col space-y-4">
                <div className="flex gap-2 overflow-x-auto custom-scrollbar pb-2">
                  {roles.map((r: any, idx: number) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveRoleIndex(idx)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${activeRoleIndex === idx ? 'bg-red-500 text-white' : 'bg-white/5 text-neutral-400 hover:bg-white/10'}`}
                    >
                      {r.position || `Role ${idx + 1}`}
                    </button>
                  ))}
                </div>

                {roles[activeRoleIndex] && (
                  <div className="bg-white/[0.02] border border-white/5 p-5 rounded-2xl space-y-5 relative">
                    <button type="button" onClick={() => removeRole(activeRoleIndex)} className="absolute top-4 right-4 p-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-all">
                      <Trash2 className="w-4 h-4" />
                    </button>
                    
                    {activeRoleIndex > 0 && roles[activeRoleIndex - 1].isCurrent !== false && (
                      <div className="bg-white/5 border border-white/10 p-4 rounded-xl mb-4">
                        <label className="flex items-center gap-3 cursor-pointer group">
                          <input type="checkbox" className="hidden" 
                            onChange={(e) => {
                              const checked = e.target.checked;
                              const newRoles = [...roles];
                              newRoles[activeRoleIndex - 1].isCurrent = !checked;
                              if (checked) {
                                newRoles[activeRoleIndex - 1].endDate = `Dec, ${new Date().getFullYear()}`;
                              } else {
                                newRoles[activeRoleIndex - 1].endDate = '';
                              }
                              handleChange('roles', newRoles);
                            }}
                            checked={roles[activeRoleIndex - 1].isCurrent === false}
                          />
                          <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${roles[activeRoleIndex - 1].isCurrent === false ? 'bg-red-500 border-red-500' : 'border-white/20 bg-transparent group-hover:border-red-500/50'}`}>
                            {roles[activeRoleIndex - 1].isCurrent === false && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                          </div>
                          <span className="text-sm font-medium text-white group-hover:text-red-300 transition-colors">
                            End previous role as {roles[activeRoleIndex - 1].position || 'Unknown Role'}
                          </span>
                        </label>
                      </div>
                    )}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <InputField label="Role Title (Position)" value={roles[activeRoleIndex].position} onChange={(v: any) => updateRole(activeRoleIndex, 'position', v)} />
                      <div className="flex flex-col space-y-2 justify-center pt-6">
                        <label className="flex items-center gap-3 cursor-pointer group">
                          <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${roles[activeRoleIndex].isCurrent !== false ? 'bg-red-500 border-red-500' : 'border-white/20 bg-transparent group-hover:border-red-500/50'}`}>
                            {roles[activeRoleIndex].isCurrent !== false && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                          </div>
                          <input type="checkbox" className="hidden" checked={roles[activeRoleIndex].isCurrent !== false} onChange={(e) => updateRole(activeRoleIndex, 'isCurrent', e.target.checked)} />
                          <span className="text-sm font-medium text-white group-hover:text-red-300 transition-colors">Currently Working Here</span>
                        </label>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col space-y-2">
                        <label className="text-sm font-medium text-neutral-400">Start Date</label>
                        <div className="flex gap-2">
                          <CustomSelect placeholder="Month" value={roles[activeRoleIndex].startDate?.split(', ')[0] || ''} options={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']} onChange={(v: string) => { const year = roles[activeRoleIndex].startDate?.split(', ')[1] || new Date().getFullYear().toString(); updateRole(activeRoleIndex, 'startDate', `${v}, ${year}`); }} />
                          <CustomSelect placeholder="Year" value={roles[activeRoleIndex].startDate?.split(', ')[1] || ''} options={Array.from({ length: 27 }, (_, i) => (2004 + i).toString())} onChange={(v: string) => { const month = roles[activeRoleIndex].startDate?.split(', ')[0] || 'Jan'; updateRole(activeRoleIndex, 'startDate', `${month}, ${v}`); }} />
                        </div>
                      </div>
                      
                      {roles[activeRoleIndex].isCurrent === false && (
                        <div className="flex flex-col space-y-2">
                          <label className="text-sm font-medium text-neutral-400">End Date</label>
                          <div className="flex gap-2">
                            <CustomSelect placeholder="Month" value={roles[activeRoleIndex].endDate?.split(', ')[0] || ''} options={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']} onChange={(v: string) => { const year = roles[activeRoleIndex].endDate?.split(', ')[1] || new Date().getFullYear().toString(); updateRole(activeRoleIndex, 'endDate', `${v}, ${year}`); }} />
                            <CustomSelect placeholder="Year" value={roles[activeRoleIndex].endDate?.split(', ')[1] || ''} options={Array.from({ length: 27 }, (_, i) => (2004 + i).toString())} onChange={(v: string) => { const month = roles[activeRoleIndex].endDate?.split(', ')[0] || 'Jan'; updateRole(activeRoleIndex, 'endDate', `${month}, ${v}`); }} />
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <InputField label="Location (City, Country)" value={roles[activeRoleIndex].location} onChange={(v: any) => updateRole(activeRoleIndex, 'location', v)} />
                      <div className="flex flex-col space-y-2">
                        <label className="text-sm font-medium text-neutral-400">Location Type</label>
                        <CustomSelect placeholder="Select Type" value={roles[activeRoleIndex].locationType || ''} options={['On-site', 'Remote', 'Hybrid']} onChange={(v: string) => updateRole(activeRoleIndex, 'locationType', v)} />
                      </div>
                    </div>

                    <TagsInputField label="Skills" value={roles[activeRoleIndex].skills || []} onChange={(v: any) => updateRole(activeRoleIndex, 'skills', v)} allTags={allTags} />
                    
                    <TextAreaField label="Description / Bullet Points (One per line)" value={(roles[activeRoleIndex].points || []).join('\n')} onChange={(v: string) => updateRole(activeRoleIndex, 'points', v.split('\n').filter(Boolean))} />

                    <div className="pt-2">
                      <MediaPathField 
                        label="Media for this Role" 
                        value={roles[activeRoleIndex].images || []} 
                        onChange={(v: any) => updateRole(activeRoleIndex, 'images', v)} 
                        onUploadComplete={(urls: string[]) => updateRole(activeRoleIndex, 'images', [...(roles[activeRoleIndex].images || []), ...urls])} 
                        basePath="/experience/" 
                        itemId={`${formData.id || 'new'}-role-${activeRoleIndex}`} 
                      />
                      {roles[activeRoleIndex].images?.length > 0 && (
                        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
                          {roles[activeRoleIndex].images.map((url: string, idx: number) => {
                            const safeUrl = url.startsWith('http') || url.startsWith('/') ? url : `/${url}`;
                            return (
                              <div key={idx} className="relative group rounded-xl overflow-hidden aspect-video border border-white/10 bg-black">
                                {safeUrl.toLowerCase().endsWith('.pdf') ? (
                                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/5 text-neutral-400 p-2">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-1"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                                    <span className="text-[10px] truncate w-full text-center">{safeUrl.split('/').pop()}</span>
                                  </div>
                                ) : safeUrl.toLowerCase().match(/\.(mp4|webm|ogg)$/) ? (
                                  <video src={safeUrl} className="absolute inset-0 w-full h-full object-cover" muted loop playsInline />
                                ) : (
                                  <img src={safeUrl} className="absolute inset-0 w-full h-full object-cover bg-neutral-900" />
                                )}
                                <button type="button" onClick={() => updateRole(activeRoleIndex, 'images', roles[activeRoleIndex].images.filter((_: any, i: number) => i !== idx))} className="absolute top-2 right-2 p-1.5 bg-black/60 hover:bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all"><X className="w-3 h-3" /></button>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8 bg-white/[0.02] border border-white/5 rounded-2xl">
                <p className="text-neutral-500 text-sm">No roles added yet.</p>
              </div>
            )}
          </div>
        </div>
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center sm:p-6 bg-black/80 backdrop-blur-xl">
      <div className="bg-[#0a0a0b] border-0 sm:border border-white/10 w-full h-full sm:h-auto max-w-4xl sm:max-h-[90vh] rounded-none sm:rounded-[2rem] shadow-2xl flex flex-col overflow-hidden relative">
        {/* Glow Effects */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-8 border-b border-white/5 relative z-10 gap-3 sm:gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white mb-4 sm:mb-0">
              {initialData ? (
                <span className="flex items-center gap-3">Edit <span className="text-neutral-400 capitalize">{currentType}</span></span>
              ) : (
                'Create New Entry'
              )}
            </h2>
            
            {!initialData && (
              <div className="flex bg-white/5 p-1 rounded-xl w-full sm:w-fit mb-6 overflow-x-auto hide-scrollbar">
                {[
                  { id: 'achievements', label: 'Achievement', icon: Award },
                  { id: 'projects', label: 'Project', icon: LayoutGrid },
                  { id: 'experience', label: 'Experience', icon: Briefcase }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setCurrentType(tab.id as any)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      currentType === tab.id
                        ? 'bg-red-500/20 text-red-300 shadow-[0_0_15px_rgba(239,68,68,0.2)] border border-red-500/30'
                        : 'text-neutral-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button onClick={onClose} className="p-2 sm:p-3 bg-white/5 hover:bg-white/10 border border-white/5 rounded-full text-neutral-400 hover:text-white transition-all self-start sm:self-auto">
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-3 sm:space-y-4 custom-scrollbar relative z-10">
          {error && <div className="p-3 sm:p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-medium">{error}</div>}
          {renderFields()}
        </div>

        <div className="p-4 sm:p-8 border-t border-white/5 flex justify-between items-center bg-[#111113]/80 backdrop-blur-xl relative z-10">
          <div>
            {initialData && (
              <button 
                onClick={async () => {
                  if (confirmDelete) {
                    setLoading(true);
                    await onDelete(initialData);
                    setLoading(false);
                    onClose();
                  } else {
                    setConfirmDelete(true);
                  }
                }} 
                className={`px-6 py-3 border rounded-full text-sm font-bold flex items-center space-x-2 transition-all ${
                  confirmDelete 
                    ? 'bg-red-500 hover:bg-red-600 border-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.5)]' 
                    : 'bg-white/5 hover:bg-red-500/20 border-transparent hover:border-red-500/30 text-neutral-400 hover:text-red-400'
                }`}
              >
                <Trash2 className="w-4 h-4" />
                <span>{confirmDelete ? 'Click again to confirm' : 'Delete Entry'}</span>
              </button>
            )}
          </div>
          <button 
            onClick={handleSave} 
            disabled={loading}
            className="px-8 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-400 hover:to-red-500 rounded-full text-sm font-bold flex items-center space-x-2 transition-all disabled:opacity-50 shadow-[0_0_20px_rgba(239,68,68,0.3)] hover:shadow-[0_0_30px_rgba(239,68,68,0.5)]"
          >
            {loading ? <span className="animate-pulse">Saving...</span> : <Save className="w-4 h-4" />}
            <span>{loading ? 'Saving...' : 'Save Changes'}</span>
          </button>
        </div>
      </div>

      {isCropperOpen && masterImage && (
        <ImageCropperModal
          isOpen={isCropperOpen}
          onClose={() => setIsCropperOpen(false)}
          imageUrl={masterImage}
          itemId={formData.id || (formData.title || formData.name || formData.company || 'new').toLowerCase().replace(/[^a-z0-9]+/g, '-')}
          basePath={`/${currentType}s/`}
          targetCrop={activeCropTarget}
          existingUrls={{
            preview: formData.previewCover,
            home: formData.homeCover,
            highlight: formData.highlightCover
          }}
          onComplete={(urls) => {
            if (urls.preview) handleChange('previewCover', urls.preview);
            if (urls.home) handleChange('homeCover', urls.home);
            if (urls.highlight) handleChange('highlightCover', urls.highlight);
          }}
        />
      )}

      {selectorUrls.length > 0 && (
        <ImageSelectorModal 
          isOpen={selectorUrls.length > 0} 
          urls={selectorUrls} 
          onClose={() => setSelectorUrls([])} 
          onSelect={(url: string) => {
            setChosenMasterImage(url);
            setMasterImage(url);
            setSelectorUrls([]);
          }} 
        />
      )}
    </div>
  );
}

const ImageSelectorModal = ({ isOpen, urls, onSelect, onClose }: any) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[250] flex items-center justify-center bg-black/90 backdrop-blur-sm p-6">
      <div className="bg-[#0a0a0b] border border-white/10 p-6 rounded-3xl max-w-2xl w-full shadow-2xl">
        <h3 className="text-xl font-bold text-white mb-2">Select Master Cover</h3>
        <p className="text-sm text-neutral-400 mb-6">You uploaded multiple images. Which one should be the cover?</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-h-[60vh] overflow-y-auto custom-scrollbar pr-2">
          {urls.map((url: string) => (
            <img 
              key={url} 
              src={url} 
              alt="cover choice" 
              onClick={() => onSelect(url)}
              className="w-full h-32 object-cover rounded-xl border border-white/10 hover:border-red-500 cursor-pointer hover:opacity-80 transition-all"
            />
          ))}
        </div>
        <button onClick={onClose} className="mt-6 w-full py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl transition-all font-medium">Cancel</button>
      </div>
    </div>
  );
};

const CustomSelect = ({ value, onChange, options, placeholder }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative flex-1" ref={dropdownRef}>
      <div 
        className="flex items-center justify-between w-full bg-[#0a0a0b] border border-white/5 rounded-xl px-4 py-2.5 text-sm text-white cursor-pointer hover:border-red-500/50 transition-all shadow-inner"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={value ? "text-white" : "text-neutral-500"}>{value || placeholder}</span>
        <svg className={`w-4 h-4 text-neutral-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
      </div>
      {isOpen && (
        <div className="absolute top-full mt-2 w-full bg-[#111113] border border-white/10 rounded-2xl shadow-xl z-50 max-h-48 overflow-y-auto custom-scrollbar">
          {options.map((opt: string) => (
            <div 
              key={opt}
              className={`px-4 py-2 text-sm cursor-pointer hover:bg-white/5 transition-colors ${value === opt ? 'bg-red-500/10 text-red-400' : 'text-neutral-300'}`}
              onClick={() => {
                onChange(opt);
                setIsOpen(false);
              }}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const AutocompleteInputField = ({ label, value, onChange, suggestions = [], placeholder = '' }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filtered = suggestions.filter((s: string) => s.toLowerCase().includes((value || '').toLowerCase()) && s.toLowerCase() !== (value || '').toLowerCase());

  return (
    <div className="flex flex-col space-y-2 relative" ref={containerRef}>
      <label className="text-sm font-medium text-neutral-400">{label}</label>
      <input 
        type="text"
        value={value || ''}
        onChange={(e) => {
          onChange(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        placeholder={placeholder}
        className="w-full px-4 py-3 bg-[#0a0a0b] border border-white/5 rounded-2xl text-sm text-white focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 transition-all placeholder:text-neutral-600 shadow-inner"
      />
      {isOpen && filtered.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-[#111113] border border-white/10 rounded-2xl shadow-xl z-50 max-h-48 overflow-y-auto custom-scrollbar">
          {filtered.map((opt: string) => (
            <div 
              key={opt}
              className="px-4 py-2 text-sm cursor-pointer hover:bg-white/5 text-neutral-300 transition-colors border-b border-white/5 last:border-0"
              onClick={() => {
                onChange(opt);
                setIsOpen(false);
              }}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const InputField = ({ label, value, onChange, type = 'text', placeholder = '', uppercase = false }: any) => {
  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm font-medium text-neutral-400">{label}</label>
      <input 
        type={type}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full px-4 py-3 bg-[#0a0a0b] border border-white/5 rounded-2xl text-sm text-white focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 transition-all placeholder:text-neutral-600 shadow-inner ${type === 'date' ? '[color-scheme:dark] [&::-webkit-calendar-picker-indicator]:cursor-pointer' : ''} ${uppercase ? 'uppercase' : ''}`}
      />
    </div>
  );
};

const TagsInputField = ({ label, value = [], onChange, allTags = [] }: any) => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (inputValue.trim()) {
      const filtered = allTags.filter((t: string) => 
        t.toLowerCase().includes(inputValue.toLowerCase()) && !value.includes(t)
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [inputValue, allTags, value]);

  const addTag = (tag: string) => {
    const trimmed = tag.trim();
    if (trimmed && !value.includes(trimmed)) {
      onChange([...value, trimmed]);
    }
    setInputValue('');
    setShowSuggestions(false);
  };

  const removeTag = (tagToRemove: string) => {
    onChange(value.filter((t: string) => t !== tagToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag(inputValue);
    } else if (e.key === 'Backspace' && !inputValue && value.length > 0) {
      removeTag(value[value.length - 1]);
    }
  };

  return (
    <div className="flex flex-col space-y-2 relative sm:col-span-1">
      <label className="text-sm font-medium text-neutral-400">{label}</label>
      <div className="flex flex-wrap items-center gap-2 px-3 py-2 bg-[#0a0a0b] border border-white/5 rounded-2xl focus-within:border-red-500/50 focus-within:ring-1 focus-within:ring-red-500/50 transition-all shadow-inner min-h-[50px]">
        {value.map((tag: string) => (
          <span key={tag} className="flex items-center gap-1 px-3 py-1 bg-red-500/10 text-red-400 border border-red-500/20 rounded-xl text-sm">
            {tag}
            <button onClick={() => removeTag(tag)} className="hover:text-white transition-colors ml-1">
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
        <input 
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => { if (inputValue) setShowSuggestions(true); }}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          placeholder={value.length === 0 ? "Type a tag and press enter or comma" : "Add tag..."}
          className="flex-1 min-w-[120px] bg-transparent text-sm text-white focus:outline-none placeholder:text-neutral-600"
        />
      </div>
      
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full mt-1 left-0 w-full max-h-48 overflow-y-auto bg-[#111113] border border-white/10 rounded-2xl shadow-xl z-50 custom-scrollbar">
          {suggestions.map(tag => (
            <button
              key={tag}
              onClick={() => addTag(tag)}
              className="w-full text-left px-4 py-2 text-sm text-neutral-300 hover:bg-white/5 hover:text-white transition-colors border-b border-white/5 last:border-0"
            >
              {tag}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const TextAreaField = ({ label, value, onChange, placeholder = '' }: any) => (
  <div className="flex flex-col space-y-2">
    <label className="text-sm font-medium text-neutral-400">{label}</label>
    <textarea 
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={4}
      className="w-full px-4 py-3 bg-[#0a0a0b] border border-white/5 rounded-2xl text-sm text-white focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 transition-all custom-scrollbar placeholder:text-neutral-600 shadow-inner"
    />
  </div>
);

const MediaPathField = ({ label, value, onChange, onUploadComplete, basePath, itemId = 'misc' }: any) => {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>, isArray: boolean) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    try {
      const urls: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const categoryFolder = basePath.replace(/\//g, '');
        // Keep original filename but remove spaces/special chars just in case
        const safeFileName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, '-');
        
        // This creates the organized structure: e.g. 'achievements/sundar-pichai/1.jpg'
        const filePath = `${categoryFolder}/${itemId}/${safeFileName}`;
        
        // Upload to a 'media' bucket in Supabase (upsert: true overwrites if exists)
        const { error } = await supabase.storage.from('media').upload(filePath, file, { upsert: true });
        if (error) throw error;
        
        const { data: { publicUrl } } = supabase.storage.from('media').getPublicUrl(filePath);
        urls.push(publicUrl);
      }

      if (isArray) {
        const currentVals = Array.isArray(value) ? value : [];
        onChange([...currentVals, ...urls]);
      } else {
        onChange(urls[0]);
      }

      if (onUploadComplete) {
        onUploadComplete(urls);
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Failed to upload image. Please ensure you have a 'media' storage bucket in Supabase.");
    } finally {
      setUploading(false);
      e.target.value = ''; // Reset input
    }
  };

  if (Array.isArray(value)) {
    const displayValue = value.map(v => v.startsWith(basePath) ? v.slice(basePath.length) : v).join(', ');
    const handleChange = (e: any) => {
      const arr = e.target.value.split(',').map((s: string) => {
        const trimmed = s.trim();
        // Don't auto-prefix if it's already an absolute URL (like our Supabase uploads)
        return trimmed ? (trimmed.startsWith('http') || trimmed.startsWith(basePath) ? trimmed : `${basePath}${trimmed}`) : '';
      }).filter(Boolean);
      onChange(arr);
    };
    return (
      <div className="flex flex-col space-y-2 relative">
        <label className="text-sm font-medium text-neutral-400 flex items-center justify-between">
          {label}
          <div className="relative group cursor-pointer overflow-hidden rounded-lg">
            <input type="file" multiple accept="image/*" onChange={(e) => handleUpload(e, true)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
            <button type="button" disabled={uploading} className="px-3 py-1 bg-white/10 group-hover:bg-white/20 border border-white/10 rounded-lg text-xs flex items-center gap-1 transition-all">
              {uploading ? 'Uploading...' : 'Upload Image'}
            </button>
          </div>
        </label>
        <div className="flex items-center bg-[#0a0a0b] border border-white/5 rounded-2xl overflow-hidden focus-within:border-red-500/50 focus-within:ring-1 focus-within:ring-red-500/50 transition-all shadow-inner">
          <div className="flex items-center justify-center pl-4 pr-3 py-3 bg-white/[0.02] border-r border-white/5 text-neutral-500 select-none space-x-2">
            <Folder className="w-4 h-4 text-red-400/70" />
            <span className="text-sm font-medium whitespace-nowrap">{basePath}</span>
          </div>
          <input 
            type="text"
            value={displayValue}
            onChange={handleChange}
            placeholder="filename1.jpg, filename2.jpg"
            className="w-full px-4 py-3 bg-transparent text-sm text-white focus:outline-none placeholder:text-neutral-600"
          />
        </div>
      </div>
    );
  }

  const displayValue = (value || '').startsWith(basePath) ? (value || '').slice(basePath.length) : (value || '');
  const handleChange = (e: any) => {
    const val = e.target.value;
    onChange(val ? (val.startsWith('http') || val.startsWith(basePath) ? val : `${basePath}${val}`) : '');
  };

  return (
    <div className="flex flex-col space-y-2 relative">
      <label className="text-sm font-medium text-neutral-400 flex items-center justify-between">
        {label}
        <div className="relative group cursor-pointer overflow-hidden rounded-lg">
          <input type="file" accept="image/*" onChange={(e) => handleUpload(e, false)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
          <button type="button" disabled={uploading} className="px-3 py-1 bg-white/10 group-hover:bg-white/20 border border-white/10 rounded-lg text-xs flex items-center gap-1 transition-all">
            {uploading ? 'Uploading...' : 'Upload'}
          </button>
        </div>
      </label>
      <div className="flex items-center bg-[#0a0a0b] border border-white/5 rounded-2xl overflow-hidden focus-within:border-red-500/50 focus-within:ring-1 focus-within:ring-red-500/50 transition-all shadow-inner">
        <div className="flex items-center justify-center pl-4 pr-3 py-3 bg-white/[0.02] border-r border-white/5 text-neutral-500 select-none space-x-2">
          <Folder className="w-4 h-4 text-red-400/70" />
          <span className="text-sm font-medium">{basePath}</span>
        </div>
        <input 
          type="text"
          value={displayValue}
          onChange={handleChange}
          placeholder="filename.jpg"
          className="w-full px-4 py-3 bg-transparent text-sm text-white focus:outline-none placeholder:text-neutral-600"
        />
      </div>
    </div>
  );
};
