'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useInView, animate } from 'framer-motion';

const statsData = [
  { value: 97, suffix: '%', label: 'ACADEMIC PERCENTAGE' },
  { value: 30, suffix: '+', label: 'PROJECTS COMPLETED' },
  { value: 75, suffix: '+', label: 'BADGES/COURSES COMPLETED' },
  { value: 25000, suffix: '+', label: 'LINES OF CODE WRITTEN' },
];

const Counter = ({ value, suffix = '' }: { value: number, suffix?: string }) => {
  const ref = useRef(null);
  // Triggers when the element is 100px into the viewport
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (inView) {
      // Animate from 0 to target value over 3.5 seconds
      const controls = animate(0, value, {
        duration: 3.5,
        ease: "easeOut",
        onUpdate: (v) => {
          setDisplayValue(Math.round(v).toString());
        }
      });
      
      return controls.stop;
    }
  }, [inView, value]);

  return (
    <div ref={ref} className="text-7xl md:text-8xl font-black tracking-tighter text-white mb-6">
      {displayValue}{suffix}
    </div>
  );
};

export default function Stats() {
  return (
    <section id="stats" className="relative w-full bg-[#000000]/50 text-white py-32 px-6 flex justify-center border-t border-white/5 overflow-hidden">
      
      {/* Subtle Dot Grid Background Pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage: 'radial-gradient(circle at center, #ffffff 1px, transparent 1px)',
          backgroundSize: '4px 4px'
        }}
      />
      
      <div className="max-w-7xl w-full relative z-10">
        
        {/* Top Header Row */}
        <div className="flex justify-between items-center text-[10px] font-bold tracking-widest text-neutral-500 uppercase mb-24">
          <span>06</span>
          <span>//STATS</span>
          <span>FUN FACTS</span>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 items-start">
          {statsData.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-start">
              <Counter value={stat.value} suffix={stat.suffix} />
              <p className="text-[10px] sm:text-xs font-semibold tracking-widest text-neutral-500 uppercase max-w-[150px] leading-relaxed">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
