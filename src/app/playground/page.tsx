'use client';
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Clock, ArrowRight, Sparkles } from 'lucide-react';

const projects = [
  {
    id: 'geographic-timeline',
    title: 'Geographic Timeline',
    description: 'A live counter tracking the exact duration of my life spent in different countries across the globe.',
    icon: <Clock className="w-6 h-6" />,
    color: 'from-blue-500/20 to-purple-500/20',
    borderColor: 'border-blue-500/30',
    hoverBorder: 'group-hover:border-blue-400/50',
    tag: 'Live Data'
  },
  // We can easily add more projects here in the future
];

export default function PlaygroundHub() {
  return (
    <main className="min-h-screen bg-transparent text-white selection:bg-white/20 overflow-x-hidden flex flex-col">
      <div className="flex-1 max-w-6xl w-full mx-auto px-6 pt-40 pb-20 z-10 flex flex-col">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-white/10 rounded-lg">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Playground</h1>
          </div>
          <p className="text-neutral-400 text-lg max-w-2xl">
            A collection of fun experiments, interactive data visualizations, and creative coding projects that don't quite fit into the main portfolio.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/playground/${project.id}`}>
                <div className={`group relative h-full p-6 rounded-2xl bg-white/[0.02] border ${project.borderColor} ${project.hoverBorder} transition-all duration-300 hover:bg-white/[0.04] overflow-hidden flex flex-col`}>
                  
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-6">
                      <div className="p-3 bg-white/5 rounded-xl border border-white/10 group-hover:scale-110 transition-transform duration-300">
                        {project.icon}
                      </div>
                      <span className="text-xs font-medium px-2.5 py-1 bg-white/10 rounded-full text-neutral-300">
                        {project.tag}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-white transition-colors">{project.title}</h3>
                    <p className="text-sm text-neutral-400 mb-6 flex-1 group-hover:text-neutral-300 transition-colors">
                      {project.description}
                    </p>
                    
                    <div className="flex items-center gap-2 text-sm font-medium text-white/70 group-hover:text-white mt-auto transition-colors">
                      Explore Project <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
