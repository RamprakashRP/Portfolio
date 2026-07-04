'use client';
import React from 'react';
import Link from 'next/link';
import { Mail } from 'lucide-react';
import { FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';
import Logo from '@/components/Logo';

export default function Footer() {
  return (
    <footer className="w-full bg-[#000000]/50 text-white flex flex-col items-center pt-20 pb-10 px-6 border-t border-white/5 relative z-[70]">
      <div className="max-w-6xl w-full flex flex-col gap-16">
        
        {/* Top CTA Section (Let's Grow Together) */}
        <div className="w-full bg-[#080808] border border-white/10 rounded-[2rem] p-10 md:p-14 flex flex-col lg:flex-row gap-12 shadow-2xl relative overflow-hidden">
          
          {/* Left Column (Text & Pricing) */}
          <div className="flex flex-col flex-1 z-10">
            <div className="flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 w-fit mb-6">
              <span className="text-xs font-semibold text-neutral-300 tracking-wider">Let's Connect</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-10">
              Let's Grow <span className="text-neutral-500">Together</span>
            </h2>

            <div className="flex flex-col gap-8 mb-10">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-4">
                  <h3 className="text-lg font-semibold text-white">Web Design</h3>
                  <span className="text-[10px] font-medium text-neutral-400 bg-white/5 px-2 py-1 rounded-md">Starting from ₹4,999</span>
                </div>
                <p className="text-sm text-neutral-500 font-light">Showcasing sleek, high-performance designs tailored for impact.</p>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-4">
                  <h3 className="text-lg font-semibold text-white">Framer Development</h3>
                  <span className="text-[10px] font-medium text-neutral-400 bg-white/5 px-2 py-1 rounded-md">Starting from ₹7,999</span>
                </div>
                <p className="text-sm text-neutral-500 font-light">Building visually stunning, user-focused websites that elevate brands.</p>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-4">
                  <h3 className="text-lg font-semibold text-white">Much More...</h3>
                  <span className="text-[10px] font-medium text-neutral-400 bg-white/5 px-2 py-1 rounded-md">Best Price in the market</span>
                </div>
                <p className="text-sm text-neutral-500 font-light">Contact to Make a Custom Project. Bring your ideas to life !!</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Link 
                href="/projects"
                className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white text-sm font-semibold hover:bg-white/10 transition-colors whitespace-nowrap"
              >
                See All Projects
              </Link>
              <Link 
                href="/contact"
                className="px-6 py-3 rounded-full bg-neutral-200 text-black text-sm font-semibold hover:bg-white transition-colors whitespace-nowrap"
              >
                Get Started Now
              </Link>
            </div>
          </div>

          {/* Right Column (GIF Placeholder) */}
          <div className="flex-1 flex items-center justify-center z-10">
            <div className="w-full h-full min-h-[300px] bg-black border border-white/10 rounded-2xl flex items-center justify-center relative overflow-hidden shadow-inner">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10" />
              
              <div className="relative z-20 flex flex-col items-center text-center p-6 w-full">
                {/* Mockup of the dial UI from the screenshot */}
                <div className="w-40 h-20 border-t-2 border-white/20 rounded-t-full relative mb-4 flex items-end justify-center overflow-hidden">
                   <div className="absolute bottom-0 w-full h-[1px] bg-white/10" />
                   <div className="w-1 h-20 bg-white absolute bottom-0 origin-bottom transform rotate-45 rounded-full" />
                </div>
                <h4 className="text-xl font-bold tracking-widest text-white mb-12">SUCCESS</h4>
                
                <div className="flex justify-between w-full px-4 text-xs font-light text-neutral-400 tracking-wider">
                  <span>Planning</span>
                  <span>Action</span>
                  <span>Discipline</span>
                </div>
              </div>
              
              <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none opacity-0 hover:opacity-100 transition-opacity bg-black/50 backdrop-blur-sm">
                <span className="text-sm font-bold text-white tracking-widest uppercase border border-white/20 px-4 py-2 rounded-full">GIF Placeholder</span>
              </div>
            </div>
          </div>
          
        </div>

        {/* Bottom Footer Section */}
        <div className="w-full flex flex-col gap-10">
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-white/10 pb-8">
            {/* Logo */}
            <div className="flex items-center">
              <Logo />
            </div>
            
            {/* Social Icons */}
            <div className="flex items-center gap-6">
              <Link href="https://www.instagram.com/ramprakash.raja_2004" target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-white transition-colors">
                <FaInstagram className="w-5 h-5" />
              </Link>
              <Link href="https://www.linkedin.com/in/ramprakashraja" target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-white transition-colors">
                <FaLinkedin className="w-5 h-5" />
              </Link>
              <Link href="https://github.com/RamprakashRP" target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-white transition-colors">
                <FaGithub className="w-5 h-5" />
              </Link>
              <Link href="mailto:ramprakashraja1@gmail.com" className="text-neutral-500 hover:text-white transition-colors">
                <Mail className="w-5 h-5" />
              </Link>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/5">
            <div className="flex flex-wrap items-center gap-6 text-sm font-medium text-neutral-400">
              <Link href="#services" className="hover:text-white transition-colors">Services</Link>
              <Link href="/projects" className="hover:text-white transition-colors">Projects</Link>
              <Link href="/profile" className="hover:text-white transition-colors">Profile</Link>
              <Link href="#reviews" className="hover:text-white transition-colors">Reviews</Link>
              <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-light text-neutral-500">
            <span>ramprakashraja1@gmail.com</span>
            <span>+91 86670 29091</span>
            <span>Official Portfolio</span>
            <span>© 2025 RP</span>
          </div>

        </div>

      </div>
    </footer>
  );
}
