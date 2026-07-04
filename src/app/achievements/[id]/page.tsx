import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Tag } from 'lucide-react';
import { achievements } from '@/data/achievements';
import Navbar from '@/components/Navbar';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return achievements.map((achievement) => ({
    id: achievement.id,
  }));
}

export default function AchievementDetailPage({ params }: { params: { id: string } }) {
  const achievement = achievements.find(a => a.id === params.id);

  if (!achievement) {
    notFound();
  }

  return (
    <div className="bg-transparent min-h-screen text-white font-sans selection:bg-white/20">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-6 pt-32 pb-24">
        <Link href="/achievements" className="flex items-center text-sm text-neutral-400 hover:text-white transition-colors w-fit group mb-12">
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Achievements
        </Link>

        <header className="mb-12">
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-xs font-medium">
              <Tag className="w-4 h-4" />
              <span>{achievement.tags?.[0] || 'Achievement'}</span>
            </div>
            <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-white/5 backdrop-blur-md border border-white/5 text-xs text-neutral-300">
              <Calendar className="w-4 h-4" />
              <span>{achievement.date}</span>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-6 leading-tight">
            {achievement.title}
          </h1>
          
          <p className="text-neutral-300 text-base md:text-lg leading-relaxed font-light whitespace-pre-wrap">
            {achievement.description}
          </p>
        </header>

        {/* Media Showcase */}
        {achievement.media && achievement.media.length > 0 && (
          <div className="space-y-8">
            <h3 className="text-xl font-medium text-neutral-200 border-b border-white/10 pb-4">Gallery</h3>
            <div className="flex flex-col space-y-6">
              {achievement.media.map((mediaUrl, idx) => (
                <div key={idx} className="relative w-full rounded-2xl overflow-hidden border border-white/10 bg-neutral-900 group">
                  {/* Depending on media type, we might render video or image. Assuming image for now. */}
                  <Image 
                    src={mediaUrl} 
                    alt={`${achievement.title} media ${idx + 1}`} 
                    width={1200}
                    height={800}
                    className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-700"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
