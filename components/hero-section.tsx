"use client";

import Image from "next/image";
import { useState, useRef, useCallback, useEffect } from "react";
import BlurText from "./BlurText";
import RotatingText from './RotatingText'
import PageIllustration from "@/components/page-illustration";
import Avatar01 from "@/public/images/avatar-01.jpg";
import Avatar02 from "@/public/images/avatar-02.jpg";
import Avatar03 from "@/public/images/avatar-03.jpg";
import Avatar04 from "@/public/images/avatar-04.jpg";
import Avatar05 from "@/public/images/avatar-05.jpg";
import Avatar06 from "@/public/images/avatar-06.jpg";

// Componente principal da seção Hero (antes em hero-home.tsx)
export default function HeroSection() {
	const [playing, setPlaying] = useState(false);
	// Inicia sem autoplay e com áudio ativo quando o usuário clicar
	const [muted, setMuted] = useState(false);
	const videoRef = useRef<HTMLVideoElement | null>(null);

	const handlePlay = useCallback(() => {
		setPlaying(true);
	}, []);

	const togglePlay = useCallback(() => {
		if (!videoRef.current) return;
		if (videoRef.current.paused) {
			videoRef.current.play();
			setPlaying(true);
		} else {
			videoRef.current.pause();
			setPlaying(false);
		}
	}, []);

	const toggleMute = useCallback(() => {
		if (!videoRef.current) return;
		videoRef.current.muted = !videoRef.current.muted;
		setMuted(videoRef.current.muted);
	}, []);

	useEffect(() => {
		if (playing && videoRef.current) {
			if (videoRef.current.src === "") {
				videoRef.current.src = "/video/apresentacao-belzseguros.mp4";
			}
			videoRef.current.muted = muted;
			const playPromise = videoRef.current.play();
			if (playPromise && typeof playPromise.then === "function") {
				playPromise.catch(() => {/* navegador pode bloquear se interação não reconhecida */});
			}
		}
	}, [playing, muted]);

	return (
		<section id="quem-somos" className="relative scroll-mt-32 md:scroll-mt-40">
			<PageIllustration />
			<div className="w-full px-4 sm:px-8 xl:px-16">
				{/* Hero content em duas colunas no desktop */}
				<div className="pt-28 pb-10 md:pt-36 md:pb-20">
					<div className="grid items-center gap-12 sm:gap-14 lg:grid-cols-12">
						{/* Coluna Texto */}
						<div className="lg:col-span-6 text-center lg:text-left">
							<div className="mb-8">
								<h1 className="font-extrabold tracking-tight text-brand-dark flex flex-col gap-4 leading-tight text-[clamp(1.95rem,4.6vw,3.25rem)]">
									<span className="block">
										<BlurText
											as="span"
											text={"Belz Conecta Saúde"}
											animateBy="letters"
											direction="top"
											className="inline-block"
											delay={60}
											stagger={16}
											durationPerItem={360}
										/>
									</span>
									<span className="block">
										<BlurText
											as="span"
											text={"Parceiro estratégico em"}
											animateBy="letters"
											direction="top"
											className="inline-block"
											delay={220}
											stagger={14}
											durationPerItem={340}
										/>
									</span>
									<span className="inline-flex items-center text-center justify-center lg:justify-start">
										<RotatingText
											texts={['saúde e bem-estar', 'produtividade', 'qualidade de vida', 'prevenção', 'cultura humana', 'saúde mental']}
											mainClassName="px-2 md:px-1 bg-[#011147] text-white overflow-hidden py-1 md:py-1 justify-center rounded-md text-3xl md:text-4xl lg:text-[3.25rem] whitespace-nowrap min-h-[2.6rem] md:min-h-[3.4rem]"
											staggerFrom={"last"}
											initial={{ y: "100%" }}
											animate={{ y: 0, opacity: 1 }}
											exit={{ y: "-120%" , opacity: 0 }}
											staggerDuration={0.06}
											splitLevelClassName="overflow-hidden pb-0.5"
											transition={{ type: "spring", damping: 32, stiffness: 420 }}
											rotationInterval={3500}
										/>
									</span>
								</h1>
							</div>
							<p
								className="mb-8 text-base sm:text-lg text-gray-700 max-w-xl mx-auto lg:mx-0"
							>
								Programa integrado de saúde e qualidade de vida que apoia o RH na prevenção de riscos psicossociais, promoção de hábitos saudáveis e fortalecimento de uma cultura humana, sustentável e produtiva.
							</p>
							<div className="mt-2 flex max-w-md flex-col gap-3 sm:flex-row sm:items-center sm:justify-start lg:justify-start">
								<a
									className="inline-flex w-full sm:w-auto items-center justify-center rounded-lg bg-brand-dark px-6 py-3 text-sm font-semibold text-white shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/70 hover:brightness-110"
									href="#contato"
								>
									<span className="flex items-center">Solicitar Apresentação <span className="ml-1 text-brand-primary/40">→</span></span>
								</a>
								<a
									className="inline-flex w-full sm:w-auto items-center justify-center rounded-lg bg-white px-6 py-3 text-sm font-medium text-brand-dark ring-1 ring-inset ring-brand-dark/10 shadow-sm hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/50"
									href="#pilares"
								>
									Ver Pilares
								</a>
							</div>
						</div>

						{/* Coluna Vídeo */}
						<div className="lg:col-span-6">
							<div className="group relative overflow-hidden rounded-2xl ring-1 ring-inset ring-gray-200 shadow-sm">
								{!playing && (
									<button
										type="button"
										onClick={handlePlay}
										className="absolute inset-0 z-20 flex h-full w-full flex-col items-center justify-center gap-4 bg-brand-dark/80 p-6 text-center text-white transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
										aria-label="Reproduzir vídeo de apresentação"
									>
										<span className="inline-flex items-center gap-3 rounded-full bg-white/10 px-6 py-3 text-sm font-medium backdrop-blur-md ring-1 ring-white/20">
											<svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.5 8.40192C17.8333 9.17172 17.8333 11.0762 16.5 11.846L3 19.6371C1.66667 20.4069 0 19.4431 0 17.9264V2.32151C0 0.804805 1.66667 -0.158945 3 0.610855L16.5 8.40192Z" fill="currentColor" /></svg>
											Assistir apresentação
										</span>
									</button>
								)}
								<div className="absolute inset-0 bg-linear-to-tr from-brand-dark/70 via-brand-primary/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-30 pointer-events-none"></div>
								<video
									ref={videoRef}
									className="aspect-video h-full w-full object-cover"
									loop
									playsInline
									preload="none"
									muted={muted}
									aria-label="Vídeo de apresentação Belz Conecta Saúde"
								>
									Seu navegador não suporta a reprodução de vídeo.
								</video>
								{playing && (
									<div className="absolute bottom-3 right-3 z-30 flex items-center gap-2 rounded-full bg-black/50 px-2 py-1 text-white backdrop-blur-md ring-1 ring-white/10">
										<button
											onClick={togglePlay}
											className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
											aria-label={playing ? "Pausar vídeo" : "Reproduzir vídeo"}
										>
											{playing ? (
												<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 3.5C4.72386 3.5 4.5 3.72386 4.5 4V12C4.5 12.2761 4.72386 12.5 5 12.5H6C6.27614 12.5 6.5 12.2761 6.5 12V4C6.5 3.72386 6.27614 3.5 6 3.5H5Z" fill="currentColor"/><path d="M10 3.5C9.72386 3.5 9.5 3.72386 9.5 4V12C9.5 12.2761 9.72386 12.5 10 12.5H11C11.2761 12.5 11.5 12.2761 11.5 12V4C11.5 3.72386 11.2761 3.5 11 3.5H10Z" fill="currentColor"/></svg>
											) : (
												<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.2 8.46074C13.5333 8.27094 13.5333 7.72906 13.2 7.53926L4.2 2.32992C3.86667 2.14012 3.45 2.41106 3.45 2.79066V13.2093C3.45 13.5889 3.86667 13.8599 4.2 13.6701L13.2 8.46074Z" fill="currentColor"/></svg>
											)}
										</button>
										<button
											onClick={toggleMute}
											className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
											aria-label={muted ? "Ativar som" : "Silenciar"}
										>
											{muted ? (
												<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.49338 3.09947C8.77788 2.93051 9.125 3.13594 9.125 3.46829V12.5317C9.125 12.8641 8.77788 13.0695 8.49338 12.9005L4.375 10.4375H2.5C2.22386 10.4375 2 10.2136 2 9.9375V6.0625C2 5.78636 2.22386 5.5625 2.5 5.5625H4.375L8.49338 3.09947Z" fill="currentColor"/><path d="M11.5303 6.46967C11.2374 6.17678 10.7626 6.17678 10.4697 6.46967C10.1768 6.76256 10.1768 7.23744 10.4697 7.53033L11.4393 8.5L10.4697 9.46967C10.1768 9.76256 10.1768 10.2374 10.4697 10.5303C10.7626 10.8232 11.2374 10.8232 11.5303 10.5303L12.5 9.56066L13.4697 10.5303C13.7626 10.8232 14.2374 10.8232 14.5303 10.5303C14.8232 10.2374 14.8232 9.76256 14.5303 9.46967L13.5607 8.5L14.5303 7.53033C14.8232 7.23744 14.8232 6.76256 14.5303 6.46967C14.2374 6.17678 13.7626 6.17678 13.4697 6.46967L12.5 7.43934L11.5303 6.46967Z" fill="currentColor"/></svg>
											) : (
												<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.49338 3.09947C8.77788 2.93051 9.125 3.13594 9.125 3.46829V12.5317C9.125 12.8641 8.77788 13.0695 8.49338 12.9005L4.375 10.4375H2.5C2.22386 10.4375 2 10.2136 2 9.9375V6.0625C2 5.78636 2.22386 5.5625 2.5 5.5625H4.375L8.49338 3.09947Z" fill="currentColor"/><path d="M11.2682 5.23764C11.5546 4.95102 12.0212 4.95102 12.3079 5.23764C13.4192 6.34899 14.0522 7.82455 14.0522 9.35999C14.0522 10.8954 13.4192 12.371 12.3079 13.4823C12.0212 13.7689 11.5546 13.7689 11.2682 13.4823C10.9816 13.1957 10.9816 12.7291 11.2682 12.4425C12.1449 11.5658 12.6145 10.4917 12.6145 9.35999C12.6145 8.2283 12.1449 7.15423 11.2682 6.27751C10.9816 5.99089 10.9816 5.52427 11.2682 5.23764Z" fill="currentColor"/><path d="M10.2426 6.26324C10.5293 5.97664 10.9959 5.97664 11.2825 6.26324C11.8716 6.85232 12.1979 7.57543 12.1979 8.325C12.1979 9.07456 11.8716 9.79768 11.2825 10.3868C10.9959 10.6734 10.5293 10.6734 10.2426 10.3868C9.95602 10.1002 9.95602 9.63361 10.2426 9.34699C10.5743 9.01531 10.7592 8.67463 10.7592 8.325C10.7592 7.97536 10.5743 7.63469 10.2426 7.303C9.95602 7.01638 9.95602 6.54985 10.2426 6.26324Z" fill="currentColor"/></svg>
											)}
										</button>
									</div>
								)}
								</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
