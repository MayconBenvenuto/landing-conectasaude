# Belz Conecta Saúde – Landing Corporativa

Landing page focada em geração de leads para o programa Belz Conecta Saúde (gestão integrada de bem‑estar corporativo e riscos psicossociais). Construída em **Next.js 15 (App Router)** + **Tailwind CSS 4** com foco em acessibilidade, desempenho e consistência visual full‑width.

## 🚀 Visão Geral

| Área | Objetivo |
|------|----------|
| Hero | Mensagem principal + vídeo sob demanda (não pré-carregado) |
| Parceiros | Prova social via carrossel com animação somente quando visível |
| Jornada | Etapas / ações do programa (grid) |
| Pilares | Estrutura estratégica (6 pilares) com elementos decorativos acessíveis |
| Métricas / Benefícios | Autoridade e impacto |
| Formulário | Captura de contato (nome, empresa, email, etc.) + honeypot anti-spam |

## 🧱 Arquitetura

* `app/` – App Router; página principal em `app/(default)/page.tsx`.
* `components/*-section.tsx` – Cada bloco narrativo isolado (layout semântico).
* `components/ui/` – Navegação, footer, itens reutilizáveis.
* `public/` – Imagens (`images-conecta`, `logos-parceiros`, `acoes`), vídeo e favicons.
* `app/api/lead/route.ts` – Endpoint para submissão do formulário (validação + honeypot).
* Estilos centrais em `app/css/style.css` (tokens: `--color-brand-*`, utilitárias de contraste, animações).

## 🎨 Convenções de Estilo

* Wrapper padrão seção: `section.relative.w-full.px-4.sm:px-8.xl:px-16.scroll-mt-32.md:scroll-mt-40`.
* Limitar largura de conteúdo textual interno com `max-w-3xl` / `max-w-prose` quando necessário.
* Não usar hex direto em JSX – criar utilitária ou variável CSS.
* Imagens com `next/image`; se `fill`, garantir container `relative` + altura fixa.

## ♿ Acessibilidade

* Texto animado: `<span class="sr-only">` em `RotatingText` para leitores de tela.
* Tooltips: `role="tooltip"` + `aria-describedby` no carrossel.
* Imagens decorativas com `alt=""` + `aria-hidden="true"` (ex: elementos orbitais nos pilares).
* Vídeo: inicia somente após interação; legendas `.vtt` + transcrição expansível.
* Suporte a `prefers-reduced-motion` (animações pausam ou degradam).

## ⚙️ Desenvolvimento

```bash
pnpm install
pnpm dev    # Inicia (Turbopack)
pnpm build  # Build produção
pnpm start  # Servir build local
```

Node mínimo definido em `package.json` (engines: `>=18.18.0`).

## 📡 API de Lead

Endpoint: `POST /api/lead`

Payload mínimo:

```json
{ "nome": "...", "empresa": "...", "email": "...", "cargo": "?", "whatsapp": "?", "honeypot": "" }
```

Retorno sucesso: `{ ok: true }`

Retorno erro validação: `{ ok: false, errors: ["nome", "email"...] }`

Honeypot: campo oculto `empresa_site` – se preenchido, tratado como spam.

## 🛠 Padrões de Código

* Componentes client específicos usam `"use client"` (vídeo, carrossel, formulário, animações).
* Evitar lógica que cause divergência SSR vs cliente (usar `useEffect` para gating de animações).
* `RotatingText`: não recalcular splits; usar props de controle (`rotationInterval`, `staggerFrom`).

## 📦 Estrutura Simplificada

```text
app/
	(default)/page.tsx
	api/lead/route.ts
	css/style.css
components/
	hero-section.tsx
	partners-carousel-section.tsx
	journey-section.tsx
	pillars-section.tsx
	benefits-section.tsx
	impact-metrics-section.tsx
	lead-form-section.tsx
	ui/header.tsx
	ui/footer.tsx
public/
	video/apresentacao-belzseguros.mp4
	video/apresentacao-belzseguros.vtt
	images-conecta/*
```

## 🚀 Deploy na Vercel

* Configuração adicional em `vercel.json` (headers de segurança básicos).
* `.vercelignore` evita envio de arquivos irrelevantes.
* Fluxo: conectar repositório → Vercel detecta Next.js → build automática (`pnpm build`).
* Variáveis futuras (ex: ANALYTICS_KEY) podem ser adicionadas no dashboard.

## 🔍 Qualidade & Próximos Passos

| Futuro | Descrição |
|--------|-----------|
| Testes | Adicionar vitest / playwright p/ fluxo do formulário |
| Observabilidade | Integrar Sentry ou Loglib |
| Analytics | Métricas de conversão (eventos no CTA / envio) |
| SEO | Imagem social dedicada (1200x630) + Schema.org |
| Internacionalização | Estrutura de mensagens externalizada |

## 📄 Licença

Código desta instância específico do projeto Belz (definir licença interna ou MIT se público). Removidas referências externas do template original.

## 👥 Contato

Em caso de dúvidas técnicas ou evolução: abrir issue ou contatar o time Belz Conecta Saúde.

---

Foco: acessibilidade robusta + performance + clareza narrativa para conversão B2B.

