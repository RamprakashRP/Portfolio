'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Lanyard from './Lanyard';
import { ArrowUpRight, MousePointer2, Bell } from 'lucide-react';
import Image from 'next/image';
import { useLoaderStore } from '@/store/loaderStore';

export default function Hero() {
  const { isLoading } = useLoaderStore();

  return (
    <section className="min-h-[150vh] text-white relative flex flex-col items-center pt-32 pb-24 px-6 font-sans">
      
      {/* Background Video (Hero Only) */}
      <div className="absolute top-0 left-0 w-full h-[100vh] z-0 overflow-hidden pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover [mask-image:linear-gradient(to_bottom,black_80%,transparent_100%)]"
        >
          <source src="/background.mp4" type="video/mp4" />
        </video>
        {/* Fallback ambient light */}
        <div className="absolute top-0 right-1/4 w-[800px] h-[800px] bg-white/5 rounded-full blur-[150px] pointer-events-none" />
      </div>

      {/* Lanyard Background */}
      <div className="absolute inset-x-0 top-0 h-[100vh] z-[20] pointer-events-none overflow-hidden hidden md:block">
        <div className="w-full h-full relative">
          <Lanyard
            position={[0, 0, 20]}
            gravity={[0, -60, -5]}
            frontImage="/lanyard/ID Front.png"
            backImage="/lanyard/ID Back.png"
          />
        </div>
      </div>

      {/* --- HERO SECTION --- */}
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-[1.2fr_auto_0.8fr] gap-8 items-center relative mb-24">

        {/* Left: Text Content */}
        <div className="flex flex-col space-y-6 max-w-xl md:items-start items-center text-center md:text-left mx-auto md:mx-0 z-30 relative">
          {/* Badge */}
          <motion.div 
            initial="hidden"
            animate={isLoading ? "hidden" : "visible"}
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-3 py-1.5 w-fit"
          >
            <div className="w-4 h-4 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik0xMiAydjIwTTIyIDEySDIiLz48L3N2Zz4=')] bg-cover bg-center opacity-70" />
            <span className="text-xs font-medium text-neutral-300">Software Developer / AIML Professional</span>
          </motion.div>

          <motion.h1 
            initial="hidden"
            animate={isLoading ? "hidden" : "visible"}
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-[4.5rem] font-bold tracking-tight leading-[1.1] mt-2 uppercase drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)] flex flex-col md:flex-row md:items-center cursor-default"
          >
            <motion.span 
              whileHover={{ scale: 1.05, textShadow: "0px 0px 20px rgba(255,255,255,0.8)" }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="text-white inline-block origin-left"
            >
              Ramprakash
            </motion.span>
            <motion.span 
              whileHover={{ scale: 1.05, textShadow: "0px 0px 20px rgba(255,255,255,0.5)", WebkitTextStroke: '2px rgba(255,255,255,1)' } as any}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="md:ml-4 text-transparent inline-block origin-left transition-colors duration-300" 
              style={{ WebkitTextStroke: '1px rgba(255,255,255,0.5)' }}
            >
              Raja
            </motion.span>
            <span className="sr-only"> - AI Developer & Data Scientist</span>
          </motion.h1>

          <motion.p 
            initial="hidden"
            animate={isLoading ? "hidden" : "visible"}
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm md:text-base text-neutral-200 leading-relaxed font-light mt-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] max-w-[95%]"
          >
            <strong className="text-white font-medium drop-shadow-md">Ramprakash Raja</strong> is an AI Developer and Data Scientist based in Chennai, Tamil Nadu. Specializing in building scalable applications with Python, FastAPI, and TypeScript, he is an active Google Student Ambassador and Microsoft Student Ambassador. Ramprakash is currently preparing for his upcoming transition to the University of Waterloo for the MDSAI Co-op program.
          </motion.p>

          {/* Buttons - Elevated z-index to be above Lanyard */}
          <motion.div 
            initial="hidden"
            animate={isLoading ? "hidden" : "visible"}
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center space-x-4 pt-4 relative z-[30] justify-center md:justify-start"
          >
            <Link href="/projects" className="px-6 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-medium transition-colors">
              See All Projects
            </Link>
            <Link href="/contact" className="px-6 py-2.5 rounded-full bg-gradient-to-b from-white to-neutral-200 text-black text-sm font-semibold hover:opacity-90 transition-opacity shadow-[0_0_30px_rgba(255,255,255,0.4)]">
              Contact Now
            </Link>
            <div 
              onClick={() => window.dispatchEvent(new Event('open-notifications'))}
              className="relative w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer group" 
              title="Notifications"
            >
              <Bell className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors" />
              {/* Notification Ping Dot */}
              <span className="absolute top-2.5 right-2.5 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
            </div>
          </motion.div>
        </div>

        {/* Center: Lanyard Spacer */}
        <div className="relative w-full min-w-[300px] h-[500px] mx-auto hidden lg:block">
          {/* Empty spacer since lanyard is now absolute */}
        </div>

        {/* Right: Testimonials */}
        <div className="hidden lg:flex flex-col justify-center space-y-24 relative pl-4 z-10">

          {/* Testimonial 1 */}
          <motion.div 
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            className="bg-[#0a0a0a]/80 backdrop-blur-md border border-white/10 p-5 rounded-2xl w-64 transform -rotate-[8deg] shadow-2xl relative"
          >
            <p className="text-[13px] italic text-neutral-300 font-light leading-relaxed">
              " Working with him was a game changer! "
            </p>
            <p className="text-[11px] text-neutral-500 text-right mt-3">- Madhesh</p>
            <MousePointer2 className="w-4 h-4 text-white/50 absolute -bottom-6 right-8 transform rotate-12" />
          </motion.div>

          {/* Testimonial 2 */}
          <motion.div 
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 1 }}
            className="bg-[#0a0a0a]/80 backdrop-blur-md border border-white/10 p-5 rounded-2xl w-64 transform rotate-[6deg] shadow-2xl self-end relative right-8"
          >
            <MousePointer2 className="w-4 h-4 text-white/50 absolute -top-6 -left-4 transform -rotate-45" />
            <p className="text-[13px] italic text-neutral-300 font-light leading-relaxed">
              " We increased our conversions by 200% "
            </p>
            <p className="text-[11px] text-neutral-500 text-right mt-3">- Ryan</p>
          </motion.div>
        </div>

      </div>

      {/* --- ACHIEVEMENTS BENTO GRID (3 Cols) --- */}
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10 mt-12">

        {/* Rank 1 (Col Span 2) */}
        <Link href="/achievements" className="col-span-1 md:col-span-2 row-span-2 bg-[#09090a] border border-white/10 rounded-3xl p-6 h-[450px] flex flex-col justify-end group relative overflow-hidden cursor-pointer hover:border-white/20 transition-colors shadow-2xl">
          <Image src="/achievements/sundar-pichai/1.jpg" alt="Meeting Sundar Pichai" fill className="object-cover opacity-60 group-hover:opacity-80 transition-opacity" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-black/40 to-transparent z-10 opacity-90" />
          <div className="relative z-20 flex justify-between items-end h-full">
            <h3 className="text-2xl font-semibold text-white max-w-sm">Meeting Sundar Pichai as Top 6 Google Student Ambassador</h3>
            <div className="w-12 h-12 rounded-full bg-black border border-white/10 flex items-center justify-center mb-2 ml-2 shadow-lg group-hover:bg-white/10 transition-colors flex-shrink-0">
              <ArrowUpRight className="w-5 h-5 text-neutral-400 group-hover:text-white transition-colors" />
            </div>
          </div>
        </Link>

        {/* Rank 3 (Col Span 1) */}
        <Link href="/achievements" className="col-span-1 md:col-span-1 row-span-2 bg-[#09090a] border border-white/10 rounded-3xl p-6 h-[450px] flex flex-col justify-end group relative overflow-hidden cursor-pointer hover:border-white/20 transition-colors shadow-2xl">
          <Image src="/achievements/overall-champions/1.jpg" alt="Overall Men's Trophy" fill className="object-cover opacity-60 group-hover:opacity-80 transition-opacity" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-black/40 to-transparent z-10 opacity-90" />
          <div className="relative z-20 flex justify-between items-end h-full">
            <h3 className="text-xl font-semibold text-white">Overall Men's Trophy - Sports Leadership</h3>
            <div className="w-12 h-12 rounded-full bg-black border border-white/10 flex items-center justify-center mb-2 ml-2 shadow-lg group-hover:bg-white/10 transition-colors flex-shrink-0">
              <ArrowUpRight className="w-5 h-5 text-neutral-400 group-hover:text-white transition-colors" />
            </div>
          </div>
        </Link>

        {/* Rank 4 (Col Span 1) */}
        <Link href="/achievements" className="col-span-1 md:col-span-1 row-span-2 bg-[#09090a] border border-white/10 rounded-3xl p-6 h-[450px] flex flex-col justify-end group relative overflow-hidden cursor-pointer hover:border-white/20 transition-colors shadow-2xl">
          <Image src="/achievements/dubai-ai-film-festival/1.jpg" alt="AI Film Festival Dubai" fill className="object-cover opacity-60 group-hover:opacity-80 transition-opacity" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-black/40 to-transparent z-10 opacity-90" />
          <div className="relative z-20 flex justify-between items-end h-full">
            <h3 className="text-xl font-semibold text-white">AI Film Festival Dubai - Winning Candidate</h3>
            <div className="w-12 h-12 rounded-full bg-black border border-white/10 flex items-center justify-center mb-2 ml-2 shadow-lg group-hover:bg-white/10 transition-colors flex-shrink-0">
              <ArrowUpRight className="w-5 h-5 text-neutral-400 group-hover:text-white transition-colors" />
            </div>
          </div>
        </Link>

        {/* Rank 2 (Col Span 2) */}
        <Link href="/achievements" className="col-span-1 md:col-span-2 row-span-2 bg-[#09090a] border border-white/10 rounded-3xl p-6 h-[450px] flex flex-col justify-end group relative overflow-hidden cursor-pointer hover:border-white/20 transition-colors shadow-2xl">
          <Image src="/achievements/best-outgoing-student/1.jpg" alt="Best Outgoing Student" fill className="object-cover opacity-60 group-hover:opacity-80 transition-opacity" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-black/40 to-transparent z-10 opacity-90" />
          <div className="relative z-20 flex justify-between items-end h-full">
            <h3 className="text-2xl font-semibold text-white max-w-sm">Best Outgoing Student (2022-2026) at SRM IST</h3>
            <div className="w-12 h-12 rounded-full bg-black border border-white/10 flex items-center justify-center mb-2 ml-2 shadow-lg group-hover:bg-white/10 transition-colors flex-shrink-0">
              <ArrowUpRight className="w-5 h-5 text-neutral-400 group-hover:text-white transition-colors" />
            </div>
          </div>
        </Link>

      </div>
    </section>
  );
}
