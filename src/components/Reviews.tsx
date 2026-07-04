'use client';
import React from 'react';
import { Star } from 'lucide-react';
import Link from 'next/link';

import Image from 'next/image';
import { leftReviews, rightReviews, Testimonial } from '@/data/testimonials';

export const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span className="text-sm font-semibold text-neutral-300">{rating.toFixed(1)}</span>
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => {
          // e.g., for rating 4.5: i=0,1,2,3 are full. i=4 is half.
          const isFull = i < Math.floor(rating);
          const isHalf = i === Math.floor(rating) && rating % 1 !== 0;
          const isEmpty = !isFull && !isHalf;
          
          return (
            <div key={i} className="relative w-3.5 h-3.5">
              {/* Empty Base Star */}
              <Star className="w-3.5 h-3.5 text-neutral-700 fill-neutral-700 absolute inset-0" />
              
              {/* Colored Fill Layer */}
              <div 
                className="absolute inset-0 overflow-hidden" 
                style={{ width: isFull ? '100%' : isHalf ? `${(rating % 1) * 100}%` : '0%' }}
              >
                <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500 absolute top-0 left-0" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const ReviewCard = ({ review, isSticky = true, idx = 0, topBase = 0, className = '' }: { review: Testimonial; isSticky?: boolean; idx?: number; topBase?: number; className?: string }) => {
  const topOffset = topBase + idx * 20;
  return (
    <div 
      className={`${isSticky ? 'sticky mb-8' : 'relative mb-10'} w-full bg-gradient-to-br from-[#111111] to-[#060606] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),_0_20px_40px_rgba(0,0,0,0.8)] border border-white/5 rounded-3xl p-8 flex flex-col ${className}`}
      style={isSticky ? { top: `${topOffset}px`, zIndex: 10 + idx } : {}}
    >
      <div className="flex items-center gap-4 mb-6">
        <div className="w-20 h-20 rounded-2xl bg-white/5 overflow-hidden border border-white/10 flex-shrink-0 relative">
          {review.image ? (
            <Image src={review.image} alt={review.name} fill className="object-cover" />
          ) : (
            <div className="w-full h-full bg-neutral-800 flex items-center justify-center text-[10px] text-neutral-500 text-center">
              Img
            </div>
          )}
        </div>
        <div className="flex flex-col">
          <h4 className="text-white font-semibold text-lg">{review.name}</h4>
          <span className="text-neutral-500 text-sm">{review.role}</span>
        </div>
      </div>
      
      <div className="w-full h-px bg-white/5 mb-6" />
      
      <StarRating rating={review.rating} />
      
      <p className="text-sm text-neutral-400 leading-relaxed font-light">
        {review.text}
      </p>
    </div>
  );
};

export default function Reviews() {
  return (
    <section 
      id="reviews" 
      className="relative w-full bg-[#000000]/50 text-white pt-32 pb-[30vh] px-6 flex justify-center -mt-8 rounded-t-[3rem] border-t border-white/10 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] z-50"
    >
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 relative items-start">
        
        {/* Left Column */}
        <div className="flex flex-col relative w-full h-full">
          {/* Header Block (Normal flow, scrolls away) */}
          <div className="flex flex-col items-start gap-4 mb-20">
            <div className="flex items-center space-x-2.5 bg-white/5 border border-white/10 rounded-full px-4 py-2 w-fit mb-4">
              <div className="w-3.5 h-3.5 rounded-full border-[1.5px] border-white/80 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-white/80 rounded-full" />
              </div>
              <span className="text-sm font-medium text-white">Happy Team</span>
            </div>

            <h2 className="text-[3.5rem] md:text-7xl font-normal tracking-[-0.04em] mb-4 text-white">
              Coworkers Love me
            </h2>
            
            <p className="text-neutral-400 text-sm md:text-base font-normal mb-8">
              Trusted by 100+ happy Coworkers, adding 95% Satisfaction.
            </p>

            {/* Stats Row */}
            <div className="flex items-center gap-4 mb-10 w-full">
              <div className="bg-[#0c0c0c] border border-white/5 rounded-xl py-8 px-4 flex flex-col items-center justify-center flex-1">
                <span className="text-4xl font-semibold text-white mb-2 tracking-tight">100+</span>
                <span className="text-sm text-neutral-400">Happy clients</span>
              </div>
              <div className="bg-[#0c0c0c] border border-white/5 rounded-xl py-8 px-4 flex flex-col items-center justify-center flex-1">
                <span className="text-4xl font-semibold text-white mb-2 tracking-tight">30+</span>
                <span className="text-sm text-neutral-400">Projects Worked</span>
              </div>
              <div className="bg-[#0c0c0c] border border-white/5 rounded-xl py-8 px-4 flex flex-col items-center justify-center flex-1">
                <span className="text-4xl font-semibold text-white mb-2 tracking-tight">4.8</span>
                <span className="text-sm text-neutral-400">Average Rating</span>
              </div>
            </div>

            {/* Buttons Row */}
            <div className="flex items-center gap-4">
              <Link 
                href="/projects"
                className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white text-sm font-semibold hover:bg-white/10 transition-colors whitespace-nowrap w-fit"
              >
                See All Projects
              </Link>
              <Link 
                href="/contact"
                className="px-6 py-3 rounded-full bg-neutral-200 text-black text-sm font-semibold hover:bg-white transition-colors whitespace-nowrap w-fit"
              >
                Contact Now
              </Link>
            </div>
          </div>

          {/* Left Cards Stack */}
          <div className="flex flex-col relative w-full">
            {leftReviews.map((review, idx) => (
              <ReviewCard key={`left-${idx}`} review={review} idx={idx} topBase={120} />
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col relative w-full h-full">
          {/* Right Cards Stack (Start sticking immediately without header) */}
          <div className="flex flex-col relative w-full pt-10 md:pt-0">
            {rightReviews.map((review, idx) => (
              <ReviewCard key={`right-${idx}`} review={review} idx={idx} topBase={120} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
