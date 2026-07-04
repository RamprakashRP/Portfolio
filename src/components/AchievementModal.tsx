import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Tag, ChevronLeft, ChevronRight } from 'lucide-react';
import { Achievement } from '@/data/achievements';

interface Props {
  achievement: Achievement | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function AchievementModal({ achievement, isOpen, onClose }: Props) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Prevent scrolling on body when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
      setLightboxIndex(null);
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowLeft') handlePrevImage();
      if (e.key === 'ArrowRight') handleNextImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, achievement]);

  const handlePrevImage = () => {
    if (!achievement || !achievement.media) return;
    setLightboxIndex(prev => (prev === null || prev === 0 ? achievement.media.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    if (!achievement || !achievement.media) return;
    setLightboxIndex(prev => (prev === null || prev === achievement.media.length - 1 ? 0 : prev + 1));
  };

  if (!achievement) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center px-4 sm:px-6">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative w-full max-w-7xl max-h-[85vh] h-full flex flex-col bg-[#0c0c0c] border border-white/10 rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.05)] overflow-hidden z-10"
          >
            {/* Header (LinkedIn Style) */}
            <div className="flex items-start justify-between p-6 md:px-10 md:py-8 border-b border-white/5 bg-[#111111]">
              <div className="flex gap-4 items-center">
                <div className="w-12 h-12 rounded-full border border-white/10 overflow-hidden flex-shrink-0 relative">
                  <Image src="/profile-pic.jpeg" alt="Ramprakash Raja" fill className="object-cover" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white leading-tight">Ramprakash Raja</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-neutral-400 font-medium">Software Engineer & Leader</span>
                    <span className="w-1 h-1 rounded-full bg-neutral-600" />
                    <span className="text-xs text-neutral-500 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {achievement.date}
                    </span>
                  </div>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 border border-transparent hover:border-white/10 flex items-center justify-center transition-colors flex-shrink-0"
              >
                <X className="w-4 h-4 text-neutral-400" />
              </button>
            </div>

            {/* Split Content Area */}
            <div className="flex flex-col lg:flex-row flex-1 overflow-hidden min-h-0">
              
              {/* Left Pane: Content */}
              <div className="w-full lg:w-[45%] p-6 md:p-12 overflow-y-auto custom-scrollbar border-b lg:border-b-0 lg:border-r border-white/5 relative pr-4 md:pr-10">
                
                {/* Title & Tags */}
                <div className="mb-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-4">
                    {achievement.title}
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {achievement.tags.map(tag => (
                      <div key={tag} className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] sm:text-xs font-medium text-neutral-300">
                        <Tag className="w-3 h-3" />
                        <span>{tag}</span>
                      </div>
                    ))}
                    {achievement.rpRank && (
                      <div className="flex items-center space-x-1 px-3 py-1 rounded-full bg-gradient-to-r from-neutral-800 to-neutral-900 border border-white/10 text-[10px] font-bold text-white uppercase tracking-wider">
                        Rank {achievement.rpRank}
                      </div>
                    )}
                  </div>
                </div>

                {/* Story Content */}
                <div className="prose prose-invert max-w-none">
                  <p className="text-neutral-300 text-sm md:text-base leading-relaxed whitespace-pre-wrap font-medium">
                    {achievement.description}
                  </p>
                </div>
              </div>

              {/* Right Pane: Media Gallery (Masonry Layout) */}
              <div className="w-full lg:w-[55%] p-6 md:p-12 overflow-y-auto custom-scrollbar bg-[#09090a] pl-4 md:pl-10">
                {achievement.media && achievement.media.length > 0 ? (
                  <div className="columns-1 sm:columns-2 gap-4 space-y-4">
                    {achievement.media.map((url, idx) => (
                      <div 
                        key={idx} 
                        onClick={() => setLightboxIndex(idx)}
                        className="relative rounded-xl overflow-hidden border border-white/10 bg-[#151515] break-inside-avoid group cursor-pointer"
                      >
                        <img 
                          src={url}
                          alt={`Media ${idx + 1}`}
                          className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-700 block"
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-neutral-500 text-sm font-medium">
                    No media attached
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Fullscreen Lightbox Overlay */}
          <AnimatePresence>
            {lightboxIndex !== null && achievement.media && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/95 backdrop-blur-xl"
              >
                {/* Close Button */}
                <button 
                  onClick={(e) => { e.stopPropagation(); setLightboxIndex(null); }}
                  className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-[1010]"
                >
                  <X className="w-6 h-6 text-white" />
                </button>

                {/* Left Arrow */}
                {achievement.media.length > 1 && (
                  <button 
                    onClick={(e) => { e.stopPropagation(); handlePrevImage(); }}
                    className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-[1010]"
                  >
                    <ChevronLeft className="w-6 h-6 text-white" />
                  </button>
                )}

                {/* Right Arrow */}
                {achievement.media.length > 1 && (
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleNextImage(); }}
                    className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-[1010]"
                  >
                    <ChevronRight className="w-6 h-6 text-white" />
                  </button>
                )}

                {/* Lightbox Image */}
                <motion.div 
                  key={lightboxIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="relative w-full h-full max-w-6xl max-h-[85vh] flex items-center justify-center p-4 md:p-12"
                  onClick={() => setLightboxIndex(null)}
                >
                  <img 
                    src={achievement.media[lightboxIndex]}
                    alt={`Fullscreen Media ${lightboxIndex + 1}`}
                    className="max-w-full max-h-full object-contain drop-shadow-[0_0_30px_rgba(255,255,255,0.1)] cursor-auto"
                    onClick={(e) => e.stopPropagation()}
                  />
                </motion.div>
                
                {/* Counter */}
                {achievement.media.length > 1 && (
                  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-white/10 text-white text-sm font-medium tracking-widest backdrop-blur-md">
                    {lightboxIndex + 1} / {achievement.media.length}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </AnimatePresence>
  );
}
