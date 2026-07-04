'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight, Calendar, Tag } from 'lucide-react';
import { achievements, Achievement } from '@/data/achievements';
import Navbar from '@/components/Navbar';
import AchievementsGallery from '@/components/AchievementsGallery';
import AchievementModal from '@/components/AchievementModal';

export default function AchievementsPage() {
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);

  const highlight1 = achievements.find(a => a.rpRank === 1);
  const highlight2 = achievements.find(a => a.rpRank === 2);
  const highlight3 = achievements.find(a => a.rpRank === 3);
  
  const highlights = [highlight1, highlight2, highlight3].filter(Boolean) as typeof achievements;
  const allAchievements = achievements;

  return (
    <div className="min-h-screen text-white font-sans selection:bg-white/20">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-6 pt-40 pb-24 flex flex-col items-center">
        
        {/* Header Block Matching Projects */}
        <div className="flex flex-col items-center text-center mb-24 w-full">
          <div className="flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 w-fit mb-8">
            <span className="text-xs font-semibold text-neutral-300 tracking-wider">Milestones & Awards</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-8 leading-tight">
            Celebrating Progress <span className="text-neutral-500">&</span><br />
            <span className="text-neutral-500">Continuous Innovation</span>
          </h1>
        </div>

        <div className="w-full">
          {/* --- HIGHLIGHTED HERO SECTION --- */}
          {highlights.length > 0 && (
            <div className="mb-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {highlights.map((achievement) => {
                  const isRank1 = achievement.rpRank === 1;
                  return (
                    <div 
                      key={achievement.id} 
                      onClick={() => setSelectedAchievement(achievement)}
                      className={`group relative overflow-hidden rounded-3xl bg-[#0a0a0a] border border-white/10 flex flex-col justify-end p-6 md:p-8 hover:border-white/20 transition-all cursor-pointer ${
                        isRank1 ? 'col-span-1 lg:col-span-2 h-[500px]' : 'col-span-1 h-[400px]'
                      }`}
                    >
                      {/* Background Image (Cover) */}
                      {achievement.media[0] && (
                        <div className="absolute inset-0 z-0">
                          <Image 
                            src={achievement.media[0]} 
                            alt={achievement.title}
                            fill
                            className="object-cover opacity-30 group-hover:opacity-50 group-hover:scale-105 transition-all duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-[#000000]/60 to-transparent" />
                        </div>
                      )}

                      {/* Content */}
                      <div className="relative z-10 flex flex-col">
                        <div className="flex flex-wrap items-center gap-3 mb-4">
                        <div className="flex flex-wrap gap-2">
                          {achievement.tags.map(tag => (
                            <div key={tag} className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-[10px] sm:text-xs font-medium">
                              <Tag className="w-3 h-3" />
                              <span>{tag}</span>
                            </div>
                          ))}
                        </div>
                          <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/5 backdrop-blur-md border border-white/5 text-[10px] sm:text-xs text-neutral-300">
                            <Calendar className="w-3 h-3" />
                            <span>{achievement.date}</span>
                          </div>
                        </div>

                        <h3 className={`${isRank1 ? 'text-3xl md:text-5xl' : 'text-2xl md:text-3xl'} font-medium tracking-tight mb-3 group-hover:text-neutral-200 transition-colors`}>
                          {achievement.title}
                        </h3>
                        <p className={`text-neutral-400 line-clamp-2 leading-relaxed ${isRank1 ? 'text-base max-w-3xl' : 'text-sm'}`}>
                          {achievement.description}
                        </p>

                        {/* Hover icon */}
                        <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                          <ArrowUpRight className="w-5 h-5 text-white" />
                        </div>
                      </div>
                    </div>

                  );
                })}
              </div>
            </div>
          )}

          {/* --- ALL ACHIEVEMENTS INTERACTIVE GALLERY --- */}
          <AchievementsGallery 
            achievements={allAchievements} 
            onViewDetails={(achievement) => setSelectedAchievement(achievement)}
          />
        </div>
      </main>

      <AchievementModal 
        achievement={selectedAchievement}
        isOpen={!!selectedAchievement}
        onClose={() => setSelectedAchievement(null)}
      />
    </div>
  );
}
