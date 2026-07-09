'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Mail } from 'lucide-react';
import { FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';

import GlassSurface from './GlassSurface';

export default function Profile() {
  const skills = [
    'Web Development', 'UX Design', 'UI Design', 'Management',
    'Software Development', 'AI Enthusiast', 'Data Analyst',
    'Social Media Management', 'Python', 'HTML', 'CSS', 'JS',
    'Figma', 'Framer', 'SQL', 'Canva', 'N8N', 'API', 'JOAT',
    'Leadership'
  ];

  return (
    <section id="profile" className="w-full bg-[#000000]/50 text-white py-32 px-6 flex flex-col items-center relative z-10">
      <div className="max-w-6xl w-full flex flex-col items-center">

        {/* Top: Heading & Button */}
        <div className="flex flex-col items-center text-center mb-16 space-y-6">
          <div className="group flex items-center space-x-2 bg-[#111] border border-white/10 rounded-full px-4 py-1.5 w-fit shadow-[0_4px_12px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.1)] cursor-default transition-all duration-500">
            <div className="w-4 h-4 shrink-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik0xMiAydjIwTTIyIDEySDIiLz48L3N2Zz4=')] bg-cover bg-center opacity-70" />
            <span className="text-xs font-semibold text-neutral-300 tracking-wider flex items-center whitespace-nowrap">
              <span>J</span>
              <span className="max-w-0 overflow-hidden transition-all duration-500 ease-in-out opacity-0 group-hover:max-w-[40px] group-hover:opacity-100 group-hover:mr-1">ack</span>
              <span>O</span>
              <span className="max-w-0 overflow-hidden transition-all duration-500 ease-in-out opacity-0 group-hover:max-w-[40px] group-hover:opacity-100 group-hover:mr-1">f</span>
              <span>A</span>
              <span className="max-w-0 overflow-hidden transition-all duration-500 ease-in-out opacity-0 group-hover:max-w-[40px] group-hover:opacity-100 group-hover:mr-1">ll</span>
              <span>T</span>
              <span className="max-w-0 overflow-hidden transition-all duration-500 ease-in-out opacity-0 group-hover:max-w-[50px] group-hover:opacity-100">rades</span>
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-medium tracking-tight">
            Ramprakash Raja, <span className="text-neutral-500">Your Friend</span>
          </h2>

          <p className="text-sm md:text-base text-neutral-400 max-w-lg">
            Brief initial presentation of myself and my previous experiences.
          </p>
        </div>

        {/* Content Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-8 w-full">

          {/* Left: Profile Card (3D Bulged) */}
          <div className="bg-gradient-to-b from-[#151515] to-[#09090a] border border-white/10 rounded-[2rem] p-4 flex flex-col relative shadow-[0_20px_40px_rgba(0,0,0,0.8),inset_0_1px_2px_rgba(255,255,255,0.15)] transform transition-transform hover:-translate-y-1">
            {/* Profile Picture & Availability */}
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-6 border border-white/5 shadow-inner bg-neutral-800">
              <div className="absolute inset-0 flex items-center justify-center text-neutral-500">
                <Image
                  src="/profile-pic.jpeg"
                  alt="Ramprakash Raja"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
                <GlassSurface
                  width={150}
                  height={36}
                  borderRadius={18}
                  opacity={0.9}
                  blur={12}
                  backgroundOpacity={0.1}
                  mixBlendMode="screen"
                  className="flex items-center space-x-2 px-4 shadow-[0_4px_12px_rgba(0,0,0,0.6)]"
                >
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.8)]" />
                  <span className="text-xs font-semibold text-white whitespace-nowrap drop-shadow-md">Available for work</span>
                </GlassSurface>
              </div>
            </div>

            {/* Text Wrapper */}
            <div className="px-4 pb-4">
              <h3 className="text-2xl font-semibold mb-1">Hello I am Ramprakash Raja</h3>
              <p className="text-sm text-neutral-400 mb-6">Final Year Student / Freelancer</p>

              {/* Social Media Row (3D Buttons) */}
              <div className="flex items-center justify-start gap-4 mb-6">
                <a href="https://www.instagram.com/ramprakash.raja_2004" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-b from-[#222] to-[#111] border border-white/10 text-neutral-300 hover:text-white shadow-[0_4px_10px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.2)] hover:-translate-y-1 transition-all">
                  <FaInstagram className="w-4 h-4" />
                </a>
                <a href="https://www.linkedin.com/in/ramprakashraja" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-b from-[#222] to-[#111] border border-white/10 text-neutral-300 hover:text-white shadow-[0_4px_10px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.2)] hover:-translate-y-1 transition-all">
                  <FaLinkedin className="w-4 h-4" />
                </a>
                <a href="https://github.com/RamprakashRP" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-b from-[#222] to-[#111] border border-white/10 text-neutral-300 hover:text-white shadow-[0_4px_10px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.2)] hover:-translate-y-1 transition-all">
                  <FaGithub className="w-4 h-4" />
                </a>
                <a href="mailto:ramprakashraja1@gmail.com" className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-b from-[#222] to-[#111] border border-white/10 text-neutral-300 hover:text-white shadow-[0_4px_10px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.2)] hover:-translate-y-1 transition-all">
                  <Mail className="w-4 h-4" />
                </a>
              </div>

              {/* Line */}
              <div className="w-full h-[1px] bg-white/10 mb-6 shadow-sm" />

              {/* Main Button (3D) */}
              <Link href="/contact" className="w-full py-4 rounded-2xl bg-gradient-to-b from-white to-neutral-300 text-black text-sm font-bold flex items-center justify-center shadow-[0_4px_14px_rgba(255,255,255,0.3),inset_0_1px_1px_rgba(255,255,255,0.8)] hover:scale-[1.02] transition-transform">
                Connect with me
              </Link>
            </div>
          </div>

          {/* Right: More Info Card (3D Bulged) */}
          <div className="bg-gradient-to-b from-[#151515] to-[#09090a] border border-white/10 rounded-[2rem] p-10 flex flex-col shadow-[0_20px_40px_rgba(0,0,0,0.8),inset_0_1px_2px_rgba(255,255,255,0.15)] transform transition-transform hover:-translate-y-1">
            {/* About */}
            <div className="mb-10">
              <p className="text-sm md:text-base text-neutral-300 leading-loose font-light">
                Hello, I am <strong className="text-white font-medium">Ramprakash Raja</strong>, a dedicated student pursuing education at
                SRM IST Vadapalani Campus, specializing in Software Development.
                Based in Chennai, Tamil Nadu, I am passionate about technology and
                innovation, consistently working towards building my expertise in the
                field. With a strong foundation in emerging technologies and a
                commitment to excellence, I aspire to make a meaningful impact in the
                software development industry.
              </p>
            </div>

            {/* Line */}
            <div className="w-full h-[1px] bg-white/10 mb-10" />

            {/* Skills */}
            <div className="flex flex-wrap gap-3">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/5 text-xs font-medium text-neutral-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all cursor-default"
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
