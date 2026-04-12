import React from 'react';

export default function Logo({ className = "w-6 h-6 md:w-10 md:h-10", textClassName = "text-sm md:text-xl" }) {
  return (
    <div className={`flex items-center gap-2 md:gap-3 ${className}`}>
      <svg 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="2" className="text-blue-500/20" />
        <circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="4" className="text-blue-500" />
        <circle cx="50" cy="50" r="15" stroke="currentColor" strokeWidth="8" className="text-white" />
        <path 
          d="M50 15V25M50 75V85M15 50H25M75 50H85M25.25 25.25L32.32 32.32M67.68 67.68L74.75 74.75M25.25 74.75L32.32 67.68M67.68 32.32L74.75 25.25" 
          stroke="currentColor" 
          strokeWidth="2" 
          className="text-white/40"
        />
      </svg>
      <span className={`font-black tracking-tighter uppercase whitespace-nowrap ${textClassName}`}>
        Lil Sema<span className="text-blue-500">'</span>s
      </span>
    </div>
  );
}
