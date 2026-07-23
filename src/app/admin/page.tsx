'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { supabase } from '@/lib/supabase';
import { Plus, Edit2, Trash2, Search, Filter, Award, LayoutGrid, Briefcase, ChevronDown, ChevronUp, GripVertical } from 'lucide-react';
import { Reorder, useDragControls } from 'framer-motion';
import AdminModal from './components/AdminModal';

const ListItem = ({ item, activeTab, onClick, dragControls }: { item: any, activeTab: string, onClick: () => void, dragControls?: any }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isExperience = activeTab === 'experience';
  
  const handleExpandClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  const getLatestRole = () => {
    if (!item.roles || item.roles.length === 0) return null;
    const activeRoles = item.roles.filter((r: any) => r.isCurrent !== false);
    if (activeRoles.length > 0) {
      return activeRoles[activeRoles.length - 1];
    }
    // If no active, return the role with the most recent start date
    const sorted = [...item.roles].sort((a: any, b: any) => {
      const timeA = new Date(a.startDate || 0).getTime();
      const timeB = new Date(b.startDate || 0).getTime();
      return timeB - timeA; // Descending
    });
    return sorted[0];
  };

  const latestRole = getLatestRole();

  return (
    <div 
      onClick={onClick}
      className="flex flex-col p-4 sm:p-5 bg-gradient-to-r from-white/[0.02] to-transparent border border-white/5 rounded-2xl hover:bg-white/[0.04] hover:border-red-500/30 transition-all group shadow-sm hover:shadow-lg cursor-pointer relative"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 w-full">
        {dragControls && (
          <div 
            className="flex items-center justify-center p-1 sm:p-2 -ml-2 sm:-ml-2 cursor-grab active:cursor-grabbing text-neutral-600 hover:text-white transition-colors"
            onPointerDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
              dragControls.start(e);
            }}
          >
            <GripVertical className="w-5 h-5" />
          </div>
        )}
        <div className="flex-1 w-full overflow-hidden">
          <h3 className="text-base sm:text-xl font-bold text-white group-hover:text-red-400 transition-colors truncate">
            {item.title || item.name || item.company}
          </h3>
          
          {isExperience ? (
            <div className="mt-1 sm:mt-2 text-xs sm:text-sm text-neutral-500">
              {latestRole ? (
                <div className="flex items-center gap-2 truncate">
                  <Briefcase className="w-3 h-3 sm:w-4 sm:h-4 text-neutral-600 shrink-0" />
                  <span className="font-semibold text-neutral-300 truncate">{latestRole.position}</span>
                  <span className="text-neutral-500 shrink-0">•</span>
                  <span className="shrink-0">{latestRole.isCurrent !== false ? 'Current' : (latestRole.endDate || 'Ended')}</span>
                </div>
              ) : (
                <p>No roles defined.</p>
              )}
            </div>
          ) : (
            <p className="text-sm text-neutral-500 mt-2 line-clamp-2 leading-relaxed">
              {item.description || item.date || item.location}
            </p>
          )}
          
          {item.updated_at && (
            <span className="hidden sm:inline-block mt-3 px-2 py-1 bg-white/5 rounded-md text-[10px] uppercase tracking-widest text-neutral-500 font-medium border border-white/5 group-hover:border-red-500/20 group-hover:text-red-400/80 transition-colors">
              Updated {new Date(item.updated_at).toLocaleDateString()}
            </span>
          )}
        </div>
        
        <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
          {isExperience && item.roles && item.roles.length > 1 && (
            <button 
              onClick={handleExpandClick}
              className="px-3 py-1.5 sm:p-2 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 text-neutral-400 transition-colors flex items-center gap-2"
            >
              <span className="text-xs font-semibold">{item.roles.length} Roles</span>
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          )}
          <span className="text-sm font-medium text-red-400/80 bg-red-500/10 px-3 py-1.5 rounded-lg border border-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity">
            Click to Edit
          </span>
        </div>
      </div>
      
      {/* Expanded Roles View */}
      {isExpanded && isExperience && item.roles && item.roles.length > 1 && (
        <div className="mt-4 pt-4 border-t border-white/5 space-y-2">
          {item.roles.map((role: any, rIdx: number) => (
            <div key={rIdx} className="flex justify-between items-center bg-white/[0.02] border border-white/5 p-3 rounded-xl">
              <div>
                <h4 className="text-sm font-bold text-neutral-300">{role.position}</h4>
                <p className="text-xs text-neutral-500">
                  {role.startDate || 'Unknown'} - {role.isCurrent !== false ? 'Present' : (role.endDate || 'Unknown')}
                </p>
              </div>
              {role.isCurrent !== false && (
                <span className="px-2 py-1 bg-red-500/10 text-red-400 text-[10px] font-bold rounded-md">ACTIVE</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const DraggableWrapper = ({ item, activeTab, onClick, onDragEnd }: { item: any, activeTab: string, onClick: () => void, onDragEnd: () => void }) => {
  const controls = useDragControls();
  return (
    <Reorder.Item value={item} dragListener={false} dragControls={controls} onDragEnd={onDragEnd} className="relative">
      <ListItem item={item} activeTab={activeTab} onClick={onClick} dragControls={controls} />
    </Reorder.Item>
  );
};

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'achievements' | 'projects' | 'experience'>('achievements');
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest' | 'a-z' | 'rprank' | 'recently-edited'>('newest');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingData, setEditingData] = useState<any>(null);
  const [isSortOpen, setIsSortOpen] = useState(false);

  useEffect(() => {
    if (activeTab === 'experience') {
      setSortOrder('rprank');
    }
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    const tableName = activeTab === 'experience' ? 'experiences' : activeTab;
    const { data, error } = await supabase.from(tableName).select('*').order('rpRank', { ascending: true });
    if (error) {
      console.error(error);
      setItems([]);
    } else {
      setItems(data || []);
    }
    setLoading(false);
  };

  const handleReorder = (newOrder: any[]) => {
    setItems(newOrder);
  };

  const handleDragEnd = async () => {
    const tableName = activeTab === 'experience' ? 'experiences' : activeTab;
    for (let i = 0; i < items.length; i++) {
      const expectedRank = i + 1;
      if (items[i].rpRank !== expectedRank) {
        supabase.from(tableName).update({ rpRank: expectedRank }).eq('id', items[i].id).then();
        items[i].rpRank = expectedRank;
      }
    }
  };

  const handleAddNew = () => {
    setEditingData(null);
    setIsModalOpen(true);
  };

  const handleEdit = (item: any) => {
    setEditingData(item);
    setIsModalOpen(true);
  };

  const handleDelete = async (item: any) => {
    const tableName = activeTab === 'experience' ? 'experiences' : activeTab;
    const matchField = 'id';
    await supabase.from(tableName).delete().eq(matchField, item[matchField]);
    
    // Rank Cascading Logic for Deletion
    if (typeof item.rpRank === 'number') {
      const { data } = await supabase.from(tableName).select('id, rpRank').gt('rpRank', item.rpRank);
      if (data) {
        for (const subsequentItem of data) {
          await supabase.from(tableName).update({ rpRank: subsequentItem.rpRank - 1 }).eq('id', subsequentItem.id);
        }
      }
    }

    fetchData();
  };

  const filteredItems = useMemo(() => {
    return items
      .filter((item) => {
        const query = searchQuery.toLowerCase();
        const title = (item.title || item.name || item.company || '').toLowerCase();
        return title.includes(query);
      })
      .sort((a, b) => {
        if (sortOrder === 'a-z') {
          const titleA = (a.title || a.name || a.company || '').toLowerCase();
          const titleB = (b.title || b.name || b.company || '').toLowerCase();
          return titleA.localeCompare(titleB);
        }
        if (sortOrder === 'rprank') {
          return (a.rpRank ?? Infinity) - (b.rpRank ?? Infinity);
        }
        
        if (sortOrder === 'recently-edited') {
          const editA = new Date(a.updated_at || a.created_at || 0).getTime();
          const editB = new Date(b.updated_at || b.created_at || 0).getTime();
          return editB - editA;
        }

        const getDateValue = (item: any) => {
          if (activeTab === 'experience' && item.roles && item.roles.length > 0) {
            const activeRoles = item.roles.filter((r: any) => r.isCurrent !== false);
            if (activeRoles.length > 0) {
              const latestActive = activeRoles[activeRoles.length - 1];
              const startTime = new Date(latestActive.startDate || 0).getTime();
              // Add a massive constant so active roles always float above inactive ones
              return 10000000000000 + startTime;
            } else {
              const sorted = [...item.roles].sort((a: any, b: any) => new Date(b.startDate || 0).getTime() - new Date(a.startDate || 0).getTime());
              if (sorted[0] && sorted[0].startDate) {
                return new Date(sorted[0].startDate).getTime();
              }
            }
          }
          return new Date(item.created_at || item.updated_at || 0).getTime();
        };

        const dateA = getDateValue(a);
        const dateB = getDateValue(b);
        
        if (sortOrder === 'oldest') {
          return dateA - dateB;
        }
        return dateB - dateA;
      });
  }, [items, searchQuery, sortOrder]);

  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();
    items.forEach(item => {
      if (item.tags && Array.isArray(item.tags)) {
        item.tags.forEach((tag: string) => tagsSet.add(tag));
      }
      if (item.roles && Array.isArray(item.roles)) {
        item.roles.forEach((role: any) => {
          if (role.skills && Array.isArray(role.skills)) {
            role.skills.forEach((skill: string) => tagsSet.add(skill));
          }
        });
      }
    });
    return Array.from(tagsSet).sort();
  }, [items]);

  return (
    <div className="min-h-screen bg-[#09090a] text-white p-8 pt-32 selection:bg-red-500/30 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-red-500/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-red-500/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto flex flex-col h-full relative z-10">
        
        {/* Header Section */}
        <div className="hidden sm:block mb-10 text-left">
          <h1 className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/50 mb-4">
            Command Center
          </h1>
          <p className="text-neutral-400 text-lg">Manage your portfolio data dynamically without touching code.</p>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 sm:mb-8 gap-4 sm:gap-6">
          {/* Nav Tabs */}
          <div className="flex w-full md:w-auto overflow-x-auto hide-scrollbar bg-[#111113]/80 backdrop-blur-xl border border-white/5 rounded-full p-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
            {[
              { id: 'achievements', label: 'Achievements', icon: Award },
              { id: 'projects', label: 'Projects', icon: LayoutGrid },
              { id: 'experience', label: 'Experience', icon: Briefcase }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold transition-all capitalize whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-white/10 text-white shadow-md'
                    : 'text-neutral-500 hover:text-white hover:bg-white/5'
                }`}
              >
                <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-red-400' : ''}`} />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Add New Button */}
          <button 
            onClick={handleAddNew}
            className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-400 hover:to-red-500 rounded-full text-sm font-bold flex items-center justify-center space-x-2 transition-all shadow-[0_0_20px_rgba(239,68,68,0.3)] hover:shadow-[0_0_30px_rgba(239,68,68,0.5)] transform hover:-translate-y-0.5"
          >
            <Plus className="w-5 h-5" />
            <span>Add New Entry</span>
          </button>
        </div>

        {/* List Area */}
        <div className="flex-1 bg-[#111113]/60 backdrop-blur-2xl border border-white/5 rounded-3xl p-6 sm:p-8 shadow-2xl relative">
          
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8 relative z-20 gap-6">
            <h2 className="text-2xl font-semibold capitalize flex items-center gap-3">
              <span className="w-2 h-8 bg-red-500 rounded-full"></span>
              {activeTab} Database
            </h2>
            
            <div className="flex flex-row items-center gap-2 sm:gap-4 w-full lg:w-auto">
              <div className="relative flex-1 sm:w-72">
                <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                <input 
                  type="text"
                  placeholder="Search entries..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 sm:pl-11 pr-3 sm:pr-4 py-2.5 sm:py-3 bg-[#0a0a0b] border border-white/5 rounded-xl sm:rounded-2xl text-xs sm:text-sm text-white focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 transition-all placeholder:text-neutral-600 shadow-inner"
                />
              </div>
              
              <div className="relative w-auto">
                <button
                  onClick={() => setIsSortOpen(!isSortOpen)}
                  className="w-auto sm:w-48 pl-9 sm:pl-11 pr-3 sm:pr-4 py-2.5 sm:py-3 bg-[#0a0a0b] border border-white/5 rounded-xl sm:rounded-2xl text-xs sm:text-sm text-left text-white focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 transition-all cursor-pointer shadow-inner relative flex items-center gap-2"
                >
                  <Filter className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                  <span className="hidden sm:inline">{sortOrder === 'newest' ? 'Newest First' : sortOrder === 'oldest' ? 'Oldest First' : sortOrder === 'rprank' ? 'RP Rank' : sortOrder === 'recently-edited' ? 'Recently Edited' : 'Alphabetical (A-Z)'}</span>
                  <span className="sm:hidden">Sort</span>
                </button>
                {isSortOpen && (
                  <div className="absolute top-full mt-2 left-0 w-full bg-[#0a0a0b] border border-white/10 rounded-2xl shadow-xl overflow-hidden z-50">
                    {(activeTab === 'experience'
                      ? [{ id: 'rprank', label: 'RP Rank' }]
                      : [
                          { id: 'newest', label: 'Newest First' },
                          { id: 'oldest', label: 'Oldest First' },
                          { id: 'recently-edited', label: 'Recently Edited' },
                          { id: 'a-z', label: 'Alphabetical (A-Z)' },
                          { id: 'rprank', label: 'RP Rank' }
                        ]
                    ).map(opt => (
                      <button
                        key={opt.id}
                        onClick={(e) => { e.stopPropagation(); setSortOrder(opt.id as any); setIsSortOpen(false); }}
                        className={`w-full text-left px-4 py-3 text-sm transition-colors ${sortOrder === opt.id ? 'bg-red-500/20 text-red-400' : 'text-neutral-400 hover:bg-white/5 hover:text-white'}`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="space-y-4 z-10 relative custom-scrollbar max-h-[60vh] overflow-y-auto pr-2">
            {loading ? (
              <div className="text-neutral-500 font-medium animate-pulse text-center py-12">Syncing with Supabase...</div>
            ) : filteredItems.length === 0 ? (
              <div className="text-neutral-500 text-center py-20 border border-dashed border-white/10 rounded-3xl bg-white/[0.01]">
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-6 h-6 text-neutral-600" />
                </div>
                <p className="font-medium text-lg text-neutral-400">No matching entries found.</p>
                <p className="text-sm mt-1">Try a different search or add a new entry.</p>
              </div>
            ) : sortOrder === 'rprank' && !searchQuery ? (
              <Reorder.Group axis="y" values={filteredItems} onReorder={handleReorder} className="space-y-4">
                {filteredItems.map((item) => {
                  // We need to use a small wrapper component inside map to avoid useDragControls hook inside map block natively
                  // Wait, Reorder.Item allows dragControls but it expects it to be created via useDragControls
                  // Let's create an inline component or use a wrapper.
                  return <DraggableWrapper key={item.id} item={item} activeTab={activeTab} onClick={() => handleEdit(item)} onDragEnd={handleDragEnd} />
                })}
              </Reorder.Group>
            ) : (
              <div className="space-y-4">
                {filteredItems.map((item, idx) => (
                  <ListItem key={item.id || idx} item={item} activeTab={activeTab} onClick={() => handleEdit(item)} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <AdminModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        type={activeTab} 
        initialData={editingData} 
        onSuccess={fetchData} 
        onDelete={handleDelete}
        allTags={allTags}
        items={items}
      />
    </div>
  );
}
