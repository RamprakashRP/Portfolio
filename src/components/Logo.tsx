import React from 'react';
import Image from 'next/image';

interface LogoProps {
  className?: string;
}

export default function Logo({ className = '' }: LogoProps) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <div className="w-10 h-10 flex items-center justify-center overflow-hidden relative">
        <Image 
          src="/rp-logo.png" 
          alt="RP Logo" 
          fill
          className="object-contain"
          priority
        />
      </div>
    </div>
  );
}
