import React, { useEffect, useMemo, useRef, ReactNode, RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollFloatProps {
  children: ReactNode;
  scrollContainerRef?: RefObject<HTMLElement>;
  containerClassName?: string;
  textClassName?: string;
  animationDuration?: number;
  ease?: string;
  scrollStart?: string;
  scrollEnd?: string;
  stagger?: number;
  scrub?: boolean | number; // permite suavização numérica
}

const ScrollFloat: React.FC<ScrollFloatProps> = ({
  children,
  scrollContainerRef,
  containerClassName = '',
  textClassName = '',
  animationDuration = 0.9,
  ease = 'none',
  scrollStart = 'center bottom+=50%',
  scrollEnd = 'bottom bottom-=40%',
  stagger = 0.02,
  scrub = 0.6
}) => {
  const containerRef = useRef<HTMLHeadingElement>(null);

  const splitText = useMemo(() => {
    const text = typeof children === 'string' ? children : '';
    return text.split('').map((char, index) => (
      <span className="inline-block word" key={index}>
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroller = scrollContainerRef && scrollContainerRef.current ? scrollContainerRef.current : window;

    const charElements = el.querySelectorAll<HTMLElement>('.inline-block');

    // Respeita prefers-reduced-motion: mostra texto imediatamente
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      charElements.forEach(c => {
        c.style.opacity = '1';
        c.style.transform = 'none';
      });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(charElements, {
        willChange: 'opacity, transform',
        opacity: 0,
        yPercent: 60, // valor menor para suavizar
        rotateX: -25, // leve rotação para sutileza
        transformOrigin: '50% 50% -10px'
      });

      const tl = gsap.timeline({
        defaults: { ease, duration: animationDuration },
        scrollTrigger: {
          trigger: el,
          scroller,
          start: scrollStart,
          end: scrollEnd,
          scrub: scrub,
          invalidateOnRefresh: true
        }
      });

      tl.to(charElements, {
        opacity: 1,
        yPercent: 0,
        rotateX: 0,
        stagger: { each: stagger, ease: 'none' }
      });
    }, el);

    return () => ctx.revert();
  }, [scrollContainerRef, animationDuration, ease, scrollStart, scrollEnd, stagger, scrub]);

  return (
    <h2 ref={containerRef} className={`my-5 overflow-hidden ${containerClassName}`}>
      <span className={`inline-block text-[clamp(1.6rem,4vw,3rem)] leading-[1.2] tracking-tight will-change-transform ${textClassName}`}>{splitText}</span>
    </h2>
  );
};

export default ScrollFloat;
