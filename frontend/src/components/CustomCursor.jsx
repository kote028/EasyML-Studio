import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      const target = e.target;
      setIsPointer(
        window.getComputedStyle(target).cursor === 'pointer' ||
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button'
      );
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      className={`fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-white pointer-events-none z-[9999] transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-150 mix-blend-difference flex items-center justify-center ${isPointer ? 'scale-150 bg-white/20' : 'scale-100'}`}
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
    >
      {isPointer && <div className="w-1 h-1 bg-white rounded-full"></div>}
    </div>
  );
}
