import React from "react";
import SectionTitle from "./section-title";

// Métricas / KPIs (placeholders iniciais com sufixo *)
export default function ImpactMetricsSection() {
  const metrics = [
    { label: "Redução projetada de absenteísmo", value: "-12%*", desc: "Comparação estimada após 12 meses de programa estruturado." },
    { label: "Engajamento médio em ações", value: "68%*", desc: "Participação média nas iniciativas multieixo (mental, físico, socioemocional)." },
    { label: "Queda em fatores de risco psicossocial", value: "-18%*", desc: "Média sobre clusters priorizados (stress, sobrecarga, falta de reconhecimento)." },
    { label: "Retenção de talentos (melhoria)", value: "+7%*", desc: "Estimativa correlacionada a ações de clima e prevenção." },
    { label: "Uso de recursos preventivos", value: "+42%*", desc: "Aumento no uso de canais de apoio e atividades de promoção." },
    { label: "Economia potencial em saúde", value: "R$ 180K*", desc: "Projeção sobre mitigação de afastamentos e sinistralidade." },
  ];

  return (
    <section id="resultados" className="relative py-20 bg-white">
  <div className="w-full px-4 sm:px-8 xl:px-16">
        <div className="mx-auto max-w-3xl text-center mb-12">
          <SectionTitle
            className="mb-4 border-y [border-image:linear-gradient(to_right,transparent,var(--color-brand-primary),transparent)1] py-2"
            textClassName="text-3xl md:text-4xl font-bold text-brand-dark"
          >
            Indicadores & Impacto
          </SectionTitle>
          <p className="text-gray-600 text-lg">Acompanhamos métricas que conectam bem-estar a resultado organizacional — orientando decisões baseadas em evidências.</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {metrics.map(m => (
            <div key={m.label} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition flex flex-col">
              <div className="text-3xl font-bold text-brand-dark mb-2 tracking-tight">{m.value}</div>
              <h3 className="font-medium text-gray-800 mb-1 text-sm leading-tight">{m.label}</h3>
              <p className="text-[13px] text-gray-600 leading-relaxed flex-1">{m.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <a href="#contato" className="btn bg-linear-to-t from-brand-primary to-brand-dark text-white shadow-sm">Quero estimativa para minha empresa</a>
        </div>
        <p className="mt-6 text-center text-xs text-gray-500">*Valores ilustrativos para demonstração. Resultados variam conforme maturidade, adesão e perfil populacional.</p>
      </div>
    </section>
  );
}
