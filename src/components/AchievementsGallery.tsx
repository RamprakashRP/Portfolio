'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Calendar, Tag, Search, Filter, SortDesc, ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Achievement } from '@/data/achievements';

interface Props {
  achievements: Achievement[];
  onViewDetails?: (achievement: Achievement) => void;
}

type SortMode = 'rp-rank' | 'recent' | 'chronological';
type MatchMode = 'any' | 'all';

// Utility to highlight search query in text
function HighlightedText({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <>{text}</>;
  
  const regex = new RegExp(`(${query})`, 'gi');
  const parts = text.split(regex);
  
  return (
    <>
      {parts.map((part, i) => 
        regex.test(part) ? (
          <mark key={i} className="bg-white/20 text-white rounded px-0.5">{part}</mark>
        ) : (
          part
        )
      )}
    </>
  );
}

export default function AchievementsGallery({ achievements, onViewDetails }: Props) {
  const [lockedId, setLockedId] = useState<string>(achievements[0]?.id);
  const [hoverId, setHoverId] = useState<string | null>(null);
  const activeId = hoverId || lockedId;
  const [searchQuery, setSearchQuery] = useState('');
  
  // Tag Filter State
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [matchMode, setMatchMode] = useState<MatchMode>('any');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  // Default sort to 'recent'
  const [sortMode, setSortMode] = useState<SortMode>('recent');

  // Derive unique tags
  const availableTags = useMemo(() => {
    const tags = new Set<string>();
    achievements.forEach(a => a.tags.forEach(t => tags.add(t)));
    return Array.from(tags).sort();
  }, [achievements]);

  // Handle clicking outside the popover to close it
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleTag = (tag: string) => {
    if (tag === 'All') {
      setSelectedTags([]);
      return;
    }

    if (selectedTags.includes(tag)) {
      setSelectedTags(prev => prev.filter(t => t !== tag));
    } else {
      setSelectedTags(prev => [...prev, tag]);
    }
  };

  // Filter and Sort logic
  const processedAchievements = useMemo(() => {
    let result = [...achievements];

    // Filter by Tags
    if (selectedTags.length > 0) {
      result = result.filter(a => {
        if (matchMode === 'all') {
          // Achievement must have EVERY selected tag
          return selectedTags.every(t => a.tags.includes(t));
        } else {
          // Achievement must have AT LEAST ONE selected tag
          return selectedTags.some(t => a.tags.includes(t));
        }
      });
    }

    // Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(a => 
        a.title.toLowerCase().includes(q) || 
        a.description.toLowerCase().includes(q)
      );
    }

    // Sort
    result.sort((a, b) => {
      const dateA = new Date(a.date).getTime() || 0;
      const dateB = new Date(b.date).getTime() || 0;

      if (sortMode === 'recent') return dateB - dateA;
      if (sortMode === 'chronological') return dateA - dateB;
      
      // rp-rank sort
      if (sortMode === 'rp-rank') {
        const rankA = a.rpRank ?? Infinity;
        const rankB = b.rpRank ?? Infinity;
        
        if (rankA !== rankB) {
          return rankA - rankB; // Lower rank number comes first
        }
        return dateB - dateA; // Fallback to recent if both unranked or same rank
      }
      return 0;
    });

    return result;
  }, [achievements, selectedTags, matchMode, searchQuery, sortMode]);

  // Ensure activeId is valid after filtering
  const activeAchievement = processedAchievements.find(a => a.id === activeId) || processedAchievements[0];

  return (
    <div className="w-full mt-32 mb-10">
      
      {/* Control Bar */}
      <div className="mb-12 flex flex-col md:flex-row gap-4 justify-between items-center bg-[#09090a] border border-white/10 rounded-2xl p-4 shadow-xl">
        
        {/* Search */}
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input 
            type="text" 
            placeholder="Search achievements..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-black/50 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-white/30 transition-colors placeholder:text-neutral-600"
          />
        </div>

        <div className="flex w-full md:w-auto items-center gap-4 relative">
          
          {/* Custom Tag Filter Popover */}
          <div className="relative" ref={filterRef}>
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center bg-black/50 border border-white/10 rounded-full px-4 py-2 hover:bg-white/5 transition-colors"
            >
              <Filter className="w-4 h-4 text-neutral-400 mr-2" />
              <span className="text-sm text-white mr-2">
                {selectedTags.length === 0 ? 'All Tags' : `${selectedTags.length} Tags`}
              </span>
              <ChevronDown className="w-4 h-4 text-neutral-400" />
            </button>

            <AnimatePresence>
              {isFilterOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-2 w-64 bg-[#0a0a0a] border border-white/10 rounded-2xl p-4 shadow-2xl z-50 flex flex-col gap-4"
                >
                  {/* Match Mode Radio Buttons */}
                  <div className="bg-white/5 rounded-lg p-1 flex">
                    <button 
                      onClick={() => setMatchMode('any')}
                      className={`flex-1 text-xs py-1.5 rounded-md font-medium transition-colors ${matchMode === 'any' ? 'bg-white/10 text-white' : 'text-neutral-400 hover:text-white'}`}
                    >
                      Match Any
                    </button>
                    <button 
                      onClick={() => setMatchMode('all')}
                      className={`flex-1 text-xs py-1.5 rounded-md font-medium transition-colors ${matchMode === 'all' ? 'bg-white/10 text-white' : 'text-neutral-400 hover:text-white'}`}
                    >
                      Match All
                    </button>
                  </div>
                  
                  {/* Tags List */}
                  <div className="flex flex-col gap-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                    <label className="flex items-center space-x-3 cursor-pointer group">
                      <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${selectedTags.length === 0 ? 'bg-white border-white' : 'border-white/20 group-hover:border-white/50'}`}>
                        {selectedTags.length === 0 && <Check className="w-3 h-3 text-black" />}
                      </div>
                      <span className={`text-sm ${selectedTags.length === 0 ? 'text-white' : 'text-neutral-400 group-hover:text-neutral-200'}`}>All Tags</span>
                      <input type="checkbox" className="hidden" checked={selectedTags.length === 0} onChange={() => toggleTag('All')} />
                    </label>

                    {availableTags.map(tag => {
                      const isSelected = selectedTags.includes(tag);
                      return (
                        <label key={tag} className="flex items-center space-x-3 cursor-pointer group">
                          <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${isSelected ? 'bg-white border-white' : 'border-white/20 group-hover:border-white/50'}`}>
                            {isSelected && <Check className="w-3 h-3 text-black" />}
                          </div>
                          <span className={`text-sm ${isSelected ? 'text-white' : 'text-neutral-400 group-hover:text-neutral-200'}`}>{tag}</span>
                          <input type="checkbox" className="hidden" checked={isSelected} onChange={() => toggleTag(tag)} />
                        </label>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sort */}
          <div className="relative" ref={sortRef}>
            <button 
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="flex items-center bg-black/50 border border-white/10 rounded-full px-4 py-2 hover:bg-white/5 transition-colors"
            >
              <SortDesc className="w-4 h-4 text-neutral-400 mr-2" />
              <span className="text-sm text-white mr-2">
                {sortMode === 'recent' ? 'Recent First' : sortMode === 'rp-rank' ? 'RP Rank' : 'Oldest First'}
              </span>
              <ChevronDown className="w-4 h-4 text-neutral-400" />
            </button>

            <AnimatePresence>
              {isSortOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-2 w-48 bg-[#0a0a0a] border border-white/10 rounded-2xl p-2 shadow-2xl z-50 flex flex-col gap-1"
                >
                  <button 
                    onClick={() => { setSortMode('recent'); setIsSortOpen(false); }}
                    className={`text-left px-3 py-2 rounded-lg text-sm transition-colors ${sortMode === 'recent' ? 'bg-white/10 text-white' : 'text-neutral-400 hover:bg-white/5 hover:text-white'}`}
                  >
                    Recent First
                  </button>
                  <button 
                    onClick={() => { setSortMode('rp-rank'); setIsSortOpen(false); }}
                    className={`text-left px-3 py-2 rounded-lg text-sm transition-colors ${sortMode === 'rp-rank' ? 'bg-white/10 text-white' : 'text-neutral-400 hover:bg-white/5 hover:text-white'}`}
                  >
                    RP Rank
                  </button>
                  <button 
                    onClick={() => { setSortMode('chronological'); setIsSortOpen(false); }}
                    className={`text-left px-3 py-2 rounded-lg text-sm transition-colors ${sortMode === 'chronological' ? 'bg-white/10 text-white' : 'text-neutral-400 hover:bg-white/5 hover:text-white'}`}
                  >
                    Oldest First
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="relative flex flex-col lg:flex-row gap-8 lg:gap-12 min-h-[600px]">
        
        {/* LEFT: Sticky Featured Viewer */}
        <div className="hidden lg:block w-full lg:w-1/2 lg:sticky lg:top-32 lg:h-[600px] rounded-3xl overflow-hidden bg-[#09090a] border border-white/10 flex-shrink-0 relative group shadow-2xl">
          {activeAchievement ? (
            <>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeAchievement.id}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="absolute inset-0 z-0"
                >
                  {activeAchievement.highlightCover || activeAchievement.previewCover || activeAchievement.media[0] ? (
                    <Image 
                      src={activeAchievement.highlightCover || activeAchievement.previewCover || activeAchievement.media[0]} 
                      alt={activeAchievement.title}
                      fill
                      className="object-cover opacity-80"
                    />
                  ) : (
                    <div className="w-full h-full bg-neutral-900 flex items-center justify-center">
                      <span className="text-neutral-600">No Image</span>
                    </div>
                  )}
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                </motion.div>
              </AnimatePresence>

              {/* Featured Content Overlay */}
              <div className="absolute inset-0 z-10 flex flex-col justify-end p-8 md:p-10 pointer-events-none">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`content-${activeAchievement.id}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, ease: "easeOut", delay: 0.1 }}
                  >
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      {/* Render Tags */}
                      {activeAchievement.tags.slice(0, 2).map((tag) => (
                        <div key={tag} className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] sm:text-xs font-medium text-white">
                          <Tag className="w-3 h-3" />
                          <span>{tag}</span>
                        </div>
                      ))}
                      {activeAchievement.tags.length > 2 && (
                         <div className="flex items-center px-3 py-1 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-[10px] sm:text-xs text-neutral-400">
                           +{activeAchievement.tags.length - 2}
                         </div>
                      )}
                      
                      <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-black/30 backdrop-blur-md border border-white/10 text-[10px] sm:text-xs text-neutral-300">
                        <Calendar className="w-3 h-3" />
                        <span>{activeAchievement.date}</span>
                      </div>
                      
                      {activeAchievement.rpRank && (
                        <div className="flex items-center space-x-1 px-2 py-1 rounded bg-white/10 text-[10px] font-bold text-white uppercase tracking-wider">
                          Rank {activeAchievement.rpRank}
                        </div>
                      )}
                    </div>

                    <h3 className="text-3xl md:text-4xl font-semibold text-white tracking-tight mb-4 drop-shadow-lg leading-tight">
                      <HighlightedText text={activeAchievement.title} query={searchQuery} />
                    </h3>
                    
                    <p className="text-neutral-300 text-sm md:text-base line-clamp-3 leading-relaxed drop-shadow-md mb-6 max-w-xl">
                      <HighlightedText text={activeAchievement.description} query={searchQuery} />
                    </p>

                    <button 
                      onClick={() => onViewDetails && onViewDetails(activeAchievement)}
                      className="inline-flex items-center space-x-2 bg-white text-black px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-neutral-200 transition-colors pointer-events-auto w-fit"
                    >
                      <span>View Details</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </motion.div>
                </AnimatePresence>
              </div>
            </>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-neutral-500">
              <Search className="w-8 h-8 mb-4 opacity-50" />
              <p>No achievements match your search.</p>
            </div>
          )}
        </div>

        {/* RIGHT: Interactive Scrollable List */}
        <div 
          className="w-full lg:w-1/2 flex flex-col space-y-3 custom-scrollbar pb-10"
          onMouseLeave={() => setHoverId(null)}
        >
          {processedAchievements.map((achievement) => {
            const isActive = activeId === achievement.id;
            const isLocked = lockedId === achievement.id;
            return (
              <div 
                key={achievement.id}
                onMouseEnter={() => setHoverId(achievement.id)}
                onClick={() => {
                  setLockedId(achievement.id);
                  if (window.innerWidth < 1024 && onViewDetails) {
                    onViewDetails(achievement);
                  }
                }}
                className={`relative p-5 rounded-2xl cursor-pointer transition-all duration-300 border flex-shrink-0 w-full ${
                  isActive 
                    ? 'bg-white/10 border-white/20 shadow-lg lg:scale-[1.02] z-10' 
                    : 'bg-transparent border-white/5 lg:border-transparent hover:bg-white/5'
                } ${isLocked && !isActive ? 'ring-1 ring-white/10' : ''}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1 pr-4">
                    <h4 className={`text-lg md:text-xl font-medium transition-colors ${
                      isActive ? 'text-white' : 'text-neutral-400'
                    }`}>
                      <HighlightedText text={achievement.title} query={searchQuery} />
                    </h4>
                    <div className="flex items-center space-x-3 mt-2">
                      {achievement.rpRank && (
                        <span className="px-2 py-0.5 rounded bg-white/10 text-[9px] font-bold text-white uppercase tracking-wider">
                          Rank {achievement.rpRank}
                        </span>
                      )}
                      
                      <div className="flex gap-2">
                         {achievement.tags.slice(0, 2).map((tag, idx) => (
                           <span key={idx} className={`text-xs ${isActive ? 'text-neutral-300' : 'text-neutral-600'} transition-colors font-medium`}>
                             {tag}
                           </span>
                         ))}
                      </div>

                      <span className="w-1 h-1 rounded-full bg-neutral-700" />
                      <span className={`text-xs ${isActive ? 'text-neutral-400' : 'text-neutral-600'} transition-colors`}>
                        {achievement.date}
                      </span>
                    </div>
                  </div>

                  <div className={`w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 transition-all duration-500 ${
                    isActive ? 'opacity-40 grayscale' : 'opacity-100 grayscale-0 shadow-md ring-1 ring-white/10'
                  }`}>
                    {achievement.highlightCover || achievement.previewCover || achievement.media[0] ? (
                      <Image 
                        src={achievement.highlightCover || achievement.previewCover || achievement.media[0]} 
                        alt="" 
                        width={64} 
                        height={64} 
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="w-full h-full bg-neutral-900" />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
