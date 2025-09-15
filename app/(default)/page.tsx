export const metadata = {
  title: "Belz Conecta Saúde - Bem-estar Corporativo Integrado",
  description:
    "Programa integrado de saúde corporativa: gestão de riscos psicossociais, saúde mental, prevenção e engajamento com indicadores e impacto mensurável.",
};

import HeroSection from "@/components/hero-section";
import PartnersCarouselSection from "@/components/partners-carousel-section";
import JourneySection from "@/components/journey-section";
import RiskWorkflowSection from "@/components/risk-workflow-section";
import PillarsSection from "@/components/pillars-section";
import ComplianceSection from "@/components/compliance-section";
import ImpactMetricsSection from "@/components/impact-metrics-section";
import BenefitsSection from "@/components/benefits-section";
import LeadFormSection from "@/components/lead-form-section";

export default function Home() {
  return (
    <>
      <HeroSection />
  {/* Prova Social: Logos de Parceiros */}
  <PartnersCarouselSection />
      {/* Jornada */}
      <JourneySection />
      {/* Diagnóstico & Fluxo de Riscos */}
      <RiskWorkflowSection />
      {/* Pilares */}
      <PillarsSection />
      {/* Conformidade / NR 1 */}
      <ComplianceSection />
      {/* Métricas e Indicadores */}
      <ImpactMetricsSection />
      {/* Benefícios (depoimento) */}
      <BenefitsSection />
      {/* Formulário */}
      <LeadFormSection />
    </>
  );
}
