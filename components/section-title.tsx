"use client";

import React from 'react';
import ScrollFloat from './ScrollFloat';

interface SectionTitleProps {
  children: string; // texto puro para animação por caractere
  className?: string; // classes aplicadas ao wrapper h2 (além de overflow-hidden já aplicado internamente)
  textClassName?: string; // classes aplicadas ao span interno (tamanho, cor, etc)
  // Permite ajustar parâmetros caso alguma seção precise variar
  duration?: number;
  ease?: string;
  scrollStart?: string;
  scrollEnd?: string;
  stagger?: number;
  scrub?: boolean | number;
}

// Componente padronizado de título de seção animado no scroll.
// Mantém nível semântico <h2> (ScrollFloat já usa h2) e aceita customização de estilo.
export function SectionTitle({
  children,
  className = '',
  textClassName = '',
  duration = 1,
  ease = 'back.inOut(2)',
  scrollStart = 'center bottom+=50%',
  scrollEnd = 'bottom bottom-=40%',
  stagger = 0.03,
  scrub
}: SectionTitleProps) {
  return (
    <ScrollFloat
      animationDuration={duration}
      ease={ease}
      scrollStart={scrollStart}
      scrollEnd={scrollEnd}
      stagger={stagger}
      scrub={scrub}
      containerClassName={className}
      textClassName={textClassName}
    >
      {children}
    </ScrollFloat>
  );
}

export default SectionTitle;