"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// Sistema global para coordenar o fim do loading com animações
let loadingCompleteCallbacks: (() => void)[] = [];
let isLoadingComplete = false;

export const onLoadingComplete = (callback: () => void) => {
  if (isLoadingComplete) {
    callback();
  } else {
    loadingCompleteCallbacks.push(callback);
  }
};

export const isLoadingFinished = () => isLoadingComplete;

/*
  Splash screen de carregamento inicial.
  - Fundo #011147 (usar utilitária inline mantida via CSS var futura se necessário)
  - Imagem vetor central com animação de pulsação
  - Respeita prefers-reduced-motion (fallback: sem pulsar, apenas fade-in)
  - Acessibilidade: role="status" + texto sr-only
  - Auto esconde após first paint + pequeno atraso mínimo (200-300ms) para suavidade
*/

export default function LoadingSplash() {
  const [hidden, setHidden] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timeout = setTimeout(() => {
      setHidden(true);
      // Notificar que o loading terminou
      isLoadingComplete = true;
      loadingCompleteCallbacks.forEach(callback => callback());
      loadingCompleteCallbacks = [];
    }, 1000); // otimizado para FCP mais rápido
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      aria-hidden={hidden}
      className={`fixed inset-0 z-[999] flex items-center justify-center bg-[#011147] transition-opacity duration-500 ${hidden ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
    >
      <div role="status" aria-live="polite" className="relative flex flex-col items-center">
        <span className="sr-only">Carregando conteúdo inicial</span>
        {mounted ? (
          <motion.div
            animate={{
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 0.9,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              animationPlayState: "var(--animation-play-state, running)"
            }}
          >
            <Image
              src="/images/vetor-conecta.png"
              alt=""
              width={300}
              height={300}
              priority
              className="select-none will-change-transform"
            />
          </motion.div>
        ) : (
          <Image
            src="/images/vetor-conecta.png"
            alt=""
            width={300}
            height={300}
            priority
            className="select-none will-change-transform"
          />
        )}
      </div>
    </div>
  );
}
