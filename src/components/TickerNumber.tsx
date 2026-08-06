'use client';
import React, { useEffect } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

// Animates a single digit vertically
function Digit({ value, height = 56 }: { value: number; height?: number }) {
  const springValue = useSpring(value, {
    stiffness: 150,
    damping: 20,
    mass: 1,
  });

  useEffect(() => {
    springValue.set(value);
  }, [value, springValue]);

  const y = useTransform(springValue, (latest) => {
    return `-${latest * height}px`;
  });

  const numbers = Array.from({ length: 10 }, (_, i) => i);

  return (
    <div 
      className="relative overflow-hidden inline-flex items-center justify-center font-mono font-bold text-white bg-neutral-900 border border-white/20 rounded-md shadow-inner mx-[2px]" 
      style={{ 
        height: `${height}px`, 
        width: `${height * 0.75}px`, 
        boxShadow: 'inset 0 4px 6px rgba(0,0,0,0.8), inset 0 -4px 6px rgba(0,0,0,0.8)' 
      }}
    >
      {/* Fake physical dividing line in the middle to look like a rotating flap/wheel */}
      <div className="absolute top-1/2 left-0 w-full h-[2px] bg-black/60 z-10 shadow-[0_1px_0_rgba(255,255,255,0.1)] pointer-events-none -translate-y-1/2" />
      
      <motion.div
        className="absolute top-0 left-0 flex flex-col w-full text-center"
        style={{ y }}
      >
        {numbers.map((num) => (
          <span 
            key={num} 
            className="flex items-center justify-center" 
            style={{ height: `${height}px`, fontSize: `${height * 0.65}px` }}
          >
            {num}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// Animates a full number string, handling variable length by splitting characters
export default function TickerNumber({ value, className = "", height = 56 }: { value: string | number; className?: string; height?: number }) {
  const valueStr = value.toString();
  
  return (
    <span className={`inline-flex flex-row items-center ${className}`}>
      {valueStr.split('').map((char, index) => {
        // If it's a number, animate it with the Digit component
        if (!isNaN(parseInt(char))) {
          return <Digit key={`${index}-${char}`} value={parseInt(char)} height={height} />;
        }
        // If it's a symbol, render it statically
        return (
          <span 
            key={`${index}-${char}`} 
            className="inline-flex items-center justify-center font-mono font-bold text-neutral-400 mx-1"
            style={{ height: `${height}px`, fontSize: `${height * 0.5}px` }}
          >
            {char}
          </span>
        );
      })}
    </span>
  );
}
