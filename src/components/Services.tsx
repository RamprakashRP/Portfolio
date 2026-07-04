'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  Monitor
} from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import Link from 'next/link';
import { leftCards, rightCards, ServiceData } from '@/data/services';

const tickerItems = [
  'Team Management', 'Promotions', 'Copywriting', 'Posters', 'Database Management', 'Logos',
  'Custom Code', 'SEO', 'Icons', 'Social Media', 'Landing Pages', 'Optimization', 'Full Stack'
];

const ServiceCard = ({ card }: { card: ServiceData }) => {
  const hasImages = card.images && card.images.length > 0;
  const isSlider = hasImages && card.images.length > 1;
  const Icon = (LucideIcons as any)[card.iconName] || LucideIcons.Check;

  return (
    <div className="bg-gradient-to-b from-[#151515] to-[#09090a] border border-white/10 rounded-[2rem] p-8 flex flex-col gap-6 shadow-[0_20px_40px_rgba(0,0,0,0.8),inset_0_1px_2px_rgba(255,255,255,0.15)] transform transition-transform hover:-translate-y-1 overflow-hidden">
      <div className="flex items-center gap-3">
        <Icon className="w-5 h-5 text-neutral-300" />
        <h3 className="text-xl font-bold text-white">{card.title}</h3>
      </div>
      
      <p className="text-sm text-neutral-400 leading-relaxed font-light">
        {card.description}
      </p>

      {hasImages && (
        <div className="mt-4 relative w-full h-[244px] rounded-xl overflow-hidden bg-neutral-900/50 border border-white/5 flex items-center shadow-inner">
          {isSlider ? (
            <motion.div 
              className="flex gap-4 h-full"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 15 }}
            >
              {[...card.images!, ...card.images!].map((img, idx) => (
                <div key={idx} className="relative min-w-[350px] h-full rounded-lg overflow-hidden border border-white/10 shadow-md">
                  <Image src={img} alt={`${card.title} preview ${idx}`} fill className="object-cover" />
                </div>
              ))}
            </motion.div>
          ) : (
            <div className="relative w-full h-full rounded-xl overflow-hidden">
              <Image src={card.images![0]} alt={`${card.title} preview`} fill className="object-cover" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default function Services() {
  return (
    <section 
      id="services" 
      className="relative w-full bg-[#000000]/50 text-white pt-32 pb-24 px-6 flex justify-center -mt-8 rounded-t-[3rem] border-t border-white/10 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] z-20"
    >
      <div className="max-w-6xl w-full flex flex-col">
        
        {/* Top container */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div className="flex flex-col items-start gap-4">
            <div className="flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 w-fit">
              <div className="w-4 h-4 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik0xMiAydjIwTTIyIDEySDIiLz48L3N2Zz4=')] bg-cover bg-center opacity-70" />
              <span className="text-xs font-semibold text-neutral-300 tracking-wider">Services</span>
            </div>

            <h2 className="text-5xl md:text-6xl font-medium tracking-tight">
              Services <span className="text-neutral-500">Provided</span>
            </h2>
            <p className="text-neutral-400 text-sm md:text-base max-w-xl">
              Explore our diverse services and unlock tailored solutions that elevate your growth and impact.
            </p>
          </div>

          <Link 
            href="/contact" 
            className="px-6 py-3 rounded-full bg-gradient-to-b from-neutral-200 to-neutral-400 text-black text-sm font-bold shadow-[0_4px_10px_rgba(255,255,255,0.2)] hover:shadow-[0_4px_15px_rgba(255,255,255,0.4)] transition-all whitespace-nowrap w-fit transform hover:-translate-y-0.5"
          >
            Contact Now
          </Link>
        </div>

        {/* Services Bento */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full mb-20">
          
          {/* Left Cards */}
          <div className="flex flex-col gap-6">
            {leftCards.map((card, idx) => (
              <ServiceCard key={idx} card={card} />
            ))}
          </div>

          {/* Right Cards */}
          <div className="flex flex-col gap-6">
            {rightCards.map((card, idx) => (
              <ServiceCard key={idx} card={card} />
            ))}
          </div>

        </div>

        {/* More Services Ticker */}
        <div className="w-full relative overflow-hidden flex flex-col gap-4 py-10 border-t border-b border-white/5">
          {/* Fading Edges */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#000000] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#000000] to-transparent z-10 pointer-events-none" />
          
          <motion.div 
            className="flex gap-4 w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
          >
            {[...tickerItems, ...tickerItems].map((item, idx) => (
              <div 
                key={idx} 
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/5 text-sm font-medium text-neutral-400 whitespace-nowrap"
              >
                <Monitor className="w-4 h-4 text-neutral-500" />
                {item}
              </div>
            ))}
          </motion.div>

          <motion.div 
            className="flex gap-4 w-max"
            animate={{ x: ["-50%", "0%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
          >
            {[...tickerItems, ...tickerItems].reverse().map((item, idx) => (
              <div 
                key={idx} 
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/5 text-sm font-medium text-neutral-400 whitespace-nowrap"
              >
                <Monitor className="w-4 h-4 text-neutral-500" />
                {item}
              </div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}
