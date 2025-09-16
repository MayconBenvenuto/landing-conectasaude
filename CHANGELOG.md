# CHANGELOG.md

## [Unreleased]

### Added

- Animação de scroll para títulos principais de seção via novo componente `SectionTitle` (encapsula `ScrollFloat`).

### Changed

- Substituídos `<h2>` estáticos em múltiplas seções (benefícios, pilares, jornada, diagnóstico/riscos, indicadores & impacto, conformidade, parceiros e formulário de contato) para usar animação coordenada com scroll.
- Refinada animação de títulos: reduzido y inicial, removido ease "back" em contexto de scrub (agora `ease: none`), introduzido `scrub: 0.6` para suavização e leve `rotateX` inicial para profundidade sutil.

### Notes

- Mantida semântica de heading (`<h2>`), preservando acessibilidade. Animação baseada em GSAP `ScrollTrigger` somente quando elemento entra na janela (scrub) e respeita `prefers-reduced-motion` por ser transformação simples, sem loop contínuo.
- Adicionado early-return para `prefers-reduced-motion` evitando qualquer transformação e garantindo acessibilidade.

## [4.0.0] - 2025-02-04

- Updgrade to Tailwind v4
- Update dependencies

## [3.1.0] - 2024-12-08

- Update dependencies + Upgrade to Next.js 15

## [3.0.2] - 2024-08-23

- Remove unneeded scroll handler

## [3.0.1] - 2024-06-20

- Minor styling changes + Prettify code

## [3.0.0] - 2024-06-18

- Redesign the entire template

## [2.4.0] - 2023-12-08

Update to Next.js 14
Update dependencies

## [2.3.2] - 2023-10-04

Update Twitter icon
Update dependencies

## [2.3.0] - 2023-06-20

Fix issue with Google Fonts

## [2.2.1] - 2023-06-13

Fix minor issue

## [2.2.0] - 2023-05-31

Update dependencies and fix some issues

## [2.1.0] - 2023-05-07

Modal video improvements

## [2.0.0] - 2023-03-31

Conversion to Next.js

## [1.3.3] - 2023-03-28

- Fix video

## [1.3.2] - 2023-03-28

- Add self-hosted video

## [1.3.1] - 2023-02-13

- Update dependencies

## [1.3.0] - 2022-07-15

- Update dependencies
- Update React to v18
- Replace Sass with CSS files

## [1.1.0] - 2022-01-27

- Replace CRA (Create React App) with Vite
- Remove Craco
- Update dependencies

## [1.0.1] - 2020-10-19

Fix issue with testimonail image on mobile

## [1.0.0] - 2020-10-15

First release
