'use client';
import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import Image from 'next/image';

const bentoSpans = [
  { colSpan: 'md:col-span-2', rowSpan: 'row-span-2' },
  { colSpan: 'md:col-span-1', rowSpan: 'row-span-2' },
  { colSpan: 'md:col-span-1', rowSpan: 'row-span-2' },
  { colSpan: 'md:col-span-2', rowSpan: 'row-span-2' }
];

export default function RecentProjects({ topProjects = [] }: { topProjects?: any[] }) {
  return (
    <section 
      id="recent-projects" 
      className="relative w-full bg-[#000000]/50 text-white pt-32 pb-24 px-6 flex justify-center -mt-8 rounded-t-[3rem] border-t border-white/10 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] z-30"
    >
      <div className="max-w-7xl w-full flex flex-col">
        
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div className="flex flex-col items-start gap-4">
            <div className="flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 w-fit">
              <div className="w-4 h-4 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik0xMiAydjIwTTIyIDEySDIiLz48L3N2Zz4=')] bg-cover bg-center opacity-70" />
              <span className="text-xs font-semibold text-neutral-300 tracking-wider">Recent Projects</span>
            </div>

            <Link href="/projects" className="flex items-center gap-4 cursor-pointer group">
              <h2 className="text-5xl md:text-6xl font-medium tracking-tight group-hover:opacity-80 transition-opacity">
                Recent <span className="text-neutral-500">Projects</span>
              </h2>
              <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center bg-white/5 group-hover:bg-white/10 transition-colors">
                <ArrowUpRight className="w-5 h-5 text-neutral-400 group-hover:text-white transition-colors" />
              </div>
            </Link>
            
            <p className="text-neutral-400 text-sm md:text-base">
              Showcase of some of my recent sleek websites
            </p>
          </div>

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

        {/* PROJECTS BENTO GRID (3 Cols) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
          
          {topProjects.slice(0, 4).map((project, idx) => {
            const spans = bentoSpans[idx];
            return (
              <Link
                href={`/projects/${project.id}`}
                key={idx}
                className={`col-span-1 ${spans.colSpan} ${spans.rowSpan} bg-[#09090a] border border-white/10 rounded-3xl p-6 h-[450px] flex-col justify-end group relative overflow-hidden cursor-pointer hover:border-white/20 transition-colors shadow-2xl ${idx === 3 ? 'hidden md:flex' : 'flex'}`}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-[#000000]/20 to-transparent z-10 opacity-90 group-hover:opacity-100 transition-opacity" />
                <div className="absolute inset-0 w-full h-full opacity-100 group-hover:opacity-40 transition-opacity flex items-center justify-center p-6 pb-20">
                  {project.previewCover || (project.media && project.media.length > 0) ? (
                    <div className="w-full h-full rounded-2xl border border-white/5 overflow-hidden relative">
                      <Image src={project.previewCover || project.media?.[0]} alt={project.name || project.title} fill className="object-cover" />
                    </div>
                  ) : (
                    <div className="w-full h-full bg-neutral-900/50 rounded-2xl border border-white/5 flex items-center justify-center text-neutral-600 font-medium text-center">
                      {project.name} Image Placeholder
                    </div>
                  )}
                </div>
                <div className="relative z-20 flex justify-between items-end h-full">
                  <h3 className="text-2xl font-bold text-white mb-2 ml-2 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-4 group-hover:translate-y-0 duration-300">
                    {project.name}
                  </h3>
                  <div className="w-12 h-12 rounded-full bg-black border border-white/10 flex items-center justify-center mb-2 ml-2 shadow-lg group-hover:bg-white/10 transition-colors shrink-0">
                    <ArrowUpRight className="w-5 h-5 text-neutral-400 group-hover:text-white transition-colors" />
                  </div>
                </div>
              </Link>
            );
          })}

        </div>

      </div>
    </section>
  );
}
