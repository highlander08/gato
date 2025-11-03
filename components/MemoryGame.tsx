import React, { useState, useEffect, useCallback } from 'react';
import { Color } from '../types';
import {
  COLORS,
  COLOR_STYLES,
  ACTIVE_COLOR_STYLES,
  SEQUENCE_INTERVAL,
  HIGHLIGHT_DURATION,
  MAX_LEVEL
} from '../constants';

interface MemoryGameProps {
  onSuccess: () => void;
  onFailure: () => void;
}

export const MemoryGame: React.FC<MemoryGameProps> = ({ onSuccess, onFailure }) => {
  const [level, setLevel] = useState(1);
  const [sequence, setSequence] = useState<Color[]>([]);
  const [playerSequence, setPlayerSequence] = useState<Color[]>([]);
  const [isPlayerTurn, setIsPlayerTurn] = useState(false);
  const [activeColor, setActiveColor] = useState<Color | null>(null);
  const [message, setMessage] = useState('Observe a sequência...');

  const generateSequence = useCallback((currentLevel: number) => {
    const newSequence: Color[] = [];
    for (let i = 0; i < currentLevel; i++) {
      const randomIndex = Math.floor(Math.random() * COLORS.length);
      newSequence.push(COLORS[randomIndex]);
    }
    setSequence(newSequence);
  }, []);

  useEffect(() => {
    generateSequence(level);
  }, [level, generateSequence]);

  const playSequence = useCallback(() => {
    setIsPlayerTurn(false);
    setMessage('Observe a sequência...');
    sequence.forEach((color, index) => {
      setTimeout(() => {
        setActiveColor(color);
        setTimeout(() => {
          setActiveColor(null);
          if (index === sequence.length - 1) {
            setIsPlayerTurn(true);
            setMessage(`Sua vez! Nível ${level}`);
            setPlayerSequence([]);
          }
        }, HIGHLIGHT_DURATION);
      }, (index + 1) * SEQUENCE_INTERVAL);
    });
  }, [sequence, level]);

  useEffect(() => {
    if (sequence.length > 0) {
      const timeoutId = setTimeout(playSequence, 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [sequence, playSequence]);

  const handlePlayerInput = (color: Color) => {
    if (!isPlayerTurn) return;

    const newPlayerSequence = [...playerSequence, color];
    setPlayerSequence(newPlayerSequence);

    if (newPlayerSequence[newPlayerSequence.length - 1] !== sequence[newPlayerSequence.length - 1]) {
      onFailure();
      return;
    }

    if (newPlayerSequence.length === sequence.length) {
      if (level === MAX_LEVEL) {
        onSuccess();
      } else {
        setIsPlayerTurn(false);
        setMessage('Correto! Próximo nível...');
        setTimeout(() => {
          setLevel(prevLevel => prevLevel + 1);
        }, 1500);
      }
    }
  };

  return (
    <div className="flex flex-col items-center animate-fade-in">
      <p className="text-xl h-8 mb-6 text-cyan-300 tracking-wider">{message}</p>
      <div className="grid grid-cols-2 gap-4 w-64 h-64 md:w-80 md:h-80">
        {COLORS.map((color) => (
          <button
            key={color}
            disabled={!isPlayerTurn}
            onClick={() => handlePlayerInput(color)}
            className={`w-full h-full rounded-lg transition-all duration-200 
              ${isPlayerTurn ? 'cursor-pointer' : 'cursor-wait'}
              ${activeColor === color ? ACTIVE_COLOR_STYLES[color] : COLOR_STYLES[color]}
            `}
            aria-label={`Botão ${color}`}
          />
        ))}
      </div>
    </div>
  );
};
