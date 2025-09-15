import Link from "next/link";
import Logo from "./logo";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(o => !o);

  return (
    <header className="fixed inset-x-0 top-0 z-30 w-full pt-2 md:pt-4">
      <div className="mx-auto w-full max-w-7xl px-3 sm:px-6 lg:px-10 xl:px-16">
        {/* Container principal do header */}
        <div
          className="relative flex h-14 items-center justify-between gap-2 rounded-xl border border-white/40 bg-white/70 px-2 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.08)] backdrop-blur-xl dark:border-white/10 dark:bg-gray-900/70 sm:gap-3 sm:px-3 md:rounded-2xl md:px-4 before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:[background:linear-gradient(135deg,rgba(255,255,255,0.55),rgba(255,255,255,0.3))] before:opacity-90"
        >
          {/* Camada interna (surface) com efeito liquid glass: brilho sutil + highlight superior */}
          <div
            className="absolute inset-0 rounded-[inherit] [mask:linear-gradient(#fff,#fff)]"
            aria-hidden="true"
          >
            {/* layer de textura / luz suave */}
            <div className="absolute inset-0 rounded-[inherit] bg-[radial-gradient(circle_at_20%_15%,rgba(255,255,255,0.9),rgba(255,255,255,0)_60%)] opacity-60" />
            {/* highlight superior */}
            <div className="absolute inset-x-0 top-0 h-px rounded-t-[inherit] bg-gradient-to-r from-white/40 via-white/70 to-white/40" />
            {/* borda interna sutil */}
            <div className="absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/40" />
          </div>

          {/* Site branding */}
          <div className="relative flex flex-1 items-center">
            <Logo />
          </div>

          {/* Navegação principal */}
          {/* Botão menu mobile */}
          <div className="flex flex-1 items-center justify-end md:hidden">
            <button
              type="button"
              onClick={toggle}
              aria-expanded={open}
              aria-controls="primary-navigation"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/40 bg-white/60 text-brand-dark shadow-sm transition hover:bg-white/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/60 dark:border-white/10 dark:bg-gray-800/70 dark:text-gray-100 dark:hover:bg-gray-800"
            >
              <span className="sr-only">{open ? "Fechar menu" : "Abrir menu"}</span>
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                {open ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <>
                    <line x1="3" x2="21" y1="6" y2="6" />
                    <line x1="3" x2="21" y1="12" y2="12" />
                    <line x1="3" x2="21" y1="18" y2="18" />
                  </>
                )}
              </svg>
            </button>
          </div>

          <nav
            id="primary-navigation"
            className={`relative hidden flex-1 items-center justify-end md:flex`}
          >
            <ul className="flex items-center gap-1.5 text-xs font-medium sm:text-sm">
              {[
                { href: '#quem-somos', label: 'Quem Somos' },
                { href: '#pilares', label: 'Pilares' },
                { href: '#beneficios', label: 'Benefícios' },
                { href: '#jornada', label: 'Jornada' },
              ].map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="group relative rounded-md px-3 py-2 text-[color:var(--color-brand-dark)]/80 transition-colors duration-300 hover:text-[color:var(--color-brand-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-brand-primary)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                  >
                    <span className="relative z-10">{item.label}</span>
                    <span className="pointer-events-none absolute inset-x-1 bottom-1 h-0.5 origin-left scale-x-0 rounded bg-[color:var(--color-brand-primary)]/70 transition-transform duration-300 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100" aria-hidden="true" />
                  </a>
                </li>
              ))}
              <li className="pl-1">
                <a
                  href="#contato"
                  className="btn-sm relative inline-flex items-center justify-center gap-1 rounded-lg bg-[color:var(--color-brand-primary)] px-4 py-2 text-white shadow-lg shadow-[color:var(--color-brand-dark)]/20 transition-all duration-300 hover:brightness-110 hover:shadow-[0_6px_18px_-4px_rgba(2,29,121,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-brand-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-white active:translate-y-px"
                >
                  <span>Fale conosco</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
        {/* Drawer mobile */}
        <div
          className={`md:hidden ${open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"} transition-opacity`}
        >
          <div className="mt-2 rounded-xl border border-white/40 bg-white/80 p-3 backdrop-blur-xl shadow-lg dark:border-white/10 dark:bg-gray-900/80">
            <ul className="flex flex-col gap-1 text-sm font-medium">
              {[{ href: '#quem-somos', label: 'Quem Somos' }, { href: '#pilares', label: 'Pilares' }, { href: '#beneficios', label: 'Benefícios' }, { href: '#jornada', label: 'Jornada' }].map(item => (
                <li key={item.href}>
                  <a
                    onClick={() => setOpen(false)}
                    href={item.href}
                    className="block rounded-md px-3 py-2 text-brand-dark/80 transition-colors hover:bg-brand-primary/10 hover:text-brand-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#contato"
                  onClick={() => setOpen(false)}
                  className="mt-1 inline-flex w-full items-center justify-center gap-1 rounded-lg bg-brand-primary px-4 py-2 text-white shadow hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                >
                  Fale conosco
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
