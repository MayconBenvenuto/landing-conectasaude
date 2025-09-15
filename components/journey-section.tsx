import Image from "next/image";
import Stripes from "@/public/images/stripes-dark.svg";

// Seção Jornada (antes em cta.tsx)
export default function JourneySection() {
	return (
		<section id="jornada" className="scroll-mt-32 md:scroll-mt-40">
			<div className="pb-25 w-full px-4 sm:px-8 xl:px-16">
				<div
					className="relative overflow-hidden rounded-2xl text-center shadow-xl before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:rounded-2xl before:bg-brand-dark"
				>
					{/* Glow */}
					<div
						className="absolute bottom-0 left-1/2 -z-10 -translate-x-1/2 translate-y-1/2"
						aria-hidden="true"
					>
						<div className="h-56 w-[480px] rounded-full border-[20px] border-brand-primary blur-3xl" />
					</div>
					{/* Stripes illustration */}
						<div
							className="pointer-events-none absolute left-1/2 top-0 -z-10 -translate-x-1/2 transform"
							aria-hidden="true"
						>
							<Image
								className="max-w-none"
								src={Stripes}
								width={1920}
								height={1080}
								alt="Stripes"
							/>
						</div>
					<div className="px-4 py-12 md:px-12 md:py-20">
						<h2 className="mb-6 border-y text-3xl font-bold text-high-contrast [border-image:linear-gradient(to_right,transparent,var(--color-brand-primary),transparent)1] md:mb-6 md:text-4xl">
							Jornada de Saúde Integrada
						</h2>
						{/* Grid de Ações da Jornada */}
						<div className="mb-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
							{gridItems.map(item => (
								<article key={item.title} className="group rounded-xl border border-white/5 bg-white/5 p-4 backdrop-blur-sm transition hover:bg-white/10">
									<div className="mb-3 overflow-hidden rounded-lg relative h-40 w-full">
										<Image src={item.image} alt={item.title} fill sizes="(max-width:768px) 100vw, (max-width:1024px) 50vw, 33vw" className="object-cover object-center transition duration-300 group-hover:scale-[1.03]" />
									</div>
									<h3 className="mb-1 font-semibold text-brand-light">{item.title}</h3>
									<p className="text-sm text-high-contrast-muted">{item.text}</p>
								</article>
							))}
						</div>
						<p className="mx-auto mb-10 max-w-2xl text-high-contrast-muted">Estrutura de 12 meses adaptável ao porte e realidade da sua empresa: diagnóstico, planejamento, execução, engajamento e avaliação de impacto — tudo documentado para compliance e decisões estratégicas.</p>
						<div className="mx-auto max-w-xs sm:flex sm:max-w-none sm:justify-center">
							<a
								className="btn group mb-4 w-full bg-linear-to-t from-brand-primary to-brand-dark bg-[length:100%_100%] bg-[bottom] text-white shadow-sm hover:bg-[length:100%_150%] sm:mb-0 sm:w-auto"
								href="#contato"
							>
								<span className="relative inline-flex items-center">
									Falar com Especialista
									<span className="ml-1 tracking-normal text-blue-300 transition-transform group-hover:translate-x-0.5">
										-&gt;
									</span>
								</span>
							</a>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

const gridItems = [
	{
		image: "/acoes/medico.png",
		title: "Avaliação Médica",
		text: "Consultas periódicas, orientação preventiva e encaminhamentos baseados em evidências para reduzir riscos e afastamentos."
	},
	{
		image: "/acoes/psicologo.png",
		title: "Apoio Psicológico",
		text: "Atendimento individual e grupos de apoio promovendo escuta qualificada, prevenção de burnout e fortalecimento emocional."
	},
	{
		image: "/acoes/nutricionista.png",
		title: "Orientação Nutricional",
		text: "Avaliação e planos alimentares educativos para apoio à energia, imunidade e redução de fatores de risco metabólicos."
	},
	{
		image: "/acoes/pilates.png",
		title: "Pilates Corporativo",
		text: "Fortalecimento postural e mobilidade funcional reduzindo dores recorrentes e melhorando desempenho diário."
	},
	{
		image: "/acoes/yoga.png",
		title: "Yoga & Mindfulness",
		text: "Respiração, equilíbrio e redução de estresse para ampliar foco, clareza mental e presença consciente no trabalho."
	},
	{
		image: "/acoes/ginastica-laboral.png",
		title: "Ginástica Laboral",
		text: "Sessões curtas de alongamento, mobilidade e ativação diminuindo fadiga, lesões e aumentando energia produtiva."
	}
];
