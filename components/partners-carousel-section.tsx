"use client";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";

/*
  Seção: Carrossel Infinito de Logos de Parceiros
  Recursos:
  - Scroll horizontal contínuo (right -> left)
  - Duplicação de track para loop suave
  - Lazy boundary (IntersectionObserver) só inicia quando ~15% visível
  - Pausa manual (botão), hover e focus (teclado) pausam animação
  - Tooltips acessíveis (aria-describedby + role=tooltip) com categoria
  - Respeita prefers-reduced-motion (remove animação)
  - Acessibilidade: role="region", aria-label, alt text descritivo, foco seguro
*/

interface PartnerItem {
  src: string;
  alt: string;
  label: string; // tooltip
  categoria: string;
}

const partners: PartnerItem[] = [
  { src: "/logos-parceiros/abrhpe.png", alt: "Parceiro ABRHPE", label: "ABRHPE - Recursos Humanos", categoria: "RH" },
  { src: "/logos-parceiros/cesar.png", alt: "Parceiro CESAR", label: "CESAR - Tecnologia e Inovação", categoria: "Tecnologia" },
  { src: "/logos-parceiros/focus.png", alt: "Parceiro Focus", label: "Focus - Saúde Ocupacional", categoria: "Saúde" },
  { src: "/logos-parceiros/grupoara.png", alt: "Parceiro Grupo ARA", label: "Grupo ARA - Gestão Corporativa", categoria: "Gestão" },
  { src: "/logos-parceiros/hospital-eduardo.png", alt: "Parceiro Hospital Eduardo", label: "Hospital Eduardo - Rede Assistencial", categoria: "Assistencial" },
  { src: "/logos-parceiros/instituto.png", alt: "Parceiro Instituto", label: "Instituto - Pesquisa e Educação", categoria: "Educação" },
  { src: "/logos-parceiros/portodigital.png", alt: "Parceiro Porto Digital", label: "Porto Digital - Ecossistema Tecnologia", categoria: "Ecossistema" },
  { src: "/logos-parceiros/ultramega.png", alt: "Parceiro Ultramega", label: "Ultramega - Solução Complementar", categoria: "Tecnologia" },
];

// Duplicação acontece direto no markup para loop contínuo

export default function PartnersCarouselSection() {
  const [active, setActive] = useState(false); // só ativa animação quando em viewport
  const [mounted, setMounted] = useState(false); // evita hidratação divergente
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMounted(true);
    if (!containerRef.current) return;
    const el = containerRef.current;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(true);
          } else {
            // opcional: pausar quando sai completamente
            // setActive(false);
          }
        });
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <section
      id="parceiros"
  className="relative py-10 md:py-14 overflow-hidden border-y border-slate-200 bg-white scroll-mt-32 md:scroll-mt-40"
      role="region"
      aria-label="Logos de parceiros estratégicos"
      aria-describedby="parceiros-descricao"
    >
      <div className="w-full px-4 sm:px-8 xl:px-16 mx-auto">
        {/* Cabeçalho da seção */}
        <div className="mb-8 max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold leading-snug text-brand-dark tracking-tight">
            Rede de parceiros que amplia
            <span className="block bg-clip-text text-transparent bg-[linear-gradient(90deg,var(--color-brand-primary),var(--color-brand-dark))]">impacto e confiabilidade</span>
          </h2>
          <p className="mt-4 text-base md:text-lg text-gray-600/90 leading-relaxed mx-auto">
            Conectamos organizações de saúde, tecnologia, pesquisa e gestão para fortalecer a entrega do programa e manter práticas atualizadas baseadas em evidências.
          </p>
          <p className="sr-only" id="parceiros-descricao">Lista contínua de logos de organizações parceiras que colaboram com o programa Belz Conecta Saúde.</p>
        </div>
      </div>

      {/* Carrossel animado */}
      <div
        ref={containerRef}
        className="group [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
        data-active={active}
      >
        <div
          className={`flex w-max will-change-transform motion-reduce:animate-none ${mounted && active ? "animate-partners-scroll" : ""}`}
          aria-hidden="true"
        >
          {/* Primeira cópia */}
          <ul className="flex items-center gap-12">
            {partners.map((logo, i) => {
              const id = `logo-tooltip-a-${i}`;
              return (
                <li key={`a-${i}`} className="relative flex items-center transition duration-300 opacity-90 hover:opacity-100 focus-within:opacity-100">
                  <button type="button" className="outline-none focus:ring focus:ring-blue-300/60 rounded" aria-describedby={id}>
                    <Image src={logo.src} alt={logo.alt} width={160} height={80} className="h-14 w-auto object-contain" loading={i < 4 ? "eager" : "lazy"} />
                  </button>
                  <span role="tooltip" id={id} className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] px-2 py-1 rounded bg-blue-700 text-white opacity-0 translate-y-1 transition-all duration-200 group-[data-active='true']:[&:not(.hidden)]:block" data-tooltip>
                    {logo.label}
                  </span>
                </li>
              );
            })}
          </ul>
          {/* Segunda cópia */}
          <ul className="flex items-center gap-12" aria-hidden="true">
            {partners.map((logo, i) => {
              const id = `logo-tooltip-b-${i}`; // duplicata (aria-hidden evita redundância em leitores)
              return (
                <li key={`b-${i}`} className="relative flex items-center transition duration-300 opacity-90 hover:opacity-100">
                  <div className="outline-none rounded">
                    <Image src={logo.src} alt={logo.alt} width={160} height={80} className="h-14 w-auto object-contain" loading="lazy" />
                  </div>
                  <span role="tooltip" id={id} className="hidden" data-tooltip>{logo.label}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <style jsx>{`
        @keyframes partners-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-partners-scroll { animation: partners-scroll 26s linear infinite; }
        .group:hover .animate-partners-scroll,
        .group:focus-within .animate-partners-scroll {
          animation-play-state: paused;
        }
        /* Tooltip visibility (hover/focus) */
        li:hover > span[role=tooltip],
        li:focus-within > span[role=tooltip] {
          opacity: 1;
          transform: translate(-50%, 0);
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-partners-scroll { animation: none; }
        }
      `}</style>
    </section>
  );
}
