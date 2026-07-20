'use client';
import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Search, ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import Image from 'next/image';
import { projectsList } from '@/data/projects';

const allTags = Array.from(new Set(projectsList.flatMap(p => p.tags || [])));
type SortOption = 'rpRank' | 'newest' | 'oldest';

const HighlightText = ({ text, highlight }: { text: string; highlight: string }) => {
  if (!highlight.trim()) return <>{text}</>;
  const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
  return (
    <>
      {parts.map((part, i) => 
        part.toLowerCase() === highlight.toLowerCase() 
          ? <span key={i} className="bg-neutral-600 text-white rounded-[2px] px-0.5">{part}</span>
          : part
      )}
    </>
  );
};

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [tagMatchMode, setTagMatchMode] = useState<'all' | 'any'>('all');
  const [sortOption, setSortOption] = useState<SortOption>('rpRank');
  const [isSortOpen, setIsSortOpen] = useState(false);

  const toggleTag = (tag: string) => {
    setActiveTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const filteredAndSortedProjects = useMemo(() => {
    let filtered = projectsList.filter(project => {
      const searchMatch = 
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (project.description || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (project.tags || []).some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const tagMatch = activeTags.length === 0 || 
        (tagMatchMode === 'all' 
          ? activeTags.every(tag => project.tags?.includes(tag))
          : activeTags.some(tag => project.tags?.includes(tag)));
      
      return searchMatch && tagMatch;
    });

    filtered.sort((a, b) => {
      if (sortOption === 'rpRank') {
        return (a.rpRank || 0) - (b.rpRank || 0);
      } else if (sortOption === 'newest') {
        return (b.sortDate || 0) - (a.sortDate || 0);
      } else if (sortOption === 'oldest') {
        return (a.sortDate || 0) - (b.sortDate || 0);
      }
      return 0;
    });

    return filtered;
  }, [searchQuery, activeTags, tagMatchMode, sortOption]);

  const sortLabels: Record<SortOption, string> = {
    rpRank: 'RP Rank',
    newest: 'Newest First',
    oldest: 'Oldest First'
  };
  return (
    <main className="min-h-screen text-white pt-40 pb-20 relative flex flex-col items-center">
      
      {/* Background Texture Placeholder */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] bg-repeat" />

      <div className="max-w-6xl w-full px-6 relative z-10 flex flex-col items-center">
        
        {/* Header Block */}
        <div className="flex flex-col items-center text-center mb-24">
          <div className="flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 w-fit mb-8">
            <span className="text-xs font-semibold text-neutral-300 tracking-wider">Project Directory</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-8 leading-tight">
            Elevating Brands & Individuals <span className="text-neutral-500">to</span><br />
            <span className="text-neutral-500">Drive Success and Impact</span>
          </h1>

          <Link 
            href="/contact"
            className="px-8 py-3 rounded-full bg-neutral-200 text-black text-sm font-semibold hover:bg-white transition-colors"
          >
            Contact Now
          </Link>
        </div>

        {/* Filter & Sort Controls */}
        <div className="w-full flex flex-col gap-6 mb-16">
          
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center w-full">
            {/* Search */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <input 
                type="text" 
                placeholder="Search projects by name, keyword, or tag..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-12 pr-4 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white/30 transition-colors"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="relative w-full md:w-auto">
              <button 
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="w-full md:w-auto bg-white/5 border border-white/10 rounded-full py-3 px-6 text-sm text-neutral-300 flex items-center justify-between gap-3 hover:bg-white/10 transition-colors"
              >
                <span>Sort by: <span className="text-white font-medium">{sortLabels[sortOption]}</span></span>
                <ChevronDown className="w-4 h-4" />
              </button>

              <AnimatePresence>
                {isSortOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full right-0 mt-2 w-48 bg-[#09090a] border border-white/10 rounded-2xl p-2 shadow-2xl z-50"
                  >
                    {(Object.keys(sortLabels) as SortOption[]).map(option => (
                      <button
                        key={option}
                        onClick={() => {
                          setSortOption(option);
                          setIsSortOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm transition-colors ${sortOption === option ? 'bg-white/10 text-white font-medium' : 'text-neutral-400 hover:text-white hover:bg-white/5'}`}
                      >
                        {sortLabels[option]}
                        {sortOption === option && <Check className="w-4 h-4" />}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Tags Filter */}
          <div className="flex flex-col gap-4 items-center justify-center w-full">
            <div className="flex flex-wrap gap-2 items-center justify-center">
              {allTags.map(tag => {
                const isActive = activeTags.includes(tag);
                return (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                      isActive 
                        ? 'bg-neutral-200 text-black shadow-[0_0_15px_rgba(255,255,255,0.3)]' 
                        : 'bg-white/5 text-neutral-400 border border-white/10 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
            
            {activeTags.length > 1 && (
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full p-1 mt-2">
                <button 
                  onClick={() => setTagMatchMode('all')}
                  className={`px-4 py-1 text-xs font-semibold rounded-full transition-colors ${tagMatchMode === 'all' ? 'bg-white/10 text-white' : 'text-neutral-500 hover:text-white'}`}
                >
                  Match All
                </button>
                <button 
                  onClick={() => setTagMatchMode('any')}
                  className={`px-4 py-1 text-xs font-semibold rounded-full transition-colors ${tagMatchMode === 'any' ? 'bg-white/10 text-white' : 'text-neutral-500 hover:text-white'}`}
                >
                  Match Any
                </button>
              </div>
            )}
          </div>

        </div>

        {/* Masonry / Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <AnimatePresence mode="popLayout">
            {filteredAndSortedProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                <Link 
                  href={`/projects/${project.id}`}
                  className="group block relative h-full"
                >
                  <div className="w-full h-full relative flex flex-col bg-gradient-to-br from-[#151515] to-[#09090a] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),_0_20px_40px_rgba(0,0,0,0.8)] border border-white/5 rounded-3xl p-4 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),_0_30px_60px_rgba(0,0,0,0.9)]">
                    {/* Image & Overlay */}
                    <div className={`w-full aspect-[4/3] rounded-2xl flex items-center justify-center border border-white/5 overflow-hidden relative mb-4 ${project.imageType === 'dark' ? 'bg-[#111]' : 'bg-[#e5e5e5]'}`}>
                      {project.media && project.media.length > 0 ? (
                        <Image src={project.media[0]} alt={project.name} fill className="object-cover" />
                      ) : (
                        <span className={`text-xs font-semibold tracking-wider ${project.imageType === 'dark' ? 'text-neutral-700' : 'text-neutral-400'}`}>
                          Project Image
                        </span>
                      )}
                      
                      {/* Top Right Arrow Icon */}
                      <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity z-20">
                        <ArrowUpRight className="w-5 h-5" />
                      </div>

                      {/* Sliding Description Overlay */}
                      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 flex flex-col justify-end transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-10">
                        <p className="text-xs text-neutral-300 line-clamp-2 mb-1.5 leading-relaxed">
                          <HighlightText text={project.description || "View project to learn more about the details, challenges, and the impact delivered."} highlight={searchQuery} />
                        </p>
                        <span className="text-[10px] font-bold text-white uppercase tracking-widest flex items-center gap-1">
                          Read more <ArrowUpRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>

                    {/* Project Name and Period */}
                    <div className="px-2 pb-2 flex justify-between items-end">
                      <div className="flex flex-col gap-1.5">
                        <h3 className="text-lg font-medium text-white">
                          <HighlightText text={project.name} highlight={searchQuery} />
                        </h3>
                        <div className="flex gap-2 flex-wrap">
                          {project.tags?.slice(0, 3).map((tag, i) => (
                            <span key={i} className="text-[10px] text-neutral-500 font-medium uppercase tracking-wider">
                              <HighlightText text={tag} highlight={searchQuery} />
                            </span>
                          ))}
                        </div>
                      </div>
                      {project.period && (
                        <span className="text-xs font-mono text-neutral-500 whitespace-nowrap ml-4">{project.period}</span>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {filteredAndSortedProjects.length === 0 && (
            <div className="col-span-full py-20 flex flex-col items-center justify-center text-neutral-500">
              <Search className="w-12 h-12 mb-4 opacity-20" />
              <p>No projects match your current filters.</p>
              <button 
                onClick={() => { setSearchQuery(''); setActiveTags([]); }}
                className="mt-4 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs text-white hover:bg-white/10 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

      </div>
    </main>
  );
}
