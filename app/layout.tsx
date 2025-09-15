import "./css/style.css";

import { Inter } from "next/font/google";
import type { Metadata } from "next";

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
  metadataBase: new URL("https://www.exemplo.com"),
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
    url: "https://www.exemplo.com/",
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
  themeColor: "#0B3C87"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <head />
      <body className={`${inter.variable} bg-gray-50 font-inter tracking-tight text-gray-900 antialiased`}>
        <div className="flex min-h-screen flex-col overflow-hidden supports-[overflow:clip]:overflow-clip">
          {children}
        </div>
      </body>
    </html>
  );
}
