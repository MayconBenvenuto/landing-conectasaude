import React from "react";
import SectionTitle from "./section-title";

// Diagnóstico & Gestão de Riscos Psicossociais
// Estrutura baseada nos 5 pontos do material: Integração PGR -> Ferramentas -> Análise -> Plano -> Monitoramento.
export default function RiskWorkflowSection() {
  const steps = [
    {
      number: 1,
      title: "Integração ao PGR",
      text: "Alinhamos o programa às diretrizes de Gerenciamento de Riscos Psicossociais conforme NR 1, criando base documental." ,
    },
    {
      number: 2,
      title: "Ferramentas de Pesquisa",
      text: "Aplicação de questionários validados, entrevistas, grupos focais e análise de dados existentes para mapear fatores críticos." ,
    },
    {
      number: 3,
      title: "Análise Técnica",
      text: "Consolidação dos achados em clusters de risco priorizados com leitura qualitativa e quantitativa." ,
    },
    {
      number: 4,
      title: "Plano de Ação Personalizado",
      text: "Co-criação com o RH de intervenções preventivas e corretivas, alinhadas à cultura e maturidade da empresa." ,
    },
    {
      number: 5,
      title: "Monitoramento Contínuo",
      text: "Métricas de engajamento, evolução de fatores de risco e indicadores de saúde ocupacional para ajustes iterativos." ,
    },
  ];

  return (
    <section id="diagnostico" className="relative py-20 bg-white">
  <div className="w-full px-4 sm:px-8 xl:px-16">
        <div className="mx-auto max-w-3xl text-center mb-12">
          <SectionTitle
            className="mb-4 border-y [border-image:linear-gradient(to_right,transparent,var(--color-brand-primary),transparent)1] py-2"
            textClassName="text-3xl md:text-4xl font-bold text-brand-dark"
          >
            Diagnóstico & Gestão de Riscos Psicossociais
          </SectionTitle>
          <p className="text-gray-600 text-lg">Fluxo estruturado para transformar sinais dispersos em decisões estratégicas de bem-estar corporativo.</p>
        </div>
        <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((s) => (
            <li key={s.number} className="relative group rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-t from-brand-primary to-brand-dark text-white font-semibold shadow-sm group-hover:scale-105 transition">
                {s.number}
              </div>
              <h3 className="font-semibold text-gray-900 mb-2 flex items-start gap-2">
                <span>{s.title}</span>
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">{s.text}</p>
            </li>
          ))}
        </ol>
        <div className="mt-12 text-center">
          <a href="#contato" className="btn bg-linear-to-t from-brand-primary to-brand-dark text-white shadow-sm">
            Iniciar Diagnóstico
          </a>
        </div>
      </div>
    </section>
  );
}
