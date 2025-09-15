import { NextResponse } from 'next/server';

interface LeadPayload {
  nome: string;
  cargo?: string;
  empresa: string;
  email: string;
  whatsapp?: string;
  honeypot?: string;
}

function validate(data: any): { valid: boolean; errors?: string[] } {
  const errors: string[] = [];
  if (!data || typeof data !== 'object') return { valid: false, errors: ['payload_invalido'] };
  if (!data.nome || data.nome.length < 2) errors.push('nome');
  if (!data.empresa) errors.push('empresa');
  if (!data.email || !/^([^@\s]+)@([^@\s]+)\.[^@\s]+$/.test(data.email)) errors.push('email');
  if (data.whatsapp && data.whatsapp.replace(/\D/g, '').length < 10) errors.push('whatsapp_formato');
  if (data.honeypot) errors.push('spam_detectado');
  return { valid: errors.length === 0, errors: errors.length ? errors : undefined };
}

export async function POST(req: Request) {
  try {
    const json = (await req.json()) as LeadPayload;
    const { valid, errors } = validate(json);
    if (!valid) {
      return NextResponse.json({ ok: false, errors }, { status: 400 });
    }

    // Simulação de persistência: em produção enviar para DB, CRM ou e-mail
    console.log('[LEAD] Novo lead recebido', {
      nome: json.nome,
      empresa: json.empresa,
      email: json.email,
      cargo: json.cargo,
      whatsapp: json.whatsapp,
      ts: new Date().toISOString(),
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ ok: false, error: 'erro_interno' }, { status: 500 });
  }
}
