"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { onLoadingComplete, isLoadingFinished } from "./ui/loading-splash";

type AnimateBy = "words" | "letters";
type Direction = "top" | "bottom" | "left" | "right" | "none";

interface BlurTextProps {
  text: string;
  delay?: number; // atraso inicial em ms
  durationPerItem?: number; // duração base por item
  stagger?: number; // intervalo entre itens em ms
  animateBy?: AnimateBy;
  direction?: Direction;
  onAnimationComplete?: () => void;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements; // permitir mudar o wrapper semanticamente
}

/*
  Componente BlurText
  - Divide texto em palavras ou letras
  - Aplica transição com leve blur + fade + deslocamento direcional
  - Respeita prefers-reduced-motion (render estático) 
*/

const directionTransforms: Record<Direction, string> = {
  top: "translateY(0.65em)",
  bottom: "translateY(-0.65em)",
  left: "translateX(0.65em)",
  right: "translateX(-0.65em)",
  none: "none",
};

export default function BlurText({
  text,
  delay = 0,
  durationPerItem = 480,
  stagger = 70,
  animateBy = "words",
  direction = "top",
  onAnimationComplete,
  className = "",
  as = "div",
}: BlurTextProps) {
  const [canAnimate, setCanAnimate] = useState(false);
  const reduced = useMemo(() => (typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false), []);
  const items = useMemo(() => {
    if (animateBy === 'letters') {
      // substitui explicitamente '<br>' por token antes de dividir em letras
      const parts: string[] = [];
      const regex = /<br>/g;
      let lastIndex = 0; let match: RegExpExecArray | null;
      while ((match = regex.exec(text)) !== null) {
        if (match.index > lastIndex) {
          parts.push(...text.slice(lastIndex, match.index).split(""));
        }
        parts.push('__BR__');
        lastIndex = match.index + match[0].length;
      }
      if (lastIndex < text.length) parts.push(...text.slice(lastIndex).split(""));
      return parts;
    }
    const WORKING = text.split(/(\s+)/); // words mantendo espaços
    return WORKING.flatMap(part => part === '<br>' ? ['__BR__'] : part);
  }, [text, animateBy]);

  const Wrapper = as as any;
  const [done, setDone] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  // Aguardar o loading terminar antes de iniciar animação
  useEffect(() => {
    if (isLoadingFinished()) {
      setCanAnimate(true);
    } else {
      onLoadingComplete(() => setCanAnimate(true));
    }
  }, []);

  useEffect(() => {
    if (reduced) {
      setDone(true);
      onAnimationComplete?.();
      return;
    }
    if (!canAnimate) return;
    
    const total = delay + durationPerItem + stagger * (items.length - 1);
    timeoutRef.current = window.setTimeout(() => {
      setDone(true);
      onAnimationComplete?.();
    }, total + 50);
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, [delay, durationPerItem, stagger, items.length, reduced, onAnimationComplete, canAnimate]);

  return (
    <Wrapper
      className={className + " inline-block"}
      aria-label={text}
      role="text"
      data-animate="blur-text"
    >
      {items.map((segment, index) => {
        if (segment === '__BR__') return <br key={`br-${index}`} />;
        const style: React.CSSProperties = reduced || !canAnimate ? {
          opacity: canAnimate ? 1 : 0,
          filter: 'blur(0)',
          transform: 'none'
        } : {
          opacity: 0,
            filter: 'blur(6px)',
            transform: directionTransforms[direction],
            animation: `bt-fade ${durationPerItem}ms cubic-bezier(.16,.84,.44,1) forwards`,
            animationDelay: `${delay + index * stagger}ms`
        };
        const content = segment === ' ' ? '\u00A0' : segment; // manter espaçamento sem mostrar antes
        return <span key={index} aria-hidden="true" className="inline-block will-change-transform" style={style}>{content}</span>;
      })}
      <style jsx>{`
        @keyframes bt-fade {
          0% { opacity: 0; filter: blur(6px); transform: ${directionTransforms[direction]}; }
          45% { filter: blur(2px); }
          100% { opacity: 1; filter: blur(0); transform: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          [data-animate='blur-text'] span { animation: none !important; }
        }
      `}</style>
    </Wrapper>
  );
}
