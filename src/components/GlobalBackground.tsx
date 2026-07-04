import React from 'react';

export default function GlobalBackground() {
  return (
    <div className="fixed inset-0 z-[-1] bg-[#000000] overflow-hidden pointer-events-none">
      {/* Sleek Dot Pattern with Wide Fade */}
      <div 
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: 'radial-gradient(circle at center, #ffffff 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          maskImage: 'radial-gradient(ellipse 150% 100% at 50% 0%, black 30%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 150% 100% at 50% 0%, black 30%, transparent 100%)',
        }}
      />
    </div>
  );
}
