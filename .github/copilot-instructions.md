## Belz Conecta Saúde – Guia Rápido para Agentes (Next.js 15 + Tailwind 4)
Objetivo: Landing modular focada em conversão (lead) com forte ênfase em acessibilidade, performance e consistência visual full‑width.

### Arquitetura & Organização
* App Router (`app/`) com página principal em `app/(default)/page.tsx` e agrupamento de auth em `(auth)/`.
* Componentes de seção: padrão `components/<nome>-section.tsx` (wrapper `section` + `w-full px-4 sm:px-8 xl:px-16`).
* UI compartilhada: `components/ui/header.tsx` (links âncora) e `components/ui/footer.tsx`.
* Mídia e assets em `public/` (subpastas: `images-conecta`, `logos-parceiros`, `video`).
* Estilo: Tailwind 4 + tokens / animações custom em `app/css/style.css` (paleta `--color-brand-*`, utilitárias de contraste `text-high-contrast*`).
* Interatividade isolada apenas onde necessário (ex: `"use client"` em vídeo, carrossel, formulário, animações de texto).

### Sistema de Coordenação de Animações (CRÍTICO)
* `LoadingSplash` (`components/ui/loading-splash.tsx`) exporta sistema global: `onLoadingComplete()` e `isLoadingFinished()`.
* **BlurText** e **RotatingText** aguardam loading terminar via callback antes de iniciar animações.
* Fluxo: Loading splash (1.9s) → callback global → hero animações começam sequencialmente.
* **NUNCA** altere este sistema sem testar SSR/hidratação - componentes usam `canAnimate` state para evitar mismatch.

### Padrões Essenciais
* Layout full‑width sempre; limitar largura só em blocos internos (`max-w-3xl`, `max-w-prose`) — não recriar `max-w-6xl` no container principal.
* Âncoras: cada seção com `id` + `scroll-mt-32 md:scroll-mt-40` para compensar header fixo.
* Cores novas: definir via CSS root (não inserir hex inline). Há utilitárias: `.bg-brand-dark`, `.text-brand-primary`, `.text-high-contrast`.
* Imagens: preferir `next/image`; quando usar `fill`, certificar `parent` com `relative` e altura definida.

### Componentes-Chave & Notas
* `loading-splash.tsx`: Animação framer-motion (1.9s) + sistema global de callbacks. Gerencia hidratação via `mounted` state.
* `hero-section.tsx`: Vídeo somente após interação; legendas em `/public/video/apresentacao-belzseguros.vtt`; transcrição toggle (`showTranscript`). **BlurText** e **RotatingText** coordenados com loading. Não alterar lógica de `playing/muted` sem garantir que o `src` só é definido após clique.
* `BlurText.tsx`: Animações CSS + framer fallback; importa `onLoadingComplete` para coordenação. Props: `delay`, `stagger`, `direction`. Usa `canAnimate` para evitar hydration mismatch.
* `RotatingText.tsx`: Framer-motion com stagger complexo; importa sistema de loading. Auto-rotação via `setInterval` só após `canAnimate=true`. Props: `rotationInterval`, `splitBy`, `staggerFrom`.
* `partners-carousel-section.tsx`: Animação CSS contínua ativada só quando visível (IntersectionObserver). Segunda lista duplicada com `aria-hidden`.
* `pillars-section.tsx`: Imagens decorativas agora marcadas com `alt=""` + `aria-hidden` — manter padrão para novos elementos puramente visuais.
* `journey-section.tsx`: Grid de ações usando `next/image` com `fill` — manter container `relative h-40`.
* `lead-form-section.tsx`: Integra API (`POST /api/lead`) + honeypot (`empresa_site`). Em caso de validação falha, backend retorna `errors[]`.

### Acessibilidade
* Tooltips: `role="tooltip"` + `aria-describedby` (ver carrossel de parceiros).
* Imagens decorativas: `alt=""` + `aria-hidden="true"`.
* Texto animado: conteúdo real exposto em `<span class="sr-only">` para leitores de tela (ver `RotatingText`).
* Respeitar `prefers-reduced-motion`: manter classes / fallbacks (não adicionar animações JS não condicionais).

### Performance & Boas Práticas
* Vídeo: não pré-carregar; `poster` + `preload="none"` + carregamento de `src` gateado por estado.
* Carrossel: não iniciar animação fora do viewport — manter lógica `IntersectionObserver`.
* **Animações coordenadas**: novos componentes animados devem importar e usar `onLoadingComplete()` se executam no hero/viewport inicial.
* Evitar dependências redundantes; AOS já removido — usar `framer-motion` ou animações CSS.
* Se criar novo componente animado, preferir CSS first; só usar motion quando for core (ex: stagger complexo).
* **Hidratação**: componentes com animação inicial devem usar pattern `canAnimate` state + `useEffect` para evitar server/client mismatch.

### API & Formulário
* Endpoint principal: `app/api/lead/route.ts` – validações básicas, log em `console` (trocar por persistência real se evoluir).
* Prevenir spam: manter honeypot; não remover sem alternativa (ex reCAPTCHA).
* Campos obrigatórios: `nome`, `empresa`, `email`. Erros retornados como array simples para UI.

### Fluxo Dev
* Rodar local: `pnpm dev` (Turbopack ativo).
* Build: `pnpm build`; depois `pnpm start`.
* Ajustes de estilo: centralizar em `style.css`; criar utilitária ao invés de espalhar classes ad‑hoc com hex.
* **Dependências limpas**: Removido `three.js`, `postprocessing` e `Hyperspeed.tsx` (não utilizados).

### Ao Adicionar Nova Seção
1. Criar arquivo no padrão `components/<nome>-section.tsx`.
2. Wrapper: `<section id="..." className="relative w-full px-4 sm:px-8 xl:px-16 scroll-mt-32 md:scroll-mt-40">`.
3. Importar em `app/(default)/page.tsx` na ordem lógica narrativa.
4. Atualizar links no `header.tsx` se for âncora navegável.

### O que NÃO Fazer
* Não inserir hex direto em JSX (usar tokens ou criar utilitária).
* Não adicionar animação que dependa de tamanho/layout antes de `mounted`.
* Não alterar sistema de coordenação do loading sem testar SSR completo.
* Não iniciar animações síncronas no hero sem aguardar `onLoadingComplete()`.
* Não alterar IDs de âncora sem atualizar header.
* Não remover honeypot do formulário sem substituição.

### PRs Automatizados (Agente)
* Explicar dif: objetivo + impacto em acessibilidade / performance.
* Validar build TS antes (erro de tipo aborta PR).
* Se alterar animação, mencionar fallback para `prefers-reduced-motion`.

Manter: foco em legibilidade, acessibilidade robusta e consistência full‑width.
