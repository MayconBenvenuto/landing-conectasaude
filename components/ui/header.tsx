import Link from "next/link";
import Logo from "./logo";

export default function Header() {
  return (
    <header className="fixed top-2 z-30 w-full md:top-6">
      <div className="w-full px-4 sm:px-8 xl:px-16">
        {/* Container principal do header */}
        <div
          className="relative flex h-14 items-center justify-between gap-3 rounded-2xl px-3 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.08),0_0_0_1px_rgba(255,255,255,0.4)] backdrop-blur-xl before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:[background:linear-gradient(135deg,rgba(255,255,255,0.55),rgba(255,255,255,0.35))] before:opacity-90"
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
          <nav className="relative flex flex-1 items-center justify-end">
            <ul className="flex items-center gap-1.5 text-sm font-medium">
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
      </div>
    </header>
  );
}
