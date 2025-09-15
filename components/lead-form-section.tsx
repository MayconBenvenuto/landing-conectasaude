"use client";
import { useState } from "react";

interface FormState {
	nome: string;
	cargo: string;
	empresa: string;
	email: string;
	whatsapp: string;
}

// Seção Formulário de Lead (antes em lead-form.tsx)
export default function LeadFormSection() {
	const [form, setForm] = useState<FormState>({
		nome: "",
		cargo: "",
		empresa: "",
		email: "",
		whatsapp: "",
	});
	const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
	const [errors, setErrors] = useState<string[]>([]);
	const [serverErrorCode, setServerErrorCode] = useState<string | null>(null);
	const [honeypot, setHoneypot] = useState("");

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		const { name, value } = e.target;
		setForm((f) => ({ ...f, [name]: value }));
	}

	function validate() {
		if (!form.nome || !form.email || !form.empresa) return false;
		if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) return false;
		return true;
	}

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		setErrors([]);
		setServerErrorCode(null);
		if (!validate()) {
			setStatus("error");
			return;
		}
		setStatus("sending");
		try {
			const res = await fetch('/api/lead', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ ...form, honeypot })
			});
			let data: any = {};
			try { data = await res.json(); } catch {}
			if (!res.ok) {
				setErrors(data.errors || []);
				setServerErrorCode(data.error || 'erro');
				setStatus('error');
				return;
			}
			setStatus('success');
		} catch (err) {
			setServerErrorCode('network');
			setStatus('error');
		}
	}

	return (
		<section id="contato" className="py-20 w-full px-4 sm:px-8 xl:px-16 scroll-mt-32 md:scroll-mt-40">
			<div className="mx-auto max-w-7xl">
				<div className="mb-14 text-center max-w-3xl mx-auto">
					<h2 className="mb-5 text-pretty bg-clip-text text-transparent bg-linear-to-r from-blue-700 via-blue-600 to-sky-500 text-3xl font-bold md:text-4xl tracking-tight">
						Fale com nosso time
					</h2>
					<p className="text-gray-600 text-lg leading-relaxed">
						Preencha ou chame direto nosso time. Estamos prontos para construir saúde corporativa estratégica para sua empresa.
					</p>
				</div>
				<div className="grid gap-12 lg:gap-16 lg:grid-cols-2 items-start">
					{/* Coluna Contato Direto */}
					<div className="space-y-8">
						<div className="rounded-2xl border border-gray-200 bg-white/70 backdrop-blur-sm p-8 shadow-sm">
							<h3 className="text-xl font-semibold mb-4">Contato direto</h3>
							<p className="text-gray-600 mb-6 text-sm leading-relaxed">
								Preferir falar agora? Use um dos canais abaixo. Nosso atendimento responde em horário comercial.
							</p>
							<ul className="space-y-5">
								<li>
									<a
										className="group flex gap-4 rounded-xl border border-green-200 bg-white/70 p-4 pr-6 transition hover:bg-green-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
										href="https://wa.me/5581991554660?text=Ol%C3%A1!%20Tenho%20interesse%20em%20conhecer%20o%20programa%20Belz%20Conecta%20Sa%C3%BAde.%20Poderia%20me%20enviar%20a%20apresenta%C3%A7%C3%A3o%3F"
										target="_blank"
										rel="noopener noreferrer"
										aria-label="Iniciar conversa no WhatsApp com mensagem pré-preenchida"
									>
										<span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-linear-to-br from-green-500 to-green-600 text-white shadow-sm transition group-hover:scale-105">
											<svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.52 3.48A11.84 11.84 0 0012 0C5.37 0 .02 5.18.02 11.57c0 2.04.54 4.03 1.57 5.79L0 24l6.86-1.79a12.2 12.2 0 005.09 1.13h.01c6.63 0 12-5.18 12-11.57 0-3.09-1.32-5.99-3.44-8.29zM12 21.53h-.01a10.7 10.7 0 01-4.57-1.06l-.33-.16-4.07 1.06 1.09-3.89-.22-.36a9.73 9.73 0 01-1.47-5.05C2.42 6.3 6.73 2.2 12 2.2c2.63 0 5.1 1.02 6.96 2.86a9.68 9.68 0 012.88 6.51c0 5.1-4.31 9.46-9.82 9.96zm5.35-7.42c-.29-.15-1.71-.84-1.97-.94-.27-.1-.47-.15-.66.15-.19.29-.76.94-.93 1.13-.17.19-.34.21-.63.06-.29-.15-1.23-.45-2.34-1.43-.86-.76-1.44-1.7-1.61-1.99-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.51.15-.17.19-.29.29-.48.1-.19.05-.36-.03-.51-.08-.15-.66-1.57-.91-2.15-.24-.58-.48-.5-.66-.51h-.57c-.19 0-.5.07-.76.36-.26.29-1 1-1 2.43 0 1.43 1.02 2.81 1.16 3 .15.19 2 3.14 4.92 4.37.69.3 1.23.48 1.65.61.69.22 1.32.19 1.82.12.55-.08 1.71-.7 1.95-1.38.24-.67.24-1.24.17-1.38-.07-.13-.26-.21-.55-.36z" /></svg>
										</span>
										<div className="text-left">
											<p className="text-xs uppercase tracking-wide text-gray-500 font-medium">WhatsApp</p>
											<p className="text-base font-semibold text-brand-dark">+55 81 99155-4660 <span className="ml-2 inline-block rounded bg-green-100 px-2 py-0.5 align-middle text-[10px] font-medium text-green-700">rápido</span></p>
											<p className="mt-1 text-xs text-gray-500">Resposta rápida em horário comercial.</p>
										</div>
									</a>
								</li>
								<li className="flex gap-4">
									<span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-linear-to-br from-blue-600 to-blue-500 text-white shadow-sm">
										<svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
									</span>
									<div>
										<p className="text-xs uppercase tracking-wide text-gray-500 font-medium">Telefone</p>
										<a href="tel:+558140425678" className="text-base font-medium text-brand-dark hover:text-blue-600 transition" aria-label="Ligar para Belz Conecta Saúde">
											+55 (81) 4042.5678
										</a>
										<p className="text-xs text-gray-500 mt-1">Horário: 09h às 18h (seg-sex).</p>
									</div>
								</li>
								<li className="flex gap-4">
									<span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-linear-to-br from-sky-500 to-cyan-500 text-white shadow-sm">
										<svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0Z"/><circle cx="12" cy="10" r="3"/></svg>
									</span>
									<div>
										<p className="text-xs uppercase tracking-wide text-gray-500 font-medium">Endereço</p>
										<p className="text-base font-medium text-brand-dark">
											AR. Sen. José Henrique, 231<br/>Ilha do Leite, Recife - PE<br/>50070-460
										</p>
										<p className="text-xs text-gray-500 mt-1">Agende uma visita conosco.</p>
									</div>
								</li>
							</ul>
						</div>
					</div>

					{/* Coluna Formulário + Mapa */}
					<div className="space-y-8">
						<form
							onSubmit={handleSubmit}
							className="grid gap-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-10"
						>
							{/* Honeypot anti-spam */}
							<div className="hidden">
								<label htmlFor="empresa_site">Deixe em branco</label>
								<input id="empresa_site" name="empresa_site" value={honeypot} onChange={e => setHoneypot(e.target.value)} tabIndex={-1} autoComplete="off" />
							</div>
							<div className="grid gap-6 md:grid-cols-2">
								<div>
									<label className="mb-1 block text-sm font-medium" htmlFor="nome">
										Nome*
									</label>
									<input
										id="nome"
										name="nome"
										type="text"
										value={form.nome}
										onChange={handleChange}
										className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
										required
									/>
								</div>
								<div>
									<label className="mb-1 block text-sm font-medium" htmlFor="cargo">
										Cargo
									</label>
									<input
										id="cargo"
										name="cargo"
										type="text"
										value={form.cargo}
										onChange={handleChange}
										className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
									/>
								</div>
								<div>
									<label className="mb-1 block text-sm font-medium" htmlFor="empresa">
										Empresa*
									</label>
									<input
										id="empresa"
										name="empresa"
										type="text"
										value={form.empresa}
										onChange={handleChange}
										className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
										required
									/>
								</div>
								<div>
									<label className="mb-1 block text-sm font-medium" htmlFor="email">
										E-mail corporativo*
									</label>
									<input
										id="email"
										name="email"
										type="email"
										value={form.email}
										onChange={handleChange}
										className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
										required
									/>
								</div>
								<div className="md:col-span-2">
									<label className="mb-1 block text-sm font-medium" htmlFor="whatsapp">
										WhatsApp
									</label>
									<input
										id="whatsapp"
										name="whatsapp"
										type="tel"
										placeholder="(00) 00000-0000"
										value={form.whatsapp}
										onChange={handleChange}
										className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
									/>
								</div>
							</div>
							<div className="flex items-center justify-between flex-wrap gap-4">
								<p className="text-xs text-gray-500">* Campos obrigatórios. Não compartilhamos seus dados com terceiros.</p>
								<button
									type="submit"
									disabled={status === "sending" || status === "success"}
									className="btn-sm bg-linear-to-t from-blue-600 to-blue-500 text-white disabled:opacity-60"
								>
									{status === "sending" && "Enviando..."}
									{status === "idle" && "Enviar"}
									{status === "success" && "Enviado!"}
									{status === "error" && "Revisar dados"}
								</button>
							</div>
							{status === "success" && (
								<div className="rounded-md bg-green-50 px-3 py-2 text-sm text-green-700 border border-green-200">
									Dados recebidos! Em breve entraremos em contato.
								</div>
							)}
							{status === "error" && (
								<div className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700 border border-red-200 space-y-1">
									<p>
										{serverErrorCode === 'config_invalida' && 'Falha de configuração do servidor. Tente novamente mais tarde.'}
										{serverErrorCode === 'smtp_conexao_falhou' && 'Não foi possível conectar ao servidor de e-mail.'}
										{serverErrorCode === 'envio_email_falhou' && 'Erro ao enviar o e-mail. Tente novamente.'}
										{serverErrorCode === 'erro_interno' && 'Erro interno do servidor.'}
										{serverErrorCode === 'network' && 'Falha de rede. Verifique sua conexão.'}
										{!serverErrorCode && 'Verifique os campos obrigatórios e o formato do e-mail.'}
									</p>
									{errors.length > 0 && (
										<ul className="list-disc pl-4">
											{errors.map(er => <li key={er}>{er}</li>)}
										</ul>
									)}
								</div>
							)}
						</form>
						<div className="overflow-hidden rounded-2xl border border-gray-200 shadow-sm aspect-[16/10] w-full bg-gray-100">
							<iframe
								title="Localização Belz Conecta Saúde"
								className="w-full h-full"
								style={{ border: 0 }}
								loading="lazy"
								allowFullScreen
								referrerPolicy="no-referrer-when-downgrade"
								src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.255905103624!2d-34.8910008!3d-8.159250899999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7ab18e9f5a4cdd1%3A0x4d4f3a1c7b84e1b9!2sAv.%20Sen.%20Jos%C3%A9%20Henrique%2C%20231%20-%20Ilha%20do%20Leite%2C%20Recife%20-%20PE%2C%2050070-460!5e0!3m2!1spt-BR!2sbr!4v1699999999999"
							></iframe>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
