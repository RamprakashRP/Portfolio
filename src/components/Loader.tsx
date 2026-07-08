'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLoaderStore } from '@/store/loaderStore';
import Image from 'next/image';

export default function Loader() {
  const { isLoading, finishLoading } = useLoaderStore();

  useEffect(() => {
    // Prevent scrolling while loading
    if (isLoading) {
      document.body.style.overflow = 'hidden';
      // Simulate loading time
      const timer = setTimeout(() => {
        finishLoading();
        document.body.style.overflow = '';
      }, 2500);
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = '';
      };
    }
  }, [isLoading, finishLoading]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="global-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#000000]"
        >
          {/* Logo and Progress Ring Container */}
          <div className="relative flex items-center justify-center w-40 h-40 mb-8">
            {/* SVG Progress Ring */}
            <svg 
              className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" 
              viewBox="0 0 100 100"
            >
              {/* Background Track */}
              <circle
                cx="50"
                cy="50"
                r="46"
                fill="none"
                stroke="rgba(255, 255, 255, 0.05)"
                strokeWidth="1.5"
              />
              {/* Fluid Progress Circle */}
              <motion.circle
                cx="50"
                cy="50"
                r="46"
                fill="none"
                stroke="#ffffff"
                strokeWidth="1.5"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2.3, ease: "easeInOut" }}
              />
            </svg>
            
            {/* RP Logo in the center */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0, filter: 'blur(10px)' }}
              animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative w-16 h-16 z-10 flex items-center justify-center"
            >
              <Image 
                src="/rp-logo.png" 
                alt="RP Logo" 
                fill
                className="object-contain"
                priority
              />
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-white/50 text-xs font-medium tracking-[0.3em] uppercase"
          >
            Loading Experience
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
