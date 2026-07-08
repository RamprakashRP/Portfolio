'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

import { experiences } from '@/data/experience';
import Stack from './Stack';

export default function Experience() {
  const [visibleCount, setVisibleCount] = useState(4);
  const [hoveredRoleId, setHoveredRoleId] = useState<string | null>(null);
  const [lockedRoleId, setLockedRoleId] = useState<string | null>(null);

  const handleLoadMore = () => {
    setVisibleCount(prev => Math.min(prev + 4, experiences.length));
  };

  // Helper to get active images based on hover or lock state
  const getActiveImages = () => {
    const activeId = hoveredRoleId || lockedRoleId;
    if (!activeId) return null;
    const [cIdx, rIdx] = activeId.split('-').map(Number);
    return experiences[cIdx]?.roles[rIdx]?.images || null;
  };

  const getActiveRoleDetails = () => {
    const activeId = hoveredRoleId || lockedRoleId;
    if (!activeId) return null;
    const [cIdx, rIdx] = activeId.split('-').map(Number);
    return {
      company: experiences[cIdx]?.company,
      position: experiences[cIdx]?.roles[rIdx]?.position
    };
  };

  const activeImages = getActiveImages();
  const activeRole = getActiveRoleDetails();

  return (
    <section id="experience" className="w-full bg-[#000000]/50 text-white py-32 px-6 flex justify-center border-t border-white/5">
      <div className="max-w-7xl w-full">
        
        {/* Top Header Row */}
        <div className="flex justify-between items-center text-[10px] font-bold tracking-widest text-neutral-500 uppercase mb-20">
          <span>07</span>
          <span>//EXPERIENCE</span>
          <span>2013 - PRESENT</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2.5fr] gap-10 lg:gap-20 items-start relative">
          
          {/* Left Column: Title and Image Viewer (Sticky) */}
          <div className="sticky top-32 flex flex-col items-start h-[calc(100vh-8rem)] pb-10">
            <h2 className="text-5xl md:text-6xl font-black tracking-tight uppercase break-words w-full mb-12">
              EXPERIENCE
            </h2>

            {/* Creative Image Viewer */}
            <div className="w-full flex-1 relative hidden lg:flex flex-col justify-start items-center pt-8">
              <AnimatePresence mode="wait">
                {activeImages && activeImages.length > 0 ? (
                  <motion.div 
                    key={activeImages[0]} // re-render when images change
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -20 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="relative w-full flex flex-col items-center"
                  >
                    <div className="w-full max-w-[300px] aspect-[4/5] md:aspect-square relative z-20">
                      <Stack
                        randomRotation={true}
                        sensitivity={180}
                        sendToBackOnClick={true}
                        cards={activeImages.map((src, i) => (
                          <div key={i} className="relative w-full h-full rounded-2xl overflow-hidden">
                            <Image 
                              src={src} 
                              alt={`Role highlight ${i}`}
                              fill
                              className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-50" />
                          </div>
                        ))}
                      />
                    </div>
                    
                    {/* Role Title Below Viewer */}
                    {activeRole && (
                      <div className="mt-8 text-center max-w-[300px] relative z-10">
                        <span className="text-[10px] font-bold tracking-widest text-neutral-500 uppercase block mb-1">
                          {activeRole.company}
                        </span>
                        <h4 className="text-sm text-white font-medium">
                          {activeRole.position}
                        </h4>
                      </div>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key="placeholder"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full max-w-[300px] aspect-square rounded-2xl border border-white/5 border-dashed flex flex-col items-center justify-center text-neutral-500 bg-white/[0.01]"
                  >
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-50"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                    </div>
                    <span className="text-xs font-bold tracking-widest uppercase text-white/50">Hover role to view</span>
                    <span className="text-[10px] mt-1 opacity-30 uppercase tracking-widest">Images & Certificates</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Column: Experience Cards */}
          <div className="flex flex-col">
            <div className="flex flex-col space-y-16">
              {experiences.slice(0, visibleCount).map((exp, cIdx) => (
                <div 
                  key={cIdx} 
                  className="relative group"
                >
                  {/* Card Header */}
                  <div className="flex justify-between items-center mb-8 sticky top-[120px] bg-[#000000]/90 backdrop-blur-md z-30 py-4 border-b border-white/10">
                    <h3 className="text-3xl font-black uppercase tracking-tight max-w-[70%]">
                      {exp.company}
                    </h3>
                    <div className="relative w-24 h-10 shrink-0">
                      <Image 
                        src={exp.logo} 
                        alt={`${exp.company} logo`} 
                        fill
                        className="object-contain object-right"
                      />
                    </div>
                  </div>

                  {/* Sub-Cards for Roles */}
                  <div className="flex flex-col space-y-4">
                    {exp.roles.map((role, rIdx) => {
                      const roleId = `${cIdx}-${rIdx}`;
                      const isHovered = hoveredRoleId === roleId;
                      const isLocked = lockedRoleId === roleId;
                      const isActive = isHovered || isLocked;

                      return (
                        <div 
                          key={rIdx}
                          onMouseEnter={() => setHoveredRoleId(roleId)}
                          onMouseLeave={() => setHoveredRoleId(null)}
                          onClick={() => setLockedRoleId(isLocked ? null : roleId)}
                          className={`
                            relative p-6 rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden group/role
                            ${isActive 
                              ? 'bg-white/[0.05] border-white/20 shadow-2xl scale-[1.01]' 
                              : 'bg-white/[0.01] border-white/5 hover:bg-white/[0.03] hover:border-white/10'
                            }
                          `}
                        >
                          {/* Active state glow */}
                          {isActive && (
                            <motion.div 
                              layoutId="activeRoleGlow"
                              className="absolute inset-0 bg-gradient-to-r from-white/[0.05] to-transparent pointer-events-none"
                              initial={false}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.3 }}
                            />
                          )}

                          {/* Lock Indicator */}
                          <div className={`absolute top-4 right-4 w-2 h-2 rounded-full transition-all duration-300 ${isLocked ? 'bg-white shadow-[0_0_10px_white] opacity-100' : 'opacity-0'}`} />

                          <div className="relative z-10">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs font-bold tracking-wider text-neutral-400 uppercase mb-4 space-y-2 sm:space-y-0 pr-6">
                              <span className={`transition-colors duration-300 ${isActive ? 'text-white' : 'text-neutral-300'}`}>
                                {role.position}
                              </span>
                              <span className={`px-3 py-1 rounded-full border text-[10px] ${isActive ? 'bg-white/10 border-white/20 text-white' : 'bg-transparent border-white/10 text-neutral-500'}`}>
                                {role.duration}
                              </span>
                            </div>

                            <p className={`text-sm md:text-base leading-relaxed font-light transition-colors duration-300 ${isActive ? 'text-neutral-200' : 'text-neutral-400'}`}>
                              {role.description}
                            </p>

                            {/* Inline images for mobile */}
                            {role.images && role.images.length > 0 && isActive && (
                              <div className="lg:hidden mt-8 w-full flex justify-center h-[280px] relative z-20">
                                 <Stack
                                    randomRotation={true}
                                    sensitivity={180}
                                    sendToBackOnClick={true}
                                    cards={role.images.map((src, i) => (
                                      <div key={i} className="relative w-full h-[250px] max-w-[200px] rounded-xl overflow-hidden mx-auto">
                                        <Image 
                                          src={src} 
                                          alt={`Role highlight ${i}`}
                                          fill
                                          className="object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-50" />
                                      </div>
                                    ))}
                                  />
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Load More Button */}
            {visibleCount < experiences.length && (
              <div className="mt-16 flex justify-start relative z-50">
                <button 
                  onClick={handleLoadMore}
                  className="px-6 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-semibold transition-colors pointer-events-auto"
                >
                  Load More
                </button>
              </div>
            )}
          </div>
          
        </div>
      </div>
    </section>
  );
}
