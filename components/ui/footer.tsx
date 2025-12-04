"use client";
import Link from "next/link";
import Logo from "./logo";
import { useMemo } from "react";

export default function Footer({ border = false }: { border?: boolean }) {
  const currentYear = useMemo(() => new Date().getFullYear(), []);
  return (
    <footer>
  <div className="w-full px-4 sm:px-8 xl:px-16">
        {/* Top area: Blocks */}
        <div
          className={`grid gap-10 py-8 sm:grid-cols-12 md:py-12 ${border ? "border-t [border-image:linear-gradient(to_right,transparent,var(--color-slate-200),transparent)1]" : ""}`}
        >
          {/* Identidade */}
          <div className="space-y-3 sm:col-span-12 lg:col-span-4">
            <Logo />
            <p className="text-sm text-gray-600 leading-relaxed">
              Programa corporativo de saúde integrada da <Link href="https://www.belzseguros.com.br" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:text-brand-dark underline underline-offset-2">Belz Seguros</Link>,
              conectando prevenção, cuidado contínuo e bem-estar para elevar a qualidade de vida e reduzir custos assistenciais.
            </p>
            <div className="text-xs text-gray-500">
              &copy; {currentYear} Belz Seguros. Todos os direitos reservados.
            </div>
          </div>

          {/* Programa */}
          <div className="space-y-2 sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h3 className="text-sm font-medium text-brand-dark">Programa</h3>
            <ul className="space-y-2 text-sm">
              <li><a className="text-gray-600 transition hover:text-gray-900" href="#quem-somos">Quem Somos</a></li>
              <li><a className="text-gray-600 transition hover:text-gray-900" href="#pilares">Pilares</a></li>
              <li><a className="text-gray-600 transition hover:text-gray-900" href="#beneficios">Benefícios</a></li>
              <li><a className="text-gray-600 transition hover:text-gray-900" href="#jornada">Jornada</a></li>
              <li><a className="text-gray-600 transition hover:text-gray-900" href="#contato">Contato</a></li>
            </ul>
          </div>

          {/* Institucional */}
          <div className="space-y-2 sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h3 className="text-sm font-medium text-brand-dark">Institucional</h3>
            <ul className="space-y-2 text-sm">
              <li><Link className="text-gray-600 transition hover:text-gray-900" href="https://www.belzseguros.com.br" target="_blank" rel="noopener noreferrer">Site Belz Seguros</Link></li>
              <li><Link className="text-gray-600 transition hover:text-gray-900" href="https://www.belzseguros.com.br/sobre" target="_blank" rel="noopener noreferrer">Sobre</Link></li>
              <li><Link className="text-gray-600 transition hover:text-gray-900" href="https://www.belzseguros.com.br/blog" target="_blank" rel="noopener noreferrer">Blog</Link></li>
              <li><Link className="text-gray-600 transition hover:text-gray-900" href="https://www.belzseguros.com.br/carreiras" target="_blank" rel="noopener noreferrer">Carreiras</Link></li>
              <li><Link className="text-gray-600 transition hover:text-gray-900" href="https://www.belzseguros.com.br/contato" target="_blank" rel="noopener noreferrer">Fale Conosco</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-2 sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h3 className="text-sm font-medium text-brand-dark">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link className="text-gray-600 transition hover:text-gray-900" href="https://www.belzseguros.com.br/privacidade" target="_blank" rel="noopener noreferrer">Privacidade</Link></li>
              <li><Link className="text-gray-600 transition hover:text-gray-900" href="https://www.belzseguros.com.br/termos" target="_blank" rel="noopener noreferrer">Termos de Uso</Link></li>
              <li><Link className="text-gray-600 transition hover:text-gray-900" href="https://www.belzseguros.com.br/lgpd" target="_blank" rel="noopener noreferrer">LGPD</Link></li>
              <li><Link className="text-gray-600 transition hover:text-gray-900" href="https://www.belzseguros.com.br/seguranca" target="_blank" rel="noopener noreferrer">Segurança</Link></li>
              <li><Link className="text-gray-600 transition hover:text-gray-900" href="https://www.belzseguros.com.br/cookies" target="_blank" rel="noopener noreferrer">Cookies</Link></li>
            </ul>
          </div>

          {/* Social & Contato */}
          <div className="space-y-3 sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h3 className="text-sm font-medium text-brand-dark">Conexões</h3>
            <ul className="flex gap-2">
              <li>
                <a
                  className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 text-brand-primary transition hover:border-brand-primary hover:text-brand-dark"
                  href="https://www.linkedin.com/company/conecta-sa%C3%BAdee/posts/?feedView=all"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Conecta Saúde"
                >
                  <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" aria-hidden="true"><path d="M4.98 3.5a2.5 2.5 0 11.02 5.001A2.5 2.5 0 014.98 3.5zM3 9h4v12H3zM14.5 9c-2.485 0-4.5 2.239-4.5 5v7h-4V9h4v2.101S11.248 9 14.5 9c3.584 0 5.5 2.604 5.5 6.002V21h-4v-5.25c0-3.045-1.275-3.75-2.5-3.75z" /></svg>
                </a>
              </li>
              <li>
                <a
                  className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 text-brand-primary transition hover:border-brand-primary hover:text-brand-dark"
                  href="https://www.instagram.com/belzconectasaude/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram Belz Conecta Saúde"
                >
                  <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" aria-hidden="true"><path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 1.5A4.25 4.25 0 003.5 7.75v8.5A4.25 4.25 0 007.75 20.5h8.5a4.25 4.25 0 004.25-4.25v-8.5A4.25 4.25 0 0016.25 3.5h-8.5zM12 7a5 5 0 110 10 5 5 0 010-10zm0 1.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7zm5.25-.88a.88.88 0 110 1.76.88.88 0 010-1.76z"/></svg>
                </a>
              </li>
              <li>
                <a
                  className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 text-brand-primary transition hover:border-brand-primary hover:text-brand-dark"
                  href="https://www.youtube.com/belzseguros"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube Belz Seguros"
                >
                  <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" aria-hidden="true"><path d="M21.543 6.498a2.697 2.697 0 00-1.898-1.913C17.864 4.167 12 4.167 12 4.167s-5.864 0-7.645.418A2.697 2.697 0 002.457 6.5C2.04 8.281 2.04 12 2.04 12s0 3.719.417 5.502a2.697 2.697 0 001.898 1.913c1.781.417 7.645.417 7.645.417s5.864 0 7.645-.418a2.697 2.697 0 001.898-1.913C21.96 15.72 21.96 12 21.96 12s0-3.719-.417-5.502zM10.833 15.167V8.833L15.5 12l-4.667 3.167z"/></svg>
                </a>
              </li>
            </ul>
            <div className="pt-4 space-y-3">
              <div>
                <a
                  href="https://wa.me/5581988242023?text=Ol%C3%A1!%20Tenho%20interesse%20em%20conhecer%20o%20programa%20Belz%20Conecta%20Sa%C3%BAde.%20Poderia%20me%20enviar%20mais%20informa%C3%A7%C3%B5es%3F"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-md bg-green-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm outline-none transition focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 hover:bg-green-700 active:scale-[0.98]"
                  aria-label="Falar diretamente com nossa equipe no WhatsApp"
                >
                  <svg
                    aria-hidden="true"
                    className="h-5 w-5 fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.52 3.48A11.85 11.85 0 0012 0C5.37 0 .14 5.23.14 11.86c0 2.09.55 4.14 1.6 5.95L0 24l6.37-1.67a11.84 11.84 0 005.63 1.43h.01c6.63 0 11.86-5.23 11.86-11.86 0-3.17-1.24-6.15-3.49-8.42zM12 21.52a9.6 9.6 0 01-4.89-1.34l-.35-.2-3.78.99 1.01-3.68-.23-.38a9.65 9.65 0 01-1.48-5.16C2.29 6.44 6.63 2.1 12 2.1c2.58 0 5 1 6.82 2.82a9.57 9.57 0 012.82 6.8c0 5.37-4.34 9.8-9.66 9.8zm5.29-7.18c-.29-.15-1.72-.85-1.99-.95-.27-.1-.47-.15-.67.15s-.77.95-.95 1.15-.35.22-.64.07c-.29-.15-1.23-.45-2.34-1.44-.86-.77-1.44-1.72-1.61-2-.17-.29-.02-.44.13-.59.13-.13.29-.34.43-.51.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.48-.5-.67-.51l-.57-.01c-.2 0-.52.07-.79.37-.27.29-1.04 1-1.04 2.44s1.07 2.84 1.22 3.04c.15.19 2.11 3.22 5.11 4.52.71.31 1.27.5 1.7.64.72.23 1.38.2 1.9.12.58-.09 1.72-.7 1.96-1.38.24-.68.24-1.26.17-1.38-.07-.12-.26-.2-.55-.35z" />
                  </svg>
                  <span>WhatsApp</span>
                </a>
              </div>
              <div className="text-sm text-gray-600">
                <span className="block mb-1">ou</span>
                <a href="#contato" className="inline-flex items-center gap-1 text-brand-primary hover:text-brand-dark font-medium transition">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>Preencher formulário</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Big text */}
      <div className="relative -mt-16 h-60 w-full" aria-hidden="true">
        <div className="pointer-events-none absolute left-1/2 -z-10 -translate-x-1/2 text-center text-[300px] md:text-[340px] font-bold leading-none tracking-tight before:bg-linear-to-b before:from-gray-200 before:to-gray-100/30 before:to-80% before:bg-clip-text before:text-transparent before:content-['CONECTA'] after:absolute after:inset-0 after:bg-gray-300/70 after:bg-clip-text after:text-transparent after:mix-blend-darken after:content-['CONECTA'] after:[text-shadow:0_1px_0_white]"></div>
        {/* Glow */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-2/3"
          aria-hidden="true"
        >
          <div className="h-56 w-56 rounded-full border-[20px] border-brand-primary blur-[80px]"></div>
        </div>
      </div>
    </footer>
  );
}
