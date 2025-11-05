import React, { useState, useEffect, useCallback } from 'react';
// Fix: Import COLORS from types.ts where it is now located.
import { Color, COLORS } from '../types';
import {
  COLOR_MAP,
  KEY_MAP,
  COLOR_STYLES,
  ACTIVE_COLOR_STYLES,
  SEQUENCE_INTERVAL,
  HIGHLIGHT_DURATION,
} from '../constants';

interface MemoryGameProps {
  onSuccess: () => void;
  onFailure: () => void;
}

export const MemoryGame: React.FC<MemoryGameProps> = ({ onSuccess, onFailure }) => {
  const [sequence, setSequence] = useState<string[]>([]);
  const [playerSequence, setPlayerSequence] = useState<string[]>([]);
  const [isPlayerTurn, setIsPlayerTurn] = useState(false);
  const [activeColor, setActiveColor] = useState<Color | null>(null);
  const [message, setMessage] = useState('Aguarde, preparando a superposição...');

  const generateSequence = useCallback(() => {
    const sequenceLength = Math.floor(Math.random() * 4) + 1; // 1 to 4 colors
    const newSequence: string[] = [];
    for (let i = 0; i < sequenceLength; i++) {
      const randomDigit = Math.floor(Math.random() * 4) + 1;
      newSequence.push(randomDigit.toString());
    }
    setSequence(newSequence);
  }, []);

  useEffect(() => {
    generateSequence();
  }, [generateSequence]);

  const playSequence = useCallback(() => {
    setIsPlayerTurn(false);
    setMessage('Observe a sequência de cores...');
    sequence.forEach((digit, index) => {
      setTimeout(() => {
        setActiveColor(COLOR_MAP[digit]);
        setTimeout(() => {
          setActiveColor(null);
          if (index === sequence.length - 1) {
            setIsPlayerTurn(true);
            setMessage('Digite ou clique na sequência...');
            setPlayerSequence([]);
          }
        }, HIGHLIGHT_DURATION);
      }, (index + 1) * SEQUENCE_INTERVAL);
    });
  }, [sequence]);

  useEffect(() => {
    if (sequence.length > 0) {
      const timeoutId = setTimeout(playSequence, 1500); // Wait for box animation
      return () => clearTimeout(timeoutId);
    }
  }, [sequence, playSequence]);

  const processPlayerInput = useCallback((digit: string) => {
    if (!isPlayerTurn) return;

    const newPlayerSequence = [...playerSequence, digit];
    setPlayerSequence(newPlayerSequence);
    
    // Instant feedback
    setActiveColor(COLOR_MAP[digit]);
    setTimeout(() => setActiveColor(null), 200);

    if (newPlayerSequence.length === sequence.length) {
      setIsPlayerTurn(false);
      if (newPlayerSequence.join('') === sequence.join('')) {
        setMessage('Sequência correta! Colapsando a função de onda...');
        setTimeout(onSuccess, 1000);
      } else {
        setMessage('Sequência incorreta! Um destino trágico foi selado...');
        setTimeout(onFailure, 1000);
      }
    }
  }, [isPlayerTurn, playerSequence, sequence, onSuccess, onFailure]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const digit = KEY_MAP[event.code];
      if (digit) {
        processPlayerInput(digit);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [processPlayerInput]);

  const handleColorClick = (index: number) => {
    const digit = (index + 1).toString();
    processPlayerInput(digit);
  };
  
  return (
    <div className="flex flex-col items-center animate-fade-in">
       <p className="text-xl h-12 mb-6 text-cyan-300 tracking-wider bg-black/30 w-full max-w-md flex items-center justify-center rounded-md border border-cyan-500/30">
        {message}
      </p>
      <div className="grid grid-cols-4 gap-4 w-80 md:w-96">
        {COLORS.map((color, index) => (
           <div 
              key={color} 
              className={`flex flex-col items-center gap-2 p-1 rounded-lg transition-transform duration-200
                ${isPlayerTurn ? 'cursor-pointer hover:scale-110' : 'cursor-not-allowed opacity-70'}
              `}
              onClick={() => handleColorClick(index)}
              aria-label={`Cor ${color}, número ${index + 1}`}
            >
            <div
              className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl transition-all duration-200 
                ${activeColor === color ? ACTIVE_COLOR_STYLES[color] : COLOR_STYLES[color]}
              `}
            />
            <span className="font-bold text-lg text-gray-400">{index + 1}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 h-8 text-2xl tracking-[0.5em]">
        {playerSequence.map((_, i) => '⚫').join('')}
      </div>
    </div>
  );
};