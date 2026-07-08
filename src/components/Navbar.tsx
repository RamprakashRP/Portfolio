'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Download, Menu, X, Bell } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '@/components/Logo';
import NotificationsPanel from './NotificationsPanel';

import GlassSurface from './GlassSurface';

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  
  useEffect(() => {
    const handleOpenNotifs = () => setIsNotificationsOpen(true);
    window.addEventListener('open-notifications', handleOpenNotifs);
    return () => window.removeEventListener('open-notifications', handleOpenNotifs);
  }, []);

  const [activeItem, setActiveItem] = useState(() => {
    if (pathname === '/projects') return 'Projects';
    if (pathname === '/achievements') return 'Achievements';
    if (pathname === '/contact') return 'Contact';
    return 'Home';
  });

  const navItems = [
    { name: 'Home', href: '/', isLogo: true },
    { name: 'Services', href: '/#services' },
    { name: 'Testimonials', href: '/#reviews' },
    { name: 'Projects', href: '/projects' },
    { name: 'Achievements', href: '/achievements' },
    { name: 'Contact', href: '/contact' },
  ];

  // Sync active item with pathname on load and implement Scroll Spy
  useEffect(() => {
    if (pathname === '/projects') setActiveItem('Projects');
    else if (pathname === '/achievements') setActiveItem('Achievements');
    else if (pathname === '/contact') setActiveItem('Contact');
    else if (pathname === '/') {
      // Setup Scroll Spy for Home Page Sections
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              if (entry.target.id === 'services') setActiveItem('Services');
              else if (entry.target.id === 'reviews') setActiveItem('Testimonials');
            }
          });
        },
        { rootMargin: '-40% 0px -60% 0px' }
      );

      const servicesEl = document.getElementById('services');
      const reviewsEl = document.getElementById('reviews');
      
      if (servicesEl) observer.observe(servicesEl);
      if (reviewsEl) observer.observe(reviewsEl);

      const handleScroll = () => {
        if (window.scrollY < 300) setActiveItem('Home');
      };
      
      window.addEventListener('scroll', handleScroll);
      // Run once on load
      handleScroll();

      return () => {
        observer.disconnect();
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [pathname]);


  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, itemName: string) => {
    // If it's a hash link and we are on the Home page, intercept for custom smooth scroll
    if (href.startsWith('/#') && pathname === '/') {
      e.preventDefault();
      const targetId = href.replace('/#', '');
      const element = document.getElementById(targetId);
      
      if (element) {
        const targetPosition = element.getBoundingClientRect().top + window.scrollY;
        const startPosition = window.scrollY;
        const distance = targetPosition - startPosition;
        const duration = 1200; // 1.2 seconds for dramatic scroll
        let start: number | null = null;

        const animation = (currentTime: number) => {
          if (start === null) start = currentTime;
          const timeElapsed = currentTime - start;
          const progress = Math.min(timeElapsed / duration, 1);
          
          // Easing function: easeInOutCubic
          const ease = progress < 0.5
            ? 4 * progress * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 3) / 2;

          window.scrollTo(0, startPosition + distance * ease);

          if (timeElapsed < duration) {
            requestAnimationFrame(animation);
          } else {
            window.history.pushState(null, '', href);
          }
        };

        requestAnimationFrame(animation);
      }
    } else if (href === '/' && pathname === '/') {
      // Custom scroll to top if clicking Home while already on Home
      e.preventDefault();
      const startPosition = window.scrollY;
      const duration = 1200;
      let start: number | null = null;
      
      const animation = (currentTime: number) => {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const progress = Math.min(timeElapsed / duration, 1);
        const ease = progress < 0.5 ? 4 * progress * progress * progress : 1 - Math.pow(-2 * progress + 2, 3) / 2;
        window.scrollTo(0, startPosition - (startPosition * ease));
        if (timeElapsed < duration) requestAnimationFrame(animation);
      };
      requestAnimationFrame(animation);
    }
    
    // Only set active item immediately for hash links or home. 
    // For route changes, let the useEffect handle it to prevent race conditions that cause jumping.
    if (href.startsWith('/#') || href === '/') {
      setActiveItem(itemName);
    }
    
    // Close mobile menu on click
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-full max-w-[760px] px-4">
      {/* 
        To achieve the "Liquid Glass" iOS effect:
        - Heavy blur: backdrop-blur-3xl (or custom px)
        - High saturation: backdrop-saturate-200
        - Very subtle transparent background: bg-black/20 or bg-[#111]/30
        - Soft inner border to catch light: border border-white/10
      */}
      <motion.nav 
        animate={{
          borderRadius: isMobileMenuOpen ? 24 : 9999,
        }}
        className="flex flex-col px-4 py-2 bg-[#111111]/30 backdrop-blur-[40px] backdrop-saturate-[180%] border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] overflow-hidden"
      >
        <div className="flex items-center justify-between w-full">
        
        {/* Navigation Items including Logo */}
        <div className="flex items-center space-x-1 md:space-x-2 lg:space-x-3 relative z-10 w-full md:w-auto justify-between md:justify-start">
          {navItems.map((item) => {
            const isActive = activeItem === item.name;
            
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href, item.name)}
                className={`relative rounded-full font-medium transition-colors z-10 mix-blend-difference text-white hover:opacity-100 flex items-center justify-center ${
                  item.isLogo ? 'p-1.5' : 'px-3 py-1.5 text-xs md:text-sm hidden md:flex'
                } ${isActive ? 'opacity-100' : 'opacity-70'}`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavBackground"
                    className="absolute inset-0 z-[-1] rounded-full overflow-hidden"
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30
                    }}
                  >
                    <GlassSurface 
                      width="100%" 
                      height="100%" 
                      borderRadius={9999}
                      opacity={0.8}
                      blur={8}
                      brightness={150}
                      backgroundOpacity={0.2}
                      mixBlendMode="screen"
                      distortionScale={120}
                      redOffset={5}
                      greenOffset={15}
                      blueOffset={25}
                    />
                  </motion.div>
                )}
                {item.isLogo ? <Logo /> : item.name}
              </Link>
            );
          })}
        </div>

        {/* Notifications Icon (Desktop & Mobile) */}
        <button 
          onClick={() => setIsNotificationsOpen(true)}
          className="relative p-2 rounded-full border border-white/20 text-white ml-auto relative z-10 hover:bg-white/10 transition-colors hidden md:flex items-center justify-center mr-2"
          aria-label="Open notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
        </button>

        {/* Resume Button (Desktop only) */}
        <a 
          href="/resume.pdf" 
          target="_blank" 
          rel="noopener noreferrer"
          className="hidden md:flex items-center space-x-1.5 px-4 py-1.5 rounded-full border border-white/20 text-sm font-medium mix-blend-difference text-white hover:bg-white hover:text-black hover:mix-blend-normal transition-all relative z-10"
        >
          <span>Resume</span>
          <Download className="w-3.5 h-3.5" />
        </a>

        <div className="md:hidden ml-auto flex items-center space-x-3">
          <button 
            onClick={() => setIsNotificationsOpen(true)}
            className="relative p-2 rounded-full border border-white/20 text-white relative z-10 hover:bg-white/10 transition-colors flex items-center justify-center"
            aria-label="Open notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
          </button>

          {/* Hamburger Menu (Mobile only) */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-full border border-white/20 text-white relative z-10 hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
        </div>
        
        {/* Mobile Dropdown Menu inside the pill */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden flex flex-col items-start w-full pt-4 pb-2"
            >
              {navItems.filter(item => !item.isLogo).map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href, item.name)}
                  className={`w-full py-3 px-2 text-lg font-medium transition-colors border-b border-white/5 last:border-0 ${
                    activeItem === item.name ? 'text-white' : 'text-neutral-400'
                  }`}
                >
                  {item.name}
                </Link>
              ))}

              <a 
                href="/resume.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="mt-4 flex items-center justify-center space-x-2 px-6 py-2.5 rounded-full bg-white text-black text-sm font-semibold hover:opacity-90 transition-opacity w-full"
              >
                <span>Download Resume</span>
                <Download className="w-4 h-4" />
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Render the drawer here so it stays above everything */}
      <NotificationsPanel 
        isOpen={isNotificationsOpen} 
        onClose={() => setIsNotificationsOpen(false)} 
      />
    </div>
  );
}
