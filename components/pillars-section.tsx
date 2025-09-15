import Image from "next/image";
import type { ReactNode } from "react";
import PlanetImg from "@/public/images/planet.png";
import PlanetOverlayImg from "@/public/images/planet-overlay.svg";
import PlanetTagImg01 from "@/public/images/planet-tag-01.png";
import PlanetTagImg02 from "@/public/images/planet-tag-02.png";
import PlanetTagImg03 from "@/public/images/planet-tag-03.png";
import PlanetTagImg04 from "@/public/images/planet-tag-04.png";

// Seção Pilares (antes em features-planet.tsx)
export default function PillarsSection() {
	return (
		<section id="pilares" className="relative scroll-mt-32 md:scroll-mt-40 before:absolute before:inset-0 before:-z-20 before:bg-brand-dark">
			<div className="w-full px-4 sm:px-8 xl:px-16">
				<div className="py-12 md:py-20">
					<div className="mx-auto max-w-3xl pb-16 text-center md:pb-20">
						<h2 className="text-3xl font-bold text-high-contrast md:text-4xl">
							Pilares do Belz Conecta Saúde
						</h2>
							<p className="mt-4 text-high-contrast-muted text-lg">Estratégia integrada que une prevenção, cuidado contínuo e fortalecimento cultural para gerar bem-estar mensurável e sustentável.</p>
					</div>
					<div className="pb-16 md:pb-20">
						<div className="text-center">
							<div className="relative inline-flex rounded-full before:absolute before:inset-0 before:-z-10 before:scale-[.85] before:animate-[pulse_4s_cubic-bezier(.4,0,.6,1)_infinite] before:bg-linear-to-b before:from-brand-dark before:to-brand-primary/70 before:blur-3xl after:absolute after:inset-0 after:rounded-[inherit] after:[background:radial-gradient(closest-side,var(--color-brand-primary),transparent)]">
								<Image
									className="rounded-full bg-gray-900"
									src={PlanetImg}
									width={400}
									height={400}
									alt="Planet"
								/>
								<div className="pointer-events-none" aria-hidden="true">
									<Image
										className="absolute -right-64 -top-20 z-10 max-w-none"
										src={PlanetOverlayImg}
										width={789}
										height={755}
										alt=""
										aria-hidden="true"
									/>
									<div>
										<Image
											className="absolute -left-28 top-16 z-10 animate-[float_4s_ease-in-out_infinite_both] opacity-80 transition-opacity duration-500"
											src={PlanetTagImg01}
											width={253}
											height={56}
											alt=""
											aria-hidden="true"
										/>
										<Image
											className="absolute left-56 top-7 z-10 animate-[float_4s_ease-in-out_infinite_1s_both] opacity-30 transition-opacity duration-500"
											src={PlanetTagImg02}
											width={241}
											height={56}
											alt=""
											aria-hidden="true"
										/>
										<Image
											className="absolute -left-20 bottom-24 z-10 animate-[float_4s_ease-in-out_infinite_2s_both] opacity-25 transition-opacity duration-500"
											src={PlanetTagImg03}
											width={243}
											height={56}
											alt=""
											aria-hidden="true"
										/>
										<Image
											className="absolute bottom-32 left-64 z-10 animate-[float_4s_ease-in-out_infinite_3s_both] opacity-80 transition-opacity duration-500"
											src={PlanetTagImg04}
											width={251}
											height={56}
											alt=""
											aria-hidden="true"
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="grid overflow-hidden sm:grid-cols-2 lg:grid-cols-3 *:relative *:p-6 *:before:absolute *:before:bg-gray-800 *:before:[block-size:100vh] *:before:[inline-size:1px] *:before:[inset-block-start:0] *:before:[inset-inline-start:-1px] *:after:absolute *:after:bg-gray-800 *:after:[block-size:1px] *:after:[inline-size:100vw] *:after:[inset-block-start:-1px] *:after:[inset-inline-start:0] md:*:p-10">
									{pillars.map(p => (
							<article key={p.title}>
								<h3 className="mb-2 flex items-center space-x-2 font-medium text-high-contrast">
												<span className="text-blue-400" aria-hidden="true">{p.icon()}</span>
									<span>{p.title}</span>
								</h3>
								<p className="text-[15px] text-high-contrast-muted">{p.text}</p>
							</article>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}

interface Pillar { title: string; text: string; icon: () => ReactNode }
const pillars: Pillar[] = [
	{ title: "Gestão de Riscos Psicossociais", text: "Mapeamento, diagnóstico e planos de ação alinhados à NR 1 para mitigação de fatores de risco e fortalecimento do ambiente saudável.", icon: iconSquares },
	{ title: "Saúde Mental", text: "Acolhimento psicológico, grupos de apoio, educação contínua e prevenção de estresse, ansiedade e burnout.", icon: iconHead },
	{ title: "Saúde Física", text: "Promoção de atividade física, orientação nutricional e prevenção de doenças com apoio multidisciplinar.", icon: iconShield },
	{ title: "Habilidades Socioemocionais", text: "Treinamentos em comunicação não violenta, inteligência emocional e resolução de conflitos para líderes e equipes.", icon: iconUsers },
	{ title: "Reconhecimento & Cultura", text: "Programas que valorizam conquistas, engajam e reforçam um clima organizacional positivo e inclusivo.", icon: iconGift },
	{ title: "Monitoramento Contínuo", text: "Indicadores, relatórios periódicos e avaliação de impacto para decisões estratégicas baseadas em evidência.", icon: iconClock },
];

// Ícones inline (simple placeholders)
function iconSquares() { return (<svg className="fill-blue-500" xmlns="http://www.w3.org/2000/svg" width={16} height={16}><path d="M2 4a2 2 0 0 1 2-2h3v12H4a2 2 0 0 1-2-2V4Zm7-2h3a2 2 0 0 1 2 2v3H9V2Zm5 7h-5v5h5a2 2 0 0 0 2-2V9ZM9 7V5H7v2h2Z"/></svg>); }
function iconHead() { return (<svg className="fill-blue-500" xmlns="http://www.w3.org/2000/svg" width={16} height={16}><path d="M8 0a5 5 0 0 0-5 5v3.278A2 2 0 0 0 3 9a3 3 0 1 0 3 3h4a3 3 0 1 0 3-3c-.35 0-.687.06-1 .17V5a5 5 0 0 0-5-5Z"/></svg>); }
function iconShield() { return (<svg className="fill-blue-500" xmlns="http://www.w3.org/2000/svg" width={16} height={16}><path d="M8 1a7 7 0 0 0-7 7v4a5 5 0 0 0 5 5h1V9H4V8a4 4 0 0 1 8 0v1H9v8h1a5 5 0 0 0 5-5V8a7 7 0 0 0-7-7Z"/></svg>); }
function iconUsers() { return (<svg className="fill-blue-500" xmlns="http://www.w3.org/2000/svg" width={16} height={16}><path d="M8 4a4 4 0 0 0-4 4v1H3a2 2 0 1 0 0 4h1v1a4 4 0 0 0 8 0v-1h1a2 2 0 1 0 0-4h-1V8a4 4 0 0 0-4-4Z"/></svg>); }
function iconGift() { return (<svg className="fill-blue-500" xmlns="http://www.w3.org/2000/svg" width={16} height={16}><path d="M13 2H3a1 1 0 0 0-1 1v5h2V4h8v8H9v2h4a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1ZM2 12v4l3-2 3 2v-4H2Z"/></svg>); }
function iconClock() { return (<svg className="fill-blue-500" xmlns="http://www.w3.org/2000/svg" width={16} height={16}><path d="M8 0a8 8 0 1 0 3.89 15l2.6.867a1 1 0 0 0 1.274-1.274l-.867-2.6A8 8 0 0 0 8 0Zm0 2a6 6 0 1 1 0 12A6 6 0 0 1 8 2Zm1 1H7v5h5V6H9V3Z"/></svg>); }
