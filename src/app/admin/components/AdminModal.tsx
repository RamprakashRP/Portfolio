'use client';
import React, { useState, useEffect } from 'react';
import { X, Save, Image as ImageIcon, Link as LinkIcon, Folder, LayoutGrid, Award, Briefcase } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  type: 'achievements' | 'projects' | 'experience';
  initialData?: any; // If null, we are adding new
  onSuccess: () => void;
}

export default function AdminModal({ isOpen, onClose, type, initialData, onSuccess }: Props) {
  const [formData, setFormData] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentType, setCurrentType] = useState(type);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      setCurrentType(type);
    } else {
      setFormData({});
      setCurrentType(type);
    }
  }, [initialData, isOpen, type]);

  if (!isOpen) return null;

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (field: string, value: string) => {
    const arr = value.split(',').map(s => s.trim()).filter(Boolean);
    setFormData(prev => ({ ...prev, [field]: arr }));
  };

  const handleSave = async () => {
    setLoading(true);
    setError(null);
    try {
      const dataToSave = { ...formData };
      if (!dataToSave.id && currentType !== 'experience') {
        const title = dataToSave.title || dataToSave.name;
        dataToSave.id = title ? title.toLowerCase().replace(/[^a-z0-9]+/g, '-') : Date.now().toString();
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
    if (currentType === 'achievements') {
      return (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField label="ID" value={formData.id} onChange={v => handleChange('id', v)} placeholder="(Leave blank to auto-generate)" />
            <InputField label="Title" value={formData.title} onChange={v => handleChange('title', v)} />
            <InputField label="Date" value={formData.date} onChange={v => handleChange('date', v)} placeholder="e.g. 18th Feb 2026" />
            <InputField label="Sort Date (Timestamp)" type="number" value={formData.sortDate} onChange={v => handleChange('sortDate', parseInt(v))} />
            <InputField label="RP Rank" type="number" value={formData.rpRank} onChange={v => handleChange('rpRank', parseInt(v))} />
            <InputField label="Tags (Comma separated)" value={(formData.tags || []).join(', ')} onChange={v => handleArrayChange('tags', v)} />
          </div>
          <TextAreaField label="Description" value={formData.description} onChange={v => handleChange('description', v)} />
          
          <div className="space-y-4 pt-4 border-t border-white/5">
            <h4 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider flex items-center gap-2">
              <ImageIcon className="w-4 h-4" /> Media & Covers
            </h4>
            <MediaPathField label="Media URLs (Comma separated)" value={formData.media || []} onChange={(v: any) => handleChange('media', v)} basePath="/achievements/" />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <MediaPathField label="Home Cover" value={formData.homeCover} onChange={(v: any) => handleChange('homeCover', v)} basePath="/achievements/" />
              <MediaPathField label="Preview Cover" value={formData.previewCover} onChange={(v: any) => handleChange('previewCover', v)} basePath="/achievements/" />
              <MediaPathField label="Highlight Cover" value={formData.highlightCover} onChange={(v: any) => handleChange('highlightCover', v)} basePath="/achievements/" />
            </div>
          </div>
        </div>
      );
    }

    if (currentType === 'projects') {
      return (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField label="ID" value={formData.id} onChange={v => handleChange('id', v)} placeholder="(Leave blank to auto-generate)" />
            <InputField label="Name" value={formData.name} onChange={v => handleChange('name', v)} />
            <InputField label="Category" value={formData.category} onChange={v => handleChange('category', v)} />
            <InputField label="Period" value={formData.period} onChange={v => handleChange('period', v)} />
            <InputField label="Sort Date (Timestamp)" type="number" value={formData.sortDate} onChange={v => handleChange('sortDate', parseInt(v))} />
            <InputField label="RP Rank" type="number" value={formData.rpRank} onChange={v => handleChange('rpRank', parseInt(v))} />
          </div>
          <TextAreaField label="Description" value={formData.description} onChange={v => handleChange('description', v)} />
          <InputField label="Tags (Comma separated)" value={(formData.tags || []).join(', ')} onChange={v => handleArrayChange('tags', v)} />
          
          <div className="space-y-4 pt-4 border-t border-white/5">
            <h4 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider flex items-center gap-2">
              <LinkIcon className="w-4 h-4" /> Additional Info
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <InputField label="Client" value={formData.client} onChange={v => handleChange('client', v)} />
              <InputField label="Service" value={formData.service} onChange={v => handleChange('service', v)} />
              <InputField label="Live URL" value={formData.liveUrl} onChange={v => handleChange('liveUrl', v)} />
            </div>
            <TextAreaField label="Info: Goal" value={formData.infoGoal} onChange={v => handleChange('infoGoal', v)} />
            <TextAreaField label="Info: Challenge" value={formData.infoChallenge} onChange={v => handleChange('infoChallenge', v)} />
            <TextAreaField label="Info: Result" value={formData.infoResult} onChange={v => handleChange('infoResult', v)} />
          </div>
          
          <div className="space-y-4 pt-4 border-t border-white/5">
            <h4 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider flex items-center gap-2">
              <ImageIcon className="w-4 h-4" /> Media & Covers
            </h4>
            <MediaPathField label="Media URLs (Comma separated)" value={formData.media || []} onChange={(v: any) => handleChange('media', v)} basePath="/projects/" />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <MediaPathField label="Home Cover" value={formData.homeCover} onChange={(v: any) => handleChange('homeCover', v)} basePath="/projects/" />
              <MediaPathField label="Preview Cover" value={formData.previewCover} onChange={(v: any) => handleChange('previewCover', v)} basePath="/projects/" />
              <MediaPathField label="Highlight Cover" value={formData.highlightCover} onChange={(v: any) => handleChange('highlightCover', v)} basePath="/projects/" />
            </div>
          </div>
        </div>
      );
    }

    if (currentType === 'experience') {
      return (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField label="Company" value={formData.company} onChange={v => handleChange('company', v)} />
            <InputField label="Location" value={formData.location} onChange={v => handleChange('location', v)} />
            <InputField label="RP Rank" type="number" value={formData.rpRank} onChange={v => handleChange('rpRank', parseInt(v))} />
          </div>
          <MediaPathField label="Logo URL" value={formData.logo} onChange={(v: any) => handleChange('logo', v)} basePath="/experience/" />
          
          <div className="space-y-4 pt-4 border-t border-white/5">
            <h4 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider">Roles</h4>
            <TextAreaField label="Roles (JSON Array)" value={JSON.stringify(formData.roles || [], null, 2)} onChange={v => {
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
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

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
                        ? 'bg-purple-500/20 text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.2)] border border-purple-500/30'
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

        <div className="p-6 sm:p-8 border-t border-white/5 flex justify-end bg-[#111113]/80 backdrop-blur-xl relative z-10">
          <button 
            onClick={handleSave} 
            disabled={loading}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-full text-sm font-bold flex items-center space-x-2 transition-all disabled:opacity-50 shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)]"
          >
            {loading ? <span className="animate-pulse">Saving...</span> : <Save className="w-4 h-4" />}
            <span>{loading ? 'Saving...' : 'Save Changes'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

const InputField = ({ label, value, onChange, type = 'text', placeholder = '' }: any) => (
  <div className="flex flex-col space-y-2">
    <label className="text-sm font-medium text-neutral-400">{label}</label>
    <input 
      type={type}
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-4 py-3 bg-[#0a0a0b] border border-white/5 rounded-2xl text-sm text-white focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all placeholder:text-neutral-600 shadow-inner"
    />
  </div>
);

const TextAreaField = ({ label, value, onChange, placeholder = '' }: any) => (
  <div className="flex flex-col space-y-2">
    <label className="text-sm font-medium text-neutral-400">{label}</label>
    <textarea 
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={4}
      className="w-full px-4 py-3 bg-[#0a0a0b] border border-white/5 rounded-2xl text-sm text-white focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all custom-scrollbar placeholder:text-neutral-600 shadow-inner"
    />
  </div>
);

const MediaPathField = ({ label, value, onChange, basePath }: any) => {
  if (Array.isArray(value)) {
    const displayValue = value.map(v => v.startsWith(basePath) ? v.slice(basePath.length) : v).join(', ');
    const handleChange = (e: any) => {
      const arr = e.target.value.split(',').map((s: string) => {
        const trimmed = s.trim();
        return trimmed ? (trimmed.startsWith(basePath) ? trimmed : `${basePath}${trimmed}`) : '';
      }).filter(Boolean);
      onChange(arr);
    };
    return (
      <div className="flex flex-col space-y-2">
        <label className="text-sm font-medium text-neutral-400 flex items-center gap-2">
          {label}
        </label>
        <div className="flex items-center bg-[#0a0a0b] border border-white/5 rounded-2xl overflow-hidden focus-within:border-purple-500/50 focus-within:ring-1 focus-within:ring-purple-500/50 transition-all shadow-inner">
          <div className="flex items-center justify-center pl-4 pr-3 py-3 bg-white/[0.02] border-r border-white/5 text-neutral-500 select-none space-x-2">
            <Folder className="w-4 h-4 text-purple-400/70" />
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
    onChange(val ? (val.startsWith(basePath) ? val : `${basePath}${val}`) : '');
  };

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm font-medium text-neutral-400">{label}</label>
      <div className="flex items-center bg-[#0a0a0b] border border-white/5 rounded-2xl overflow-hidden focus-within:border-purple-500/50 focus-within:ring-1 focus-within:ring-purple-500/50 transition-all shadow-inner">
        <div className="flex items-center justify-center pl-4 pr-3 py-3 bg-white/[0.02] border-r border-white/5 text-neutral-500 select-none space-x-2">
          <Folder className="w-4 h-4 text-purple-400/70" />
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
