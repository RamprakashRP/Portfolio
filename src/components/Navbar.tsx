'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Download, Bell, Home, Wrench, MessageSquare, Folder, Award, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '@/components/Logo';
import NotificationsPanel from './NotificationsPanel';

import GlassSurface from './GlassSurface';

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hasScrolledOnce, setHasScrolledOnce] = useState(false);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isProgrammaticScroll = useRef(false);

  const startHideTimer = () => {
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    if (!hasScrolledOnce) return;
    
    hideTimeoutRef.current = setTimeout(() => {
      if (document.hidden) {
        startHideTimer(); // Try again later
      } else {
        setIsVisible(false);
      }
    }, 5000);
  };

  useEffect(() => {
    if (isVisible && !isHovered && hasScrolledOnce) {
      startHideTimer();
    } else if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }
    return () => {
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    };
  }, [isVisible, isHovered, hasScrolledOnce]);
  
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden && isVisible && !isHovered && hasScrolledOnce) {
        startHideTimer();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [isVisible, isHovered, hasScrolledOnce]);

  useEffect(() => {
    const handleOpenNotifs = () => setIsNotificationsOpen(true);
    window.addEventListener('open-notifications', handleOpenNotifs);
    return () => window.removeEventListener('open-notifications', handleOpenNotifs);
  }, []);

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        if (!hasScrolledOnce && window.scrollY > 50) {
          setHasScrolledOnce(true);
        }
        if (isProgrammaticScroll.current) {
          setLastScrollY(window.scrollY);
          return;
        }
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
          if (!isHovered && hasScrolledOnce) startHideTimer();
        }
        setLastScrollY(window.scrollY);
      }
    };

    window.addEventListener('scroll', controlNavbar);
    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [lastScrollY, isHovered, hasScrolledOnce]);

  const [activeItem, setActiveItem] = useState(() => {
    if (pathname === '/projects') return 'Projects';
    if (pathname === '/achievements') return 'Achievements';
    if (pathname === '/contact') return 'Contact';
    return 'Home';
  });

  const navItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Services', href: '/#services', icon: Wrench },
    { name: 'Testimonials', href: '/#reviews', icon: MessageSquare },
    { name: 'Projects', href: '/projects', icon: Folder },
    { name: 'Achievements', href: '/achievements', icon: Award },
    { name: 'Contact', href: '/contact', icon: Mail },
  ];

  // Sync active item with pathname on load and implement Scroll Spy
  useEffect(() => {
    isProgrammaticScroll.current = true;
    setTimeout(() => { isProgrammaticScroll.current = false; }, 800);
    setHasScrolledOnce(false);

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
      isProgrammaticScroll.current = true;
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
            setTimeout(() => { isProgrammaticScroll.current = false; }, 100);
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
    
    // Always set active item immediately to prevent Framer Motion animation glitches across route changes
    setActiveItem(itemName);
    
    // Close mobile menu on click
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* FIXED LOGO - Top Left */}
      <div 
        className="fixed top-6 left-6 z-[110] cursor-pointer mix-blend-difference hover:opacity-80 transition-opacity"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <Logo />
      </div>

      {/* FIXED NOTIFICATIONS - Top Right */}
      <button 
        onClick={() => setIsNotificationsOpen(true)}
        className="fixed top-6 right-6 z-[110] p-3 rounded-full bg-[#111111]/30 backdrop-blur-[40px] backdrop-saturate-[180%] border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
        aria-label="Open notifications"
      >
        <Bell className="w-5 h-5" />
        <span className="absolute top-2 right-2 flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
        </span>
      </button>

      <div 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={() => setIsHovered(true)}
        onTouchEnd={() => setIsHovered(false)}
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-[100] transition-all duration-500 ease-in-out ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-32 opacity-0 pointer-events-none'}`}
      >
        
        {/* MOBILE LAYOUT (Icon Dock) */}
        <motion.nav 
          className="md:hidden flex items-center gap-1 sm:gap-2 px-3 py-2 bg-[#111111]/30 backdrop-blur-[40px] backdrop-saturate-[180%] border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] overflow-hidden rounded-full w-max"
        >
          {navItems.map((item) => {
            const isActive = activeItem === item.name;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href, item.name)}
                className={`p-2.5 rounded-full transition-colors relative z-10 flex items-center justify-center ${isActive ? 'text-white bg-white/10' : 'text-neutral-400 hover:text-white hover:bg-white/5'}`}
              >
                <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
              </Link>
            );
          })}

        </motion.nav>

        {/* DESKTOP LAYOUT (Unified Pill) */}
        <motion.nav 
          className="hidden md:flex flex-col px-4 py-2 bg-[#111111]/30 backdrop-blur-[40px] backdrop-saturate-[180%] border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] overflow-hidden rounded-full w-max mx-auto"
        >
          <div className="flex items-center justify-between w-full gap-4">
          
          <div className="flex items-center space-x-1 lg:space-x-2 relative z-10 w-auto">
            {navItems.map((item) => {
              const isActive = activeItem === item.name;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href, item.name)}
                  className={`relative rounded-full font-medium transition-colors z-10 mix-blend-difference text-white hover:opacity-100 flex items-center justify-center px-4 py-2 text-sm ${isActive ? 'opacity-100' : 'opacity-70'}`}
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
                  {item.name}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-3 border-l border-white/10 pl-4">
            <a 
              href="/resume.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 px-4 py-2 rounded-full border border-white/20 text-sm font-medium mix-blend-difference text-white hover:bg-white hover:text-black hover:mix-blend-normal transition-all z-10"
            >
              <span>Resume</span>
              <Download className="w-3.5 h-3.5" />
            </a>
          </div>
          </div>
        </motion.nav>
      </div>

      <NotificationsPanel 
        isOpen={isNotificationsOpen} 
        onClose={() => setIsNotificationsOpen(false)} 
      />
    </>
  );
}
