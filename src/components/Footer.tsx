'use client';
import React, { useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail } from 'lucide-react';
import { FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';
import Logo from '@/components/Logo';

export default function Footer() {
  const router = useRouter();
  const clickCount = useRef(0);
  const clickTimer = useRef<NodeJS.Timeout | null>(null);

  const handleLogoClick = () => {
    clickCount.current += 1;
    if (clickTimer.current) clearTimeout(clickTimer.current);
    
    clickTimer.current = setTimeout(() => {
      if (clickCount.current === 4) {
        // Stall for 2 seconds to confuse others, then open Admin login
        setTimeout(() => {
          router.push('/admin/login');
        }, 2000);
      }
      clickCount.current = 0;
    }, 500);
  };

  return (
    <footer className="w-full bg-[#000000]/50 text-white flex flex-col items-center pt-20 pb-10 px-6 border-t border-white/5 relative z-[70]">
      <div className="max-w-6xl w-full flex flex-col gap-16">

        {/* Bottom Footer Section */}
        <div className="w-full flex flex-col gap-10">
          
          <div className="flex flex-row items-center justify-between gap-6 border-b border-white/10 pb-8 w-full">
            {/* Logo */}
            <div className="flex items-center cursor-pointer" onClick={handleLogoClick}>
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

          <div className="grid grid-cols-2 gap-6 md:gap-12 pb-12 border-b border-white/5 w-full">
            {/* Navigation Column */}
            <div className="flex flex-col gap-4">
              <h4 className="text-white font-semibold mb-2 tracking-wider uppercase text-sm">Navigation</h4>
              <div className="flex flex-col gap-3 text-sm font-medium text-neutral-400">
                <Link href="#services" className="hover:text-white transition-colors w-fit">Services</Link>
                <Link href="/projects" className="hover:text-white transition-colors w-fit">Projects</Link>
                <Link href="/profile" className="hover:text-white transition-colors w-fit">Profile</Link>
                <Link href="#reviews" className="hover:text-white transition-colors w-fit">Reviews</Link>
                <Link href="/contact" className="hover:text-white transition-colors w-fit">Contact</Link>
              </div>
            </div>

            {/* Playground Column */}
            <div className="flex flex-col gap-4">
              <h4 className="text-white font-semibold mb-2 tracking-wider uppercase text-sm">Playground</h4>
              <div className="flex flex-col gap-3 text-sm font-medium text-neutral-400">
                <p className="text-xs text-neutral-500 mb-2 max-w-xs">An interactive space for testing out new features, innovative ideas, and experimental games.</p>
                <Link href="/playground" className="hover:text-white transition-colors w-fit">Experimental Features</Link>
                <Link href="/playground/interactive" className="hover:text-white transition-colors w-fit">Interactive Games</Link>
                <Link href="/playground/sandbox" className="hover:text-white transition-colors w-fit">UI Sandbox</Link>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-light text-neutral-500">
            <span>ramprakashraja1@gmail.com</span>
            <span>+91 86670 29091</span>
            <span>Official Portfolio</span>
            <span>© {new Date().getFullYear()} RP</span>
          </div>

        </div>

      </div>
    </footer>
  );
}
