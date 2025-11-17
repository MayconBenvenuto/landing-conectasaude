import "./css/style.css";

import { Inter } from "next/font/google";
import type { Metadata, Viewport } from "next";
import LoadingSplash from '@/components/ui/loading-splash';
import { Analytics } from '@vercel/analytics/react';
import { OrganizationSchema } from '@/components/schema-org';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Belz Conecta Saúde",
    template: "%s | Belz Conecta Saúde",
  },
  description: "Programa corporativo integrado: gestão de riscos psicossociais, saúde mental, prevenção e cultura organizacional com indicadores.",
  // Base do site para geração de URLs absolutas em metadata / sitemap
  metadataBase: new URL("https://belz-conecta-saude.vercel.app"),
  alternates: { canonical: "/" },
  icons: {
    icon: [
      { url: "/images-conecta/favicon-32x32.png", sizes: "32x32" },
      { url: "/images-conecta/favicon-16x16.png", sizes: "16x16" },
      { url: "/images-conecta/favicon.ico" }
    ],
    apple: "/images-conecta/apple-touch-icon.png",
  },
  openGraph: {
    title: "Belz Conecta Saúde",
    description: "Programa integrado de saúde corporativa com impacto mensurável.",
  url: "https://belz-conecta-saude.vercel.app/",
    siteName: "Belz Conecta Saúde",
    locale: "pt_BR",
    type: "website",
    images: [
      { url: "/images-conecta/image-hero.png", width: 1200, height: 630, alt: "Colaboradores participando de programa de saúde corporativa" }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Belz Conecta Saúde",
    description: "Estratégia integrada de saúde corporativa.",
    images: ["/images-conecta/image-hero.png"]
  },
  robots: { index: true, follow: true },
};

// Migrar themeColor para viewport (Next.js 15 recomendação)
export const viewport: Viewport = {
  themeColor: '#0B3C87'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <head>
        <OrganizationSchema />
      </head>
      <body className={`${inter.variable} bg-gray-50 font-inter tracking-tight text-gray-900 antialiased`}>
        <LoadingSplash />
        <div className="flex min-h-screen flex-col overflow-hidden supports-[overflow:clip]:overflow-clip">
          {children}
        </div>
        <Analytics />
      </body>
    </html>
  );
}
