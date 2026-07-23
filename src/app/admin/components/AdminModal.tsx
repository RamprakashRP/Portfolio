'use client';
import React, { useState, useEffect } from 'react';
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
  const [selectorUrls, setSelectorUrls] = useState<string[]>([]);

  useEffect(() => {
    if (isOpen) {
      setFormData(initialData || { tags: [], media: [] });
      setError(null);
      setMasterImage(null);
      setIsCropperOpen(false);
      setSelectorUrls([]);
      setConfirmDelete(false);
      setCurrentType(type);
    }
  }, [isOpen, initialData, type]);

  if (!isOpen) return null;

  const handleChange = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (field: string, value: string) => {
    const arr = value.split(',').map(s => s.trim()).filter(Boolean);
    setFormData((prev: any) => ({ ...prev, [field]: arr }));
  };

  const handleConfigureCovers = () => {
    if (formData.media && formData.media.length > 0) {
      if (formData.media.length === 1) {
        setMasterImage(formData.media[0]);
        setIsCropperOpen(true);
      } else {
        setSelectorUrls(formData.media);
      }
    } else {
      alert('Please upload media first before configuring covers.');
    }
  };

  const handleSave = async () => {
    const isTopRanked = typeof formData.rpRank === 'number' && formData.rpRank >= 1 && formData.rpRank <= 4;
    const hasMedia = formData.media && formData.media.length > 0;
    const hasCovers = formData.homeCover || formData.previewCover || formData.highlightCover;
    
    if (isTopRanked && hasMedia && !hasCovers) {
      alert("Top ranked items require cover images. Please configure them now.");
      handleConfigureCovers();
      return;
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
        const matchField = currentType === 'experience' ? 'id' : 'id';
        const { error } = await supabase.from(currentType).update(dataToSave).eq(matchField, initialData[matchField]);
        if (error) throw error;
      } else {
        const { error } = await supabase.from(currentType).insert([dataToSave]);
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
      if (!items || items.length === 0) return null;
      const sorted = [...items]
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
      if (!formData.homeCover && !formData.previewCover && !formData.highlightCover) return null;
      return (
        <div className="space-y-4 pt-4 border-t border-white/5">
          <h4 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider flex items-center gap-2">
            <Crop className="w-4 h-4" /> Configured Covers
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white/[0.02] p-4 rounded-2xl border border-white/5">
            {formData.homeCover && (
              <div className="flex flex-col space-y-2">
                <span className="text-xs font-medium text-neutral-500">Home Cover (16:9)</span>
                <div className="w-full aspect-video rounded-xl overflow-hidden border border-white/10 relative bg-black shadow-inner">
                  <img src={formData.homeCover} alt="Home" className="absolute inset-0 w-full h-full object-cover" />
                </div>
              </div>
            )}
            {formData.previewCover && (
              <div className="flex flex-col space-y-2">
                <span className="text-xs font-medium text-neutral-500">Preview Cover (9:16)</span>
                <div className="w-full aspect-[9/16] max-w-[120px] rounded-xl overflow-hidden border border-white/10 relative bg-black shadow-inner">
                  <img src={formData.previewCover} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />
                </div>
              </div>
            )}
            {formData.highlightCover && (
              <div className="flex flex-col space-y-2">
                <span className="text-xs font-medium text-neutral-500">Highlight Cover (1:1)</span>
                <div className="w-full aspect-square max-w-[120px] rounded-xl overflow-hidden border border-white/10 relative bg-black shadow-inner">
                  <img src={formData.highlightCover} alt="Highlight" className="absolute inset-0 w-full h-full object-cover" />
                </div>
              </div>
            )}
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
            {typeof formData.rpRank === 'number' && formData.rpRank >= 1 && formData.rpRank <= 4 && (
              <button
                type="button"
                onClick={handleConfigureCovers}
                className="px-3 py-1.5 bg-white/10 hover:bg-white/20 border border-white/10 rounded-lg text-xs font-medium transition-all flex items-center gap-2"
              >
                <Crop className="w-3 h-3" /> Re-Configure Covers
              </button>
            )}
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
            <TagsInputField label="Tags" value={formData.tags || []} onChange={(v: any) => handleChange('tags', v)} allTags={allTags} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col space-y-2">
              <InputField label="RP Rank" type="number" value={formData.rpRank} onChange={(v: any) => handleChange('rpRank', parseInt(v))} />
              {typeof formData.rpRank === 'number' && formData.rpRank >= 1 && formData.rpRank <= 4 && formData.media && formData.media.length > 0 && (
                <button
                  type="button"
                  onClick={handleConfigureCovers}
                  className="mt-1 w-full px-4 py-2 bg-gradient-to-r from-red-500/20 to-red-500/10 hover:from-red-500/30 hover:to-red-500/20 border border-red-500/30 rounded-xl text-red-100 text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-inner"
                >
                  <Crop className="w-4 h-4" /> Configure Covers
                </button>
              )}
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
              onUploadComplete={(urls: string[]) => {
                const isTopRanked = typeof formData.rpRank === 'number' && formData.rpRank >= 1 && formData.rpRank <= 4;
                if (isTopRanked && urls.length > 0) {
                  if (urls.length === 1) {
                    setMasterImage(urls[0]);
                    setIsCropperOpen(true);
                  } else {
                    setSelectorUrls(urls);
                  }
                }
              }}
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
            <InputField label="Category" value={formData.category} onChange={(v: any) => handleChange('category', v)} />
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium text-neutral-400">Period (Month, Year)</label>
              <div className="flex gap-2">
                <select 
                  className="flex-1 bg-[#0a0a0b] border border-white/5 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-red-500/50 transition-all shadow-inner"
                  value={formData.period?.split(' ')[0]?.replace(',', '') || ''}
                  onChange={(e) => {
                    const year = formData.period?.split(' ')[1] || new Date().getFullYear().toString();
                    handleChange('period', `${e.target.value}, ${year}`);
                  }}
                >
                  <option value="" disabled className="text-neutral-500">Month</option>
                  {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(m => (
                    <option key={m} value={m} className="bg-[#111]">{m}</option>
                  ))}
                </select>
                <select
                  className="flex-1 bg-[#0a0a0b] border border-white/5 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-red-500/50 transition-all shadow-inner"
                  value={formData.period?.split(' ')[1] || ''}
                  onChange={(e) => {
                    const month = formData.period?.split(' ')[0]?.replace(',', '') || 'Jan';
                    handleChange('period', `${month}, ${e.target.value}`);
                  }}
                >
                  <option value="" disabled className="text-neutral-500">Year</option>
                  {Array.from({ length: 27 }, (_, i) => 2004 + i).map(y => (
                    <option key={y} value={y} className="bg-[#111]">{y}</option>
                  ))}
                </select>
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
              onUploadComplete={(urls: string[]) => {
                const isTopRanked = typeof formData.rpRank === 'number' && formData.rpRank >= 1 && formData.rpRank <= 4;
                if (urls.length > 0) {
                  const newMedia = [...(formData.media || [])];
                  newMedia[0] = urls[0];
                  handleChange('media', newMedia);
                  if (isTopRanked) {
                    setMasterImage(urls[0]);
                    setIsCropperOpen(true);
                  }
                }
              }}
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
              onUploadComplete={(urls: string[]) => {
                if (urls.length > 0) {
                  const newMedia = [...(formData.media || [])];
                  newMedia[1] = urls[0];
                  handleChange('media', newMedia);
                }
              }}
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
              onUploadComplete={(urls: string[]) => {
                if (urls.length > 0) {
                  const newMedia = [...(formData.media || [])];
                  newMedia[2] = urls[0];
                  handleChange('media', newMedia);
                }
              }}
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
              onUploadComplete={(urls: string[]) => {
                if (urls.length > 0) {
                  const newMedia = [...(formData.media || [])];
                  newMedia[3] = urls[0];
                  handleChange('media', newMedia);
                }
              }}
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
                {typeof formData.rpRank === 'number' && formData.rpRank >= 1 && formData.rpRank <= 4 && formData.media && formData.media.length > 0 && (
                  <button
                    type="button"
                    onClick={handleConfigureCovers}
                    className="mt-1 w-full px-4 py-2 bg-gradient-to-r from-red-500/20 to-red-500/10 hover:from-red-500/30 hover:to-red-500/20 border border-red-500/30 rounded-xl text-red-100 text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-inner"
                  >
                    <Crop className="w-4 h-4" /> Configure Covers
                  </button>
                )}
              </div>
              {getTopRanks()}
            </div>
            {getCoversPreview()}
          </div>
        </div>
      );
    }

    if (currentType === 'experience') {
      return (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField label="Company" value={formData.company} onChange={(v: any) => handleChange('company', v)} />
            <InputField label="Location" value={formData.location} onChange={(v: any) => handleChange('location', v)} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField label="RP Rank" type="number" value={formData.rpRank} onChange={(v: any) => handleChange('rpRank', parseInt(v))} />
            {getTopRanks()}
          </div>
          <MediaPathField label="Logo URL" value={formData.logo} onChange={(v: any) => handleChange('logo', v)} basePath="/experience/" itemId={formData.id || (formData.company || 'new').toLowerCase().replace(/[^a-z0-9]+/g, '-')} />
          
          <div className="space-y-4 pt-4 border-t border-white/5">
            <h4 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider">Roles</h4>
            <TextAreaField label="Roles (JSON Array)" value={JSON.stringify(formData.roles || [], null, 2)} onChange={(v: any) => {
              try {
                const parsed = JSON.parse(v);
                handleChange('roles', parsed);
              } catch(e) {}
            }} />
            <p className="text-xs text-neutral-500 mt-1">Must be valid JSON. Example: [{`{"position":"CEO", "duration":"Jan 2026", "points":["Point 1"]}`}]</p>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 bg-black/80 backdrop-blur-md">
      <div className="bg-[#111113] border border-white/10 rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between p-6 sm:p-8 border-b border-white/5 relative z-10 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white mb-4 sm:mb-0">
              {initialData ? (
                <span className="flex items-center gap-3">Edit <span className="text-neutral-400 capitalize">{currentType}</span></span>
              ) : (
                'Create New Entry'
              )}
            </h2>
            
            {!initialData && (
              <div className="flex bg-white/5 border border-white/10 p-1 rounded-xl mt-4 w-fit">
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
          <button onClick={onClose} className="p-3 bg-white/5 hover:bg-white/10 border border-white/5 rounded-full text-neutral-400 hover:text-white transition-all self-start sm:self-auto">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-4 custom-scrollbar relative z-10">
          {error && <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-2xl text-sm font-medium">{error}</div>}
          {renderFields()}
        </div>

        <div className="p-6 sm:p-8 border-t border-white/5 flex justify-between items-center bg-[#111113]/80 backdrop-blur-xl relative z-10">
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
          basePath={`/${currentType}/`}
          onComplete={(urls) => {
            handleChange('previewCover', urls.preview);
            handleChange('homeCover', urls.home);
            handleChange('highlightCover', urls.highlight);
          }}
        />
      )}

      {selectorUrls.length > 0 && (
        <ImageSelectorModal 
          isOpen={selectorUrls.length > 0} 
          urls={selectorUrls} 
          onClose={() => setSelectorUrls([])} 
          onSelect={(url: string) => {
            setMasterImage(url);
            setSelectorUrls([]);
            setIsCropperOpen(true);
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
