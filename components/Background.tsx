
import React, { useEffect, useState } from 'react';
import { FLOATING_SYMBOLS } from '../constants';

interface DynamicElement {
  id: number;
  style: React.CSSProperties;
  content?: string;
}

interface StarProps {
  style: React.CSSProperties;
}

const Star: React.FC<StarProps> = ({ style }) => (
  <div className="absolute w-0.5 h-0.5 bg-white rounded-full animate-twinkle" style={style}></div>
);

interface FloatingSymbolProps {
  style: React.CSSProperties;
  content?: string;
}

const FloatingSymbol: React.FC<FloatingSymbolProps> = ({ style, content }) => (
  <div className="fixed text-2xl opacity-60 text-yellow-400 animate-float-symbol pointer-events-none z-10" style={style}>
    {content}
  </div>
);

interface BubbleProps {
  style: React.CSSProperties;
}

const Bubble: React.FC<BubbleProps> = ({ style }) => (
  <div className="absolute w-2.5 h-2.5 bg-yellow-400/30 rounded-full animate-rise" style={style}></div>
);

const Background: React.FC = () => {
  const [stars, setStars] = useState<DynamicElement[]>([]);
  const [symbols, setSymbols] = useState<DynamicElement[]>([]);
  const [bubbles, setBubbles] =useState<DynamicElement[]>([]);

  useEffect(() => {
    // Initialize stars
    const initialStars: DynamicElement[] = Array.from({ length: 100 }).map((_, i) => ({
      id: i,
      style: {
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 3}s`,
      },
    }));
    setStars(initialStars);

    // Floating symbols interval
    const symbolInterval = setInterval(() => {
      const id = Date.now();
      const newSymbol: DynamicElement = {
        id,
        content: FLOATING_SYMBOLS[Math.floor(Math.random() * FLOATING_SYMBOLS.length)],
        style: {
          left: `${Math.random() * 100}%`,
          animationDuration: `${Math.random() * 10 + 10}s`,
        },
      };
      setSymbols(prev => [...prev, newSymbol]);
      setTimeout(() => {
        setSymbols(prev => prev.filter(s => s.id !== id));
      }, 20000);
    }, 3000);
    
    // Bubbles interval
    const bubbleInterval = setInterval(() => {
      const id = Date.now();
      const newBubble: DynamicElement = {
        id,
        style: {
          left: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 2}s`,
        },
      };
      setBubbles(prev => [...prev, newBubble]);
      setTimeout(() => {
        setBubbles(prev => prev.filter(b => b.id !== id));
      }, 8000);
    }, 1000);


    return () => {
        clearInterval(symbolInterval);
        clearInterval(bubbleInterval);
    };
  }, []);

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none">
        {stars.map(star => <Star key={star.id} style={star.style} />)}
      </div>
      <div className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none">
        {symbols.map(symbol => <FloatingSymbol key={symbol.id} style={symbol.style} content={symbol.content} />)}
      </div>
      <div className="fixed top-full w-full h-screen pointer-events-none z-20">
         {bubbles.map(bubble => <Bubble key={bubble.id} style={bubble.style} />)}
      </div>
    </>
  );
};

export default Background;
