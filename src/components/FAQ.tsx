'use client';
import React, { useState } from 'react';
import { Plus, X, Star } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ReviewCard } from './Reviews';
import { specialReviews } from '@/data/testimonials';

const faqs = [
  {
    question: 'What services do you offer?',
    answer: "I specialize in web design, branding, UI/UX design, Framer development, and custom automation workflows. Think of it as one ecosystem tailored to elevate your brand's digital presence."
  },
  {
    question: 'How do I start working with you?',
    answer: "Simply reach out through my contact page, and we'll discuss your project, goals, and timeline before getting started"
  },
  {
    question: "Can I get a website even if I'm not tech-savvy?",
    answer: "Of course! I simplify the process so you focus on your vision. You'll get training, documentation, and ongoing help if needed."
  },
  {
    question: 'How long does a project take?',
    answer: "Timelines vary based on project complexity, but most designs take 1-3 weeks, while full websites take 3-6 weeks"
  },
  {
    question: 'Do you work solo or with a team?',
    answer: "I'm the lead creator, but I collaborate with specialists (when needed) to deliver top-tier results—like branding experts or SEO consultants."
  },
  {
    question: 'What is your policy on revisions and changes?',
    answer: "Projects include a set number of revisions during design and development. Beyond that, I offer flexible options for further refinements depending on your needs."
  },
  {
    question: 'Do you offer development services?',
    answer: "Yes! I build fully functional websites in Coded or No Code as per Yor Needs and provide a smooth handoff for other platforms if needed"
  },
  {
    question: 'What is your pricing structure?',
    answer: "Pricing depends on the project scope. Contact me for a custom quote based on your needs and budget"
  },
  {
    question: 'Can you redesign my existing website?',
    answer: "Absolutely! I can refresh and optimize your current website to improve performance, usability, and aesthetics"
  }
];

const AccordionItem = ({ faq, isOpen, onClick }: { faq: any, isOpen: boolean, onClick: () => void }) => {
  return (
    <div className="bg-gradient-to-br from-[#151515] to-[#09090a] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),_0_20px_40px_rgba(0,0,0,0.8)] border border-white/5 rounded-2xl overflow-hidden mb-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),_0_30px_60px_rgba(0,0,0,0.9)]">
      <button 
        onClick={onClick}
        className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
      >
        <h4 className="text-white font-medium text-sm md:text-base pr-8">{faq.question}</h4>
        <div className="flex-shrink-0 text-neutral-500">
          {isOpen ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-6 pb-6 pt-0">
              <p className="text-sm text-neutral-400 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function FAQ() {
  const [openIndices, setOpenIndices] = useState<number[]>([0]); // First one open by default

  const toggleIndex = (index: number) => {
    setOpenIndices(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index) 
        : [...prev, index]
    );
  };

  return (
    <section 
      id="faq" 
      className="relative w-full bg-[#000000]/50 text-white pt-32 pb-32 px-6 flex justify-center -mt-8 rounded-t-[3rem] border-t border-white/10 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] z-[60]"
    >
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-10 md:gap-20 items-start">
        
        {/* Left Column */}
        <div className="flex flex-col items-start lg:sticky lg:top-32 h-fit">
          <div className="flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 w-fit mb-6">
            <span className="text-xs font-semibold text-neutral-300 tracking-wider">FAQ Section</span>
          </div>

          <h2 className="text-5xl md:text-6xl font-medium tracking-tight mb-4">
            Questions, <span className="text-neutral-500">Answers</span>
          </h2>
          
          <p className="text-neutral-400 text-sm md:text-base mb-12">
            Get quick answers to your most pressing questions:
          </p>

          {/* Featured Review Card */}
          <ReviewCard 
            review={specialReviews.ryan} 
            isSticky={false} 
            className="w-full mb-10"
          />

          {/* Buttons Row */}
          <div className="flex flex-wrap items-center gap-4">
            <Link 
              href="/projects"
              className="px-6 py-3 rounded-full bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),_0_10px_20px_rgba(0,0,0,0.5)] border border-white/10 text-white text-sm font-semibold hover:-translate-y-0.5 hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),_0_15px_30px_rgba(0,0,0,0.8)] transition-all duration-300 whitespace-nowrap"
            >
              See All Projects
            </Link>
            <Link 
              href="/contact"
              className="px-6 py-3 rounded-full bg-gradient-to-br from-neutral-100 to-neutral-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8),_0_10px_20px_rgba(0,0,0,0.5)] border border-neutral-400 text-black text-sm font-bold hover:-translate-y-0.5 hover:shadow-[inset_0_1px_1px_rgba(255,255,255,1),_0_15px_30px_rgba(0,0,0,0.8)] transition-all duration-300 whitespace-nowrap"
            >
              Contact Now
            </Link>
          </div>
        </div>

        {/* Right Column: Accordion */}
        <div className="flex flex-col w-full">
          {faqs.map((faq, idx) => (
            <AccordionItem 
              key={idx} 
              faq={faq} 
              isOpen={openIndices.includes(idx)} 
              onClick={() => toggleIndex(idx)} 
            />
          ))}
        </div>

      </div>
    </section>
  );
}
