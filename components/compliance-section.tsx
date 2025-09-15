import React from "react";

// Conformidade / NR 1 / PGR
export default function ComplianceSection() {
  const items = [
    {
      title: "Alinhado à NR 1",
      text: "Estrutura metodológica compatível com requisitos de Gerenciamento de Riscos Ocupacionais e evidências para auditorias.",
    },
    {
      title: "Integração ao PGR",
      text: "Entregáveis integráveis ao Programa de Gerenciamento de Riscos: diagnóstico, plano de ação e registros de implementação.",
    },
    {
      title: "Evidências Documentais",
      text: "Relatórios periódicos, registros de participação, indicadores de acompanhamento e histórico de intervenções.",
    },
    {
      title: "Suporte ao RH",
      text: "Apoiamos o RH na interpretação dos dados e priorização de ações que mitiguem riscos e sustentem cultura saudável.",
    },
    {
      title: "Rastreabilidade",
      text: "Cada ação gerenciada com status, responsável e justificativa – facilitando compliance e continuidade operacional.",
    },
    {
      title: "Certificação & Selos",
      text: "Processo apto a gerar evidências para emissão de selos internos (ergonomia, saúde mental, reconhecimento).",
    },
  ];

  return (
    <section id="conformidade" className="relative py-20 bg-gray-50">
  <div className="w-full px-4 sm:px-8 xl:px-16">
        <div className="mx-auto max-w-3xl text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4 border-y [border-image:linear-gradient(to_right,transparent,var(--color-brand-primary),transparent)1] py-2">
            Conformidade & NR 1 / PGR
          </h2>
          <p className="text-gray-600 text-lg">Estrutura pronta para gerar, organizar e sustentar evidências regulatórias enquanto fortalece cultura e bem-estar.</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(i => (
            <div key={i.title} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition">
              <h3 className="font-semibold text-gray-900 mb-2">{i.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{i.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center text-xs text-gray-500">*Esta seção não substitui parecer jurídico ou técnico especializado; atua como suporte estruturado ao RH.</div>
      </div>
    </section>
  );
}
