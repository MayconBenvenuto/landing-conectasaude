"use client";

import Image from "next/image";
// Substitui avatar estático anterior pelo logo da empresa para representar o perfil institucional
import LogoAvatar from "@/public/images-conecta/logo-fundotransparente.png";
import SectionTitle from "./section-title";
import { useEffect, useRef, useState } from "react";

// URLs de posts do Instagram fornecidos pelo usuário
const INSTAGRAM_POSTS = [
	"https://www.instagram.com/p/DOMnguAD9t7/",
	"https://www.instagram.com/p/DOHWTejEoP8/",
	"https://www.instagram.com/p/DM_KV9Yy4rW/",
];

// Componente de embed lazy para cada post
function InstagramEmbed({ url, index }: { url: string; index: number }) {
	const containerRef = useRef<HTMLDivElement | null>(null);
	const [loaded, setLoaded] = useState(false);
	const [scriptInjected, setScriptInjected] = useState(false);

	useEffect(() => {
		const el = containerRef.current;
		if (!el) return;

		// Carrega imediatamente os dois primeiros para percepção de velocidade
		if (index < 2) {
			setLoaded(true);
			return;
		}

		// IntersectionObserver com margem maior para pré-carregar antes de entrar
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						setLoaded(true);
						observer.disconnect();
						break;
					}
				}
			},
			{ rootMargin: "400px 0px" }
		);
		observer.observe(el);
		return () => observer.disconnect();
	}, [index]);

	useEffect(() => {
		if (!loaded || scriptInjected) return;
		// Reprocessa com debounce mínimo para agrupar múltiplos loads simultâneos
		let timeout: any;
		function inject() {
			if (!(window as any).instgrm) {
				const s = document.createElement("script");
				s.src = "https://www.instagram.com/embed.js";
				s.async = true;
				s.onload = () => {
					setScriptInjected(true);
					// @ts-expect-error lib externa
					window.instgrm?.Embeds?.process();
				};
				document.body.appendChild(s);
			} else {
				setScriptInjected(true);
				// @ts-expect-error
				window.instgrm.Embeds.process();
			}
		}
		timeout = setTimeout(inject, 50);
		return () => clearTimeout(timeout);
	}, [loaded, scriptInjected]);

	return (
		<div
			ref={containerRef}
			className="relative flex flex-col items-center justify-center rounded-lg border border-gray-200 bg-white p-3 sm:p-4 shadow-sm transition-colors dark:border-gray-700 dark:bg-gray-900 w-full overflow-hidden aspect-[9/16] min-h-[430px]"
		>
			{!loaded && (
				<div className="flex h-full w-full flex-col items-center justify-center gap-3 text-center">
					<span className="text-sm text-gray-500">Carregando depoimento {index + 1}…</span>
					<div className="h-6 w-6 animate-spin rounded-full border-2 border-brand-primary border-t-transparent" aria-hidden="true" />
				</div>
			)}
			{loaded && (
				<blockquote
					className="instagram-media w-full max-w-[360px]"
					data-instgrm-permalink={url}
					data-instgrm-version="14"
					// Atributos de acessibilidade
					aria-label={`Depoimento em vídeo do Instagram número ${index + 1}`}
				></blockquote>
			)}
		</div>
	);
}

// Seção Benefícios com depoimentos em vídeo do Instagram
export default function BenefitsSection() {
	return (
		<section id="beneficios" className="scroll-mt-32 md:scroll-mt-40 w-full px-4 sm:px-8 xl:px-16">
			<div className="py-12 md:py-20">
				{/* Cabeçalho limitado para melhor legibilidade */}
				<div className="mx-auto max-w-2xl text-center space-y-6">
					<div className="relative inline-flex">
						<svg
							className="absolute -left-6 -top-2 -z-10"
							width={40}
							height={49}
							viewBox="0 0 40 49"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							aria-hidden="true"
						>
							<path
								d="M22.7976 -0.000136375L39.9352 23.4746L33.4178 31.7234L13.7686 11.4275L22.7976 -0.000136375ZM9.34947 17.0206L26.4871 40.4953L19.9697 48.7441L0.320491 28.4482L9.34947 17.0206Z"
								fill="#D1D5DB"
							/>
						</svg>
						<Image
							className="rounded-full ring-2 ring-offset-2 ring-brand-primary/60 dark:ring-brand-primary/70"
							src={LogoAvatar}
							width={48}
							height={48}
							alt="Logo institucional"
						/>
					</div>
					<SectionTitle
						className="my-0"
						textClassName="text-pretty text-2xl font-bold text-gray-900 dark:text-gray-100"
					>
						Resultsados reais, histórias que inspiram
					</SectionTitle>
					<p className="text-balance text-sm text-gray-600 dark:text-gray-400 max-w-prose mx-auto">
						Veja alguns depoimentos em vídeo publicados no Instagram destacando impacto em engajamento, saúde
						mental e cultura organizacional. Os embeds carregam apenas quando entram na área visível para manter
						a performance.
					</p>
				</div>
				{/* Grade em largura maior independente do limite do texto */}
				<div className="mt-14 mx-auto max-w-6xl grid gap-12 md:gap-14 lg:gap-16 xl:gap-20 sm:grid-cols-2 lg:grid-cols-3 place-items-stretch">
					{INSTAGRAM_POSTS.map((url, i) => (
						<InstagramEmbed key={url} url={url} index={i} />
					))}
				</div>
				<p className="sr-only" aria-live="polite">
					{`Foram carregados ${INSTAGRAM_POSTS.length} depoimentos do Instagram conforme navegação.`}
				</p>
			</div>
		</section>
	);
}
