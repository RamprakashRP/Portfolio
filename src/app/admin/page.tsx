'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { supabase } from '@/lib/supabase';
import { Plus, Edit2, Trash2, Search, Filter, Award, LayoutGrid, Briefcase } from 'lucide-react';
import AdminModal from './components/AdminModal';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'achievements' | 'projects' | 'experience'>('achievements');
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest' | 'a-z'>('newest');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingData, setEditingData] = useState<any>(null);

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    let { data, error } = await supabase.from(activeTab).select('*').order('updated_at', { ascending: false });
    if (error) {
      console.error(error);
    } else {
      setItems(data || []);
    }
    setLoading(false);
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
    if (confirm(`Are you sure you want to delete this ${activeTab.slice(0, -1)}?`)) {
      const matchField = activeTab === 'experience' ? 'id' : 'id';
      await supabase.from(activeTab).delete().eq(matchField, item[matchField]);
      fetchData();
    }
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
        if (sortOrder === 'oldest') {
          return new Date(a.updated_at || 0).getTime() - new Date(b.updated_at || 0).getTime();
        }
        return new Date(b.updated_at || 0).getTime() - new Date(a.updated_at || 0).getTime();
      });
  }, [items, searchQuery, sortOrder]);

  return (
    <div className="min-h-screen bg-[#09090a] text-white p-8 pt-32 selection:bg-purple-500/30 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto flex flex-col h-full relative z-10">
        
        {/* Header Section */}
        <div className="mb-10 text-center sm:text-left">
          <h1 className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/50 mb-4">
            Command Center
          </h1>
          <p className="text-neutral-400 text-lg">Manage your portfolio data dynamically without touching code.</p>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-6">
          {/* Nav Tabs */}
          <div className="flex bg-[#111113]/80 backdrop-blur-xl border border-white/5 rounded-full p-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
            {[
              { id: 'achievements', label: 'Achievements', icon: Award },
              { id: 'projects', label: 'Projects', icon: LayoutGrid },
              { id: 'experience', label: 'Experience', icon: Briefcase }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold transition-all capitalize ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-b from-white/10 to-transparent border border-white/10 text-white shadow-lg'
                    : 'text-neutral-500 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-purple-400' : ''}`} />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Add New Button */}
          <button 
            onClick={handleAddNew}
            className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-full text-sm font-bold flex items-center justify-center space-x-2 transition-all shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] transform hover:-translate-y-0.5"
          >
            <Plus className="w-5 h-5" />
            <span>Add New Entry</span>
          </button>
        </div>

        {/* List Area */}
        <div className="flex-1 bg-[#111113]/60 backdrop-blur-2xl border border-white/5 rounded-3xl p-6 sm:p-8 shadow-2xl relative">
          
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8 relative z-10 gap-6">
            <h2 className="text-2xl font-semibold capitalize flex items-center gap-3">
              <span className="w-2 h-8 bg-purple-500 rounded-full"></span>
              {activeTab} Database
            </h2>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
              <div className="relative w-full sm:w-72">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                <input 
                  type="text"
                  placeholder="Search entries..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-[#0a0a0b] border border-white/5 rounded-2xl text-sm text-white focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all placeholder:text-neutral-600 shadow-inner"
                />
              </div>
              
              <div className="relative w-full sm:w-auto">
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value as any)}
                  className="appearance-none w-full sm:w-auto pl-11 pr-10 py-3 bg-[#0a0a0b] border border-white/5 rounded-2xl text-sm text-white focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all cursor-pointer shadow-inner"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="a-z">Alphabetical (A-Z)</option>
                </select>
                <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 pointer-events-none" />
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
            ) : (
              filteredItems.map((item, idx) => (
                <div key={item.id || idx} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 bg-gradient-to-r from-white/[0.02] to-transparent border border-white/5 rounded-2xl hover:bg-white/[0.04] hover:border-white/10 transition-all group gap-4 shadow-sm hover:shadow-lg">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">{item.title || item.name || item.company}</h3>
                    <p className="text-sm text-neutral-500 mt-2 line-clamp-2 leading-relaxed">{item.description || item.date || item.location}</p>
                    
                    {/* Timestamp Tag */}
                    {item.updated_at && (
                      <span className="inline-block mt-3 px-2 py-1 bg-white/5 rounded-md text-[10px] uppercase tracking-widest text-neutral-500 font-medium border border-white/5">
                        Updated {new Date(item.updated_at).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
                    <button onClick={() => handleEdit(item)} className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-blue-500/20 border border-transparent hover:border-blue-500/30 rounded-xl text-neutral-400 hover:text-blue-400 transition-all">
                      <Edit2 className="w-4 h-4" />
                      <span className="text-sm font-medium">Edit</span>
                    </button>
                    <button onClick={() => handleDelete(item)} className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-red-500/20 border border-transparent hover:border-red-500/30 rounded-xl text-neutral-400 hover:text-red-400 transition-all">
                      <Trash2 className="w-4 h-4" />
                      <span className="text-sm font-medium hidden sm:inline">Delete</span>
                    </button>
                  </div>
                </div>
              ))
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
      />
    </div>
  );
}
