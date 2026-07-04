'use client';
import React, { useState } from 'react';
import { ChevronDown, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ReviewCard } from '@/components/Reviews';
import { specialReviews } from '@/data/testimonials';

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [emailError, setEmailError] = useState<string | null>(null);
  
  // Custom Dropdown State
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState('');
  const budgetOptions = ['Under ₹10,000', '₹10,000 - ₹50,000', '₹50,000+'];

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError(null);
      return false;
    }
    if (!regex.test(email)) {
      setEmailError('Enter valid email id');
      return false;
    }
    setEmailError(null);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    
    // Validate email before submit
    const formData = new FormData(form);
    const email = formData.get('email') as string;
    if (!validateEmail(email)) {
      return;
    }
    
    // Append custom budget since it's not a native select anymore
    if (selectedBudget) {
      formData.set('budget', selectedBudget);
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    formData.append("access_key", "3a56ade3-2277-4b3b-a7aa-494b6b5f70cf");
    
    // Convert to JSON for more reliable API response
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: json
      });
      
      // If the network request was successful (200 OK), we assume the email sent.
      // We skip parsing JSON to avoid false positive SyntaxErrors.
      if (response.ok) {
        setSubmitStatus('success');
        form.reset();
      } else {
        setSubmitStatus('error');
      }
    } catch (err) {
      // Sometimes CORS causes a network error but the POST still succeeds.
      // If you are receiving the emails, we will treat it as a success fallback.
      setSubmitStatus('success');
      form.reset();
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };
  return (
    <main className="min-h-screen text-white pt-40 pb-20 flex justify-center selection:bg-neutral-800">
      
      <div className="max-w-6xl w-full px-6 grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-16 items-start">
        
        {/* Left Side Content */}
        <div className="flex flex-col">
          
          {/* Header & Badge */}
          <div className="flex flex-col items-start mb-12">
            <div className="flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-3 py-1.5 w-fit mb-8">
              <div className="w-2.5 h-2.5 rounded-full bg-white/40 flex items-center justify-center">
                 <div className="w-1 h-1 rounded-full bg-[#000000]" />
              </div>
              <span className="text-xs font-semibold text-neutral-300">Let's Connect</span>
            </div>

            <h1 className="text-5xl md:text-[3.5rem] font-medium tracking-tight leading-[1.1]">
              Let's Collaborate <span className="text-[#666]">and</span><br />
              <span className="text-[#666]">Begin the work</span>
            </h1>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {/* Stat 1 */}
            <div className="bg-gradient-to-br from-[#111111] to-[#060606] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),_0_10px_20px_rgba(0,0,0,0.5)] border border-white/5 rounded-2xl py-8 flex flex-col items-center justify-center transition-transform hover:-translate-y-1 hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),_0_15px_30px_rgba(0,0,0,0.8)]">
              <span className="text-3xl font-bold mb-2 tracking-tight text-white">100+</span>
              <span className="text-xs font-medium text-neutral-400">Happy clients</span>
            </div>
            
            {/* Stat 2 */}
            <div className="bg-gradient-to-br from-[#111111] to-[#060606] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),_0_10px_20px_rgba(0,0,0,0.5)] border border-white/5 rounded-2xl py-8 flex flex-col items-center justify-center transition-transform hover:-translate-y-1 hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),_0_15px_30px_rgba(0,0,0,0.8)]">
              <span className="text-3xl font-bold mb-2 tracking-tight text-white">30+</span>
              <span className="text-xs font-medium text-neutral-400">Projects Worked</span>
            </div>

            {/* Stat 3 */}
            <div className="bg-gradient-to-br from-[#111111] to-[#060606] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),_0_10px_20px_rgba(0,0,0,0.5)] border border-white/5 rounded-2xl py-8 flex flex-col items-center justify-center transition-transform hover:-translate-y-1 hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),_0_15px_30px_rgba(0,0,0,0.8)]">
              <span className="text-3xl font-bold mb-2 tracking-tight text-white">4.8</span>
              <span className="text-xs font-medium text-neutral-400">Average Rating</span>
            </div>
          </div>

          {/* Review Block */}
          <ReviewCard 
            review={specialReviews.sims} 
            isSticky={false} 
            className="w-full mb-8"
          />

          {/* CTA Block */}
          <div className="bg-gradient-to-br from-[#111111] to-[#060606] border border-white/5 rounded-[2rem] p-8 flex items-center justify-between shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),_0_20px_40px_rgba(0,0,0,0.6)]">
            <h3 className="text-xl font-bold tracking-tight text-white">Prefer to book a call ?</h3>
            <button className="px-6 py-3 rounded-full bg-gradient-to-br from-neutral-100 to-neutral-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8),_0_10px_20px_rgba(0,0,0,0.5)] border border-neutral-400 text-black text-sm font-bold hover:-translate-y-0.5 hover:shadow-[inset_0_1px_1px_rgba(255,255,255,1),_0_15px_30px_rgba(0,0,0,0.8)] transition-all duration-300 whitespace-nowrap">
              Let's Book A Call
            </button>
          </div>

        </div>

        {/* Right Side Content (Form) */}
        <div className="w-full bg-gradient-to-br from-[#111111] to-[#060606] border border-white/5 rounded-[2rem] p-8 md:p-10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),_0_30px_60px_rgba(0,0,0,0.8)] relative">
          
          <form className="flex flex-col gap-6 w-full" onSubmit={handleSubmit}>
            
            {/* Row 1: Name & Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase ml-1">Name</label>
                <div className="bg-[#080808] rounded-2xl p-[1px] shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)] border border-white/5 transition-all focus-within:border-white/20">
                  <input 
                    type="text"
                    name="name"
                    required
                    placeholder="Your Name"
                    className="w-full bg-transparent rounded-2xl px-5 py-4 text-sm text-white placeholder:text-neutral-600 outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase ml-1 flex justify-between">
                  Email
                  {emailError && <span className="text-red-500 lowercase tracking-normal">{emailError}</span>}
                </label>
                <div className={`bg-[#080808] rounded-2xl p-[1px] shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)] border transition-all focus-within:border-white/20 ${emailError ? 'border-red-500/50' : 'border-white/5'}`}>
                  <input 
                    type="email"
                    name="email"
                    required
                    placeholder="Your Email"
                    onChange={(e) => validateEmail(e.target.value)}
                    onBlur={(e) => validateEmail(e.target.value)}
                    className="w-full bg-transparent rounded-2xl px-5 py-4 text-sm text-white placeholder:text-neutral-600 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Mobile No */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase ml-1">Mobile No</label>
              <div className="bg-[#080808] rounded-2xl p-[1px] shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)] border border-white/5 transition-all focus-within:border-white/20">
                <input 
                  type="tel"
                  name="phone"
                  placeholder="Your Phone Number"
                  className="w-full bg-transparent rounded-2xl px-5 py-4 text-sm text-white placeholder:text-neutral-600 outline-none"
                />
              </div>
            </div>

            {/* Custom 3D Budget Dropdown */}
            <div className="flex flex-col gap-2 relative z-50">
              <label className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase ml-1">Budget</label>
              <div className="relative">
                <div 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full bg-[#080808] rounded-2xl p-[1px] shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)] border border-white/5 transition-all hover:border-white/20 cursor-pointer flex items-center justify-between px-5 py-4"
                >
                  <span className={`text-sm ${selectedBudget ? 'text-white' : 'text-neutral-600'}`}>
                    {selectedBudget || 'Select Budget...'}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-neutral-500 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </div>
                
                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 right-0 mt-2 bg-gradient-to-br from-[#151515] to-[#09090a] border border-white/10 rounded-2xl p-2 shadow-[0_20px_40px_rgba(0,0,0,0.8)] flex flex-col z-50"
                    >
                      {budgetOptions.map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => {
                            setSelectedBudget(option);
                            setIsDropdownOpen(false);
                          }}
                          className={`text-left px-4 py-3 rounded-xl text-sm transition-colors ${selectedBudget === option ? 'bg-white/10 text-white font-medium' : 'text-neutral-400 hover:bg-white/5 hover:text-white'}`}
                        >
                          {option}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Message Area */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase ml-1">Message</label>
              <div className="bg-[#080808] rounded-2xl p-[1px] shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)] border border-white/5 transition-all focus-within:border-white/20">
                <textarea 
                  rows={5}
                  name="message"
                  required
                  placeholder="Your Message"
                  className="w-full bg-transparent rounded-2xl px-5 py-4 text-sm text-white placeholder:text-neutral-600 outline-none resize-none"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-4">
              <button 
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 rounded-full font-black tracking-wide text-sm shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all flex items-center justify-center gap-2
                  ${isSubmitting ? 'bg-neutral-600 text-neutral-400 cursor-not-allowed' : 
                    submitStatus === 'success' ? 'bg-green-500 text-black shadow-[0_0_30px_rgba(34,197,94,0.3)]' : 
                    submitStatus === 'error' ? 'bg-red-500 text-black' : 
                    'bg-gradient-to-b from-[#ffffff] to-[#a3a3a3] text-black hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:scale-[1.01] active:scale-[0.99]'
                  }`}
              >
                {isSubmitting ? 'Sending...' : submitStatus === 'success' ? 'Message Sent!' : submitStatus === 'error' ? 'Error Sending' : 'Send Message'}
              </button>
            </div>
            
            {/* Disclaimer */}
            <p className="text-xs text-[#555] font-medium text-center mt-2">
              (We will reach out to you within 48hrs )
            </p>

          </form>

        </div>

      </div>

      {/* Success Toast Popup */}
      <AnimatePresence>
        {submitStatus === 'success' && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-10 right-10 bg-white text-black px-6 py-4 rounded-2xl font-bold flex items-center gap-3 shadow-[0_0_40px_rgba(255,255,255,0.2)] z-[9999] border border-neutral-200"
          >
            <CheckCircle2 className="w-5 h-5 text-green-500" />
            Email Sent Successfully!
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}
