import React from 'react';
import { CatState } from '../types';

interface QuantumBoxProps {
  catState: CatState;
}

const AliveCatImage: React.FC = () => (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-32 h-32" aria-label="Gato vivo">
      <defs>
          <radialGradient id="aliveCatGradient" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor="#f3f4f6" />
              <stop offset="100%" stopColor="#d1d5db" />
          </radialGradient>
      </defs>
      {/* Tail */}
      <path d="M 150 140 C 180 140, 180 100, 160 90" stroke="url(#aliveCatGradient)" fill="none" strokeWidth="20" strokeLinecap="round" />
      {/* Body */}
      <path d="M 50 160 C 50 130, 70 110, 100 110 C 130 110, 150 130, 150 160 Z" fill="url(#aliveCatGradient)" />
      {/* Head */}
      <circle cx="100" cy="80" r="50" fill="url(#aliveCatGradient)" />
      {/* Ears */}
      <path d="M 60,40 L 40,10 L 90,50 Z" fill="url(#aliveCatGradient)" />
      <path d="M 140,40 L 160,10 L 110,50 Z" fill="url(#aliveCatGradient)" />
      <path d="M 65,45 L 50,25 L 90,55 Z" fill="#9ca3af" />
      <path d="M 135,45 L 150,25 L 110,55 Z" fill="#9ca3af" />
      {/* Eyes */}
      <circle cx="80" cy="80" r="8" fill="#10b981" />
      <circle cx="120" cy="80" r="8" fill="#10b981" />
      <circle cx="82" cy="78" r="3" fill="black" />
      <circle cx="122" cy="78" r="3" fill="black" />
      {/* Nose */}
      <path d="M 95 95 C 98 100, 102 100, 105 95 Z" fill="#f87171" />
      {/* Mouth */}
      <path d="M 90,102 C 95,108 100,108 100,102" stroke="black" fill="none" strokeWidth="2" strokeLinecap="round"/>
      <path d="M 100,102 C 100,108 105,108 110,102" stroke="black" fill="none" strokeWidth="2" strokeLinecap="round"/>
      {/* Whiskers */}
      <path d="M 50,90 L 70,85" stroke="black" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M 45,100 L 70,95" stroke="black" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M 150,90 L 130,85" stroke="black" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M 155,100 L 130,95" stroke="black" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
);
  
const DeadCatImage: React.FC = () => (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-32 h-32 opacity-70" aria-label="Gato morto">
        <defs>
            <radialGradient id="deadCatGradient" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0%" stopColor="#a7f3d0" />
                <stop offset="100%" stopColor="#34d399" />
            </radialGradient>
        </defs>
        {/* Halo */}
        <ellipse cx="100" cy="20" rx="30" ry="8" fill="none" stroke="#fef08a" strokeWidth="4" />
        {/* Ghost Body */}
        <path d="M 50 180 C 40 100, 80 30, 100 30 C 120 30, 160 100, 150 180 Q 125 170 100 180 Q 75 170 50 180 Z" fill="url(#deadCatGradient)"/>
        {/* Eyes */}
        <path d="M75,85 L95,105 M95,85 L75,105" stroke="black" strokeWidth="5" strokeLinecap="round" />
        <path d="M125,85 L105,105 M105,85 L125,105" stroke="black" strokeWidth="5" strokeLinecap="round" />
        {/* Mouth */}
        <path d="M90,120 Q100,130 110,120" stroke="black" fill="none" strokeWidth="3" strokeLinecap="round"/>
    </svg>
);

const HammerImage: React.FC = () => (
  <svg viewBox="0 0 100 100" className="w-16 h-16" aria-label="Martelo">
    <g transform="rotate(-30 50 50)">
      <rect x="25" y="10" width="50" height="25" fill="#d1d5db" stroke="#6b7280" strokeWidth="2" rx="2" />
      <rect x="42" y="35" width="16" height="55" fill="#a16207" stroke="#422006" strokeWidth="2" rx="2" />
    </g>
  </svg>
);

const VialImage: React.FC<{ isBroken: boolean }> = ({ isBroken }) => {
  if (isBroken) {
    return (
      <svg viewBox="0 0 100 100" className="w-16 h-16" aria-label="Frasco de veneno quebrado">
        {/* Spilled liquid */}
        <path d="M 10 95 C 30 90, 70 100, 90 95 Q 50 105 10 95 Z" fill="#16a34a" opacity="0.8" />
        {/* Broken Glass pieces */}
        <path d="M 30 85 L 40 50 L 25 40" fill="none" stroke="#67e8f9" strokeWidth="3" strokeLinecap="round" />
        <path d="M 70 85 L 60 50 L 75 40" fill="none" stroke="#67e8f9" strokeWidth="3" strokeLinecap="round" />
        <path d="M 45 80 L 55 85" fill="none" stroke="#67e8f9" strokeWidth="3" strokeLinecap="round" />
         {/* Cork */}
        <path d="M 40 10 L 60 10 L 55 25 L 45 25 Z" fill="#a16207" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 100 100" className="w-16 h-16" aria-label="Frasco de veneno intacto">
      {/* Glass */}
      <path d="M 30 90 L 30 40 Q 30 25 45 25 L 55 25 Q 70 25 70 40 L 70 90 Z" fill="#67e8f9" fillOpacity="0.5" stroke="#0891b2" strokeWidth="2" />
      {/* Liquid */}
      <rect x="32" y="50" width="36" height="38" fill="#16a34a" rx="1" />
      {/* Cork */}
      <path d="M 40 10 L 60 10 L 55 25 L 45 25 Z" fill="#a16207" />
    </svg>
  );
};


const CatIcon: React.FC<{ state: CatState }> = ({ state }) => {
  if (state === CatState.ALIVE) {
    return <AliveCatImage />;
  }
  if (state === CatState.DEAD) {
    return <DeadCatImage />;
  }
  // This case will be hidden during the animation but is a good fallback
  return null; 
};

export const QuantumBox: React.FC<QuantumBoxProps> = ({ catState }) => {
  const isRevealed = catState !== CatState.SUPERPOSITION;

  return (
    <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
      {/* The Box visual */}
      <div
        className={`absolute inset-0 transition-all duration-500 ease-in-out flex items-center justify-center 
          ${isRevealed ? 'opacity-0 scale-75 -rotate-45' : 'opacity-100 scale-100 rotate-0'}`}
      >
        <div className="w-full h-full bg-yellow-800 border-4 border-yellow-900 flex items-center justify-center rounded-lg shadow-2xl">
          <span className="text-8xl text-yellow-900 font-bold select-none">?</span>
        </div>
      </div>

      {/* The Cat visual & Mechanism */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-500 ease-in-out delay-200 
          ${isRevealed ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}
      >
        <CatIcon state={catState} />

        {/* Mechanism is only visible when the result is revealed */}
        <div className={`transition-opacity duration-300 delay-500 ${isRevealed ? 'opacity-100' : 'opacity-0'}`}>
          {isRevealed && (
            <div className="flex items-end justify-center gap-2 -mt-4">
              <HammerImage />
              <VialImage isBroken={catState === CatState.DEAD} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
