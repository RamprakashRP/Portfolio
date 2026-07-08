'use client';
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Bell, Trophy, Briefcase, FileCode2 } from 'lucide-react';
import Link from 'next/link';
import { getNotifications, NotificationItem } from '@/lib/getNotifications';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function NotificationsPanel({ isOpen, onClose }: Props) {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  useEffect(() => {
    if (isOpen) {
      setNotifications(getNotifications());
    }
  }, [isOpen]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'achievement': return <Trophy className="w-5 h-5 text-yellow-500" />;
      case 'role': return <Briefcase className="w-5 h-5 text-blue-500" />;
      case 'project': return <FileCode2 className="w-5 h-5 text-purple-500" />;
      default: return <Bell className="w-5 h-5 text-neutral-400" />;
    }
  };

  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200]"
          />

          {/* Slide-out Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300, mass: 0.8 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[#000000]/70 backdrop-blur-[50px] backdrop-saturate-[200%] border-l border-white/10 z-[210] flex flex-col shadow-[-20px_0_50px_rgba(0,0,0,0.8)]"
          >
            {/* Ambient Top Glow */}
            <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-white/[0.05] to-transparent pointer-events-none" />

            {/* Header */}
            <div className="flex items-center justify-between p-8 border-b border-white/10 relative z-10">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-white/5 rounded-full border border-white/10">
                  <Bell className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-black text-white tracking-tight uppercase">Updates</h2>
              </div>
              <button 
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/10 transition-colors border border-transparent hover:border-white/10"
              >
                <X className="w-5 h-5 text-neutral-400 hover:text-white" />
              </button>
            </div>

            {/* Notifications List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-5 relative z-10 custom-scrollbar">
              {notifications.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-neutral-500 space-y-4">
                  <Bell className="w-12 h-12 opacity-20" />
                  <p>No new notifications</p>
                </div>
              ) : (
                notifications.map((notif, i) => (
                  <motion.div
                    key={notif.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link href={notif.link} onClick={onClose}>
                      <div className="relative p-5 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.06] hover:border-white/15 transition-all duration-300 group flex space-x-4 cursor-pointer overflow-hidden">
                        {/* Hover Light Sweep */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-1000 pointer-events-none" />
                        
                        <div className="shrink-0 mt-1 relative z-10">
                          <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                            {getIcon(notif.type)}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0 relative z-10">
                          <h4 className="text-base font-bold text-white truncate group-hover:text-blue-400 transition-colors">{notif.title}</h4>
                          <p className="text-sm text-neutral-400 mt-1.5 line-clamp-2 leading-relaxed font-light">{notif.description}</p>
                          <div className="flex items-center mt-4">
                            <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] text-neutral-300 font-bold tracking-widest uppercase">
                              {notif.dateStr}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
