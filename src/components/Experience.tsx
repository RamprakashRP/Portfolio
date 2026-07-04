'use client';
import React, { useState } from 'react';
import Image from 'next/image';

import { experiences } from '@/data/experience';
export default function Experience() {
  const [visibleCount, setVisibleCount] = useState(4);

  const handleLoadMore = () => {
    setVisibleCount(prev => Math.min(prev + 4, experiences.length));
  };

  return (
    <section id="experience" className="w-full bg-[#000000]/50 text-white py-32 px-6 flex justify-center border-t border-white/5">
      <div className="max-w-7xl w-full">
        
        {/* Top Header Row */}
        <div className="flex justify-between items-center text-[10px] font-bold tracking-widest text-neutral-500 uppercase mb-20">
          <span>07</span>
          <span>//EXPERIENCE</span>
          <span>2013 - PRESENT</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2.5fr] gap-10 lg:gap-20 items-start">
          
          {/* Left Column: Title */}
          <div className="sticky top-32 flex flex-col items-start h-full pb-10">
            <h2 className="text-5xl md:text-6xl font-black tracking-tight uppercase break-words w-full">
              EXPERIENCE
            </h2>
          </div>

          {/* Right Column: Experience Cards */}
          <div className="flex flex-col">
            <div className="flex flex-col space-y-4">
              {experiences.slice(0, visibleCount).map((exp, idx) => (
                <div 
                  key={idx} 
                  className="relative bg-[#000000]/50 border-b border-white/5 pb-8 pt-4 overflow-hidden group hover:bg-white/[0.02] transition-colors rounded-xl px-6"
                >
                  {/* Subtle Dot Grid Background Pattern */}
                  <div 
                    className="absolute inset-0 pointer-events-none opacity-5"
                    style={{
                      backgroundImage: 'radial-gradient(circle at center, #ffffff 1px, transparent 1px)',
                      backgroundSize: '4px 4px'
                    }}
                  />
                
                <div className="relative z-10">
                  {/* Card Header */}
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="text-3xl font-black uppercase tracking-tight max-w-[70%]">
                      {exp.company}
                    </h3>
                    {/* Company Logo */}
                    <div className="relative w-24 h-10 shrink-0">
                      <Image 
                        src={exp.logo} 
                        alt={`${exp.company} logo`} 
                        fill
                        className="object-contain object-right"
                      />
                    </div>
                  </div>

                  {/* Roles */}
                  <div className="flex flex-col space-y-8">
                    {exp.roles.map((role, roleIdx) => (
                      <div key={roleIdx} className="relative">
                        {/* Connecting Line if multiple roles */}
                        {exp.roles.length > 1 && roleIdx !== exp.roles.length - 1 && (
                          <div className="absolute left-[5px] top-6 bottom-[-32px] w-px bg-white/10" />
                        )}
                        {/* Dot for timeline effect */}
                        {exp.roles.length > 1 && (
                          <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full bg-neutral-600 border-[3px] border-[#0a0a0a]" />
                        )}
                        
                        <div className={exp.roles.length > 1 ? "pl-6" : ""}>
                          {/* Role & Duration */}
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs font-bold tracking-wider text-neutral-400 uppercase mb-3 space-y-2 sm:space-y-0">
                            <span className="text-white">{role.position}</span>
                            <span>{role.duration}</span>
                          </div>

                          {/* Description */}
                          <p className="text-sm md:text-base text-neutral-300 leading-relaxed font-light">
                            {role.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

            {/* Load More Button (Now below the banners) */}
            {visibleCount < experiences.length && (
              <div className="mt-8 flex justify-start pl-6">
                <button 
                  onClick={handleLoadMore}
                  className="px-6 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-semibold transition-colors"
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
