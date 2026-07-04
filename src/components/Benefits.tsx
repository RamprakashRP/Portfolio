'use client';
import React from 'react';
import { Check, X } from 'lucide-react';

const benefitsData = [
  {
    positiveTitle: 'Drive Intentional Automation',
    positiveDesc: 'Build workflows with precision, using tools like n8n to automate with purpose—not just for convenience, but to solve real problems.',
    negativeTitle: 'Mindless Automation',
    negativeDesc: 'No copy-paste triggers. Every node and flow has a reason, a goal, and a person behind it.'
  },
  {
    positiveTitle: 'Explore AI with Clarity',
    positiveDesc: "From GenAI to cloud-native integrations, I don't just experiment—I dig deep to understand how AI can be applied with groundedness and impact.",
    negativeTitle: 'Vague Deliverables',
    negativeDesc: "If the \"why\" or \"what\" isn't clear, it gets defined. I don't work on cloudy intentions or ambiguous tasks."
  },
  {
    positiveTitle: 'Learn Relentlessly',
    positiveDesc: 'Courses, quizzes, and troubleshooting—I chase growth through action and reflection. Every error is a new door.',
    negativeTitle: 'Stagnant Execution',
    negativeDesc: 'I avoid rinse-repeat workflows or uninspired tech stacks. Curiosity drives my iteration.'
  },
  {
    positiveTitle: 'Collaborate Transparently',
    positiveDesc: 'Progress updates, shared goals, and open documentation teamwork only works when everyone sees the whole picture.',
    negativeTitle: 'Surface-Level Tech Talk',
    negativeDesc: 'Buzzwords and jargon without real understanding? Not my scene. I speak to the "how" and "why," not just the "what."'
  },
  {
    positiveTitle: 'Build Contextual Solutions',
    positiveDesc: 'Every project is different. I tailor CMS layouts, reverse-engineer websites, and integrate APIs based on what actually works—not a one-size-fits-all approach.',
    negativeTitle: 'Lone-Wolf Wins',
    negativeDesc: 'Every success is collaborative, not solo. I avoid siloed work because shared knowledge multiplies value.'
  }
];

export default function Benefits() {
  return (
    <section 
      id="benefits" 
      className="relative w-full bg-[#000000]/50 text-white pt-32 pb-32 px-6 flex justify-center -mt-8 rounded-t-[3rem] border-t border-white/10 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] z-40"
    >
      <div className="max-w-4xl w-full flex flex-col items-center">
        
        {/* Top Header */}
        <div className="flex flex-col items-center gap-4 mb-20 text-center">
          <div className="flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 w-fit">
            <span className="text-xs font-semibold text-neutral-300 tracking-wider">Why choose me</span>
          </div>

          <h2 className="text-5xl md:text-6xl font-medium tracking-tight">
            Why me as <span className="text-neutral-500">Professional Partner</span>
          </h2>
          <p className="text-neutral-400 text-sm md:text-base">
            Why Partner with Me for the Professional Excellence
          </p>
        </div>

        {/* Stacking Cards Container */}
        {/* We add a large padding-bottom so you have room to scroll through the stickiness */}
        <div className="w-full relative flex flex-col pb-[30vh]">
          {benefitsData.map((benefit, idx) => {
            // By dynamically increasing the top offset by a small amount (20px),
            // the cards will stack like a deck, leaving the top edge of previous cards visible!
            const topOffset = 140 + idx * 20; 
            
            return (
              <div 
                key={idx}
                className="sticky w-full flex flex-col md:flex-row bg-gradient-to-br from-[#151515] to-[#09090a] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),_0_20px_40px_rgba(0,0,0,0.8)] border border-white/5 rounded-3xl overflow-hidden mb-12"
                style={{
                  top: `${topOffset}px`,
                  zIndex: 10 + idx,
                }}
              >
                {/* Left Side (Positive) */}
                <div className="flex-1 p-10 md:border-r border-white/5">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center mb-6">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-white">{benefit.positiveTitle}</h3>
                  <p className="text-sm text-neutral-400 leading-relaxed font-light">
                    {benefit.positiveDesc}
                  </p>
                </div>
                
                {/* Right Side (Negative) */}
                <div className="flex-1 p-10 bg-[#050505]">
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center mb-6">
                    <X className="w-4 h-4 text-neutral-500" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-neutral-300">{benefit.negativeTitle}</h3>
                  <p className="text-sm text-neutral-500 leading-relaxed font-light">
                    {benefit.negativeDesc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
