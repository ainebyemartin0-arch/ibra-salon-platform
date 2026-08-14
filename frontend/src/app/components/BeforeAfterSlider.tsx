"use client";

import { useState, useRef, MouseEvent } from "react";

export default function BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    const clamped = Math.max(0, Math.min(100, percentage));
    setSliderPosition(clamped);
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = event.touches[0].clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    const clamped = Math.max(0, Math.min(100, percentage));
    setSliderPosition(clamped);
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      className="relative w-full aspect-[16/10] rounded-xl overflow-hidden cursor-col-resize select-none border border-gray-200 shadow-sm"
    >
      {/* AFTER Image (Background) */}
      <img 
        src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?q=80&w=1200&auto=format&fit=crop" 
        alt="After haircut" 
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />
      <span className="absolute top-4 right-4 bg-black text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full z-10">
        After
      </span>

      {/* BEFORE Image (Foreground, clipped) */}
      <div 
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${sliderPosition}%` }}
      >
        <img 
          src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=1200&auto=format&fit=crop" 
          alt="Before haircut" 
          className="absolute inset-0 h-full w-full object-cover"
          style={{ width: `${100 / (sliderPosition / 100)}%` }}
          draggable={false}
        />
        <span className="absolute top-4 left-4 bg-white text-black text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full z-10">
          Before
        </span>
      </div>

      {/* Divider Line and Handle */}
      <div 
        className="absolute top-0 bottom-0 w-1 bg-white shadow-lg z-20 pointer-events-none"
        style={{ left: `calc(${sliderPosition}% - 2px)` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-xl flex items-center justify-center text-black">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7l-5 5 5 5M16 7l5 5-5 5"></path></svg>
        </div>
      </div>
    </div>
  );
}
