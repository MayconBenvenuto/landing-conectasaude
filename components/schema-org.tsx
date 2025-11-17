import type { Organization, WithContext } from 'schema-dts';

export function OrganizationSchema() {
  const schema: WithContext<Organization> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Belz Conecta Saúde",
    "url": "https://belz-conecta-saude.vercel.app",
    "logo": "https://belz-conecta-saude.vercel.app/images-conecta/logo-fundotransparente.png",
    "description": "Programa corporativo integrado de saúde: gestão de riscos psicossociais, saúde mental, prevenção e cultura organizacional com indicadores mensuráveis.",
    "parentOrganization": {
      "@type": "Organization",
      "name": "Belz Seguros",
      "url": "https://www.belzseguros.com.br"
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "BR",
      "addressLocality": "Recife",
      "addressRegion": "PE"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Sales",
      "telephone": "+55-81-99155-4660",
      "availableLanguage": "Portuguese"
    },
    "sameAs": [
      "https://www.linkedin.com/company/conecta-sa%C3%BAdee/posts/?feedView=all",
      "https://www.instagram.com/belzconectasaude/",
      "https://www.youtube.com/belzseguros"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
