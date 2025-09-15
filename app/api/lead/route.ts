import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

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
    // Valida variáveis essenciais
    const requiredEnv = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS', 'EMAIL_FROM', 'EMAIL_TO'];
    const missing = requiredEnv.filter(v => !process.env[v]);
    if (missing.length) {
      return NextResponse.json({ ok: false, error: 'config_invalida', missing }, { status: 500 });
    }

    const secure = process.env.SMTP_SECURE === 'true' || Number(process.env.SMTP_PORT) === 465;
    const enableDebug = process.env.DEBUG_SMTP === '1';
    const hostList = (process.env.SMTP_HOSTS || process.env.SMTP_HOST || '')
      .split(',')
      .map(h => h.trim())
      .filter(Boolean);

    if (hostList.length === 0) {
      return NextResponse.json({ ok: false, error: 'config_invalida', missing: ['SMTP_HOSTS|SMTP_HOST'] }, { status: 500 });
    }

    let transporter: nodemailer.Transporter | null = null;
    const attemptErrors: { host: string; error: string; code?: any; responseCode?: any }[] = [];

    for (const host of hostList) {
      try {
        const t = nodemailer.createTransport({
          host,
            port: Number(process.env.SMTP_PORT) || 587,
            secure,
            auth: {
              user: process.env.SMTP_USER,
              pass: process.env.SMTP_PASS,
            },
            logger: enableDebug,
            debug: enableDebug,
        });
        await t.verify();
        transporter = t;
        console.log('[LEAD][SMTP_HOST_OK]', host);
        break;
      } catch (err) {
        const e: any = err;
        attemptErrors.push({ host, error: e?.message || 'erro', code: e?.code, responseCode: e?.responseCode });
        console.error('[LEAD][SMTP_HOST_FAIL]', host, e?.code, e?.responseCode, e?.message);
        if (e?.code === 'EAUTH' || e?.responseCode === 535) {
          // Autenticação falhou neste host — tentar próximo, mas registrar
          continue;
        }
      }
    }

    if (!transporter) {
      const hasAuthFail = attemptErrors.some(e => e.code === 'EAUTH' || e.responseCode === 535);
      return NextResponse.json({ ok: false, error: hasAuthFail ? 'smtp_auth_falhou' : 'smtp_conexao_falhou', attempts: attemptErrors }, { status: 500 });
    }

    const plainText = `Novo lead recebido\n\nNome: ${json.nome}\nEmpresa: ${json.empresa}\nE-mail: ${json.email}\nCargo: ${json.cargo || '-'}\nWhatsapp: ${json.whatsapp || '-'}\nRecebido em: ${new Date().toISOString()}`;

    const html = `<!doctype html><html lang="pt-br"><body style="font-family:Arial,sans-serif;color:#111;padding:16px;line-height:1.5">
      <h2 style="margin:0 0 12px;font-size:18px">Novo lead recebido</h2>
      <table style="border-collapse:collapse;width:100%;max-width:520px">${[
        ['Nome', json.nome],
        ['Empresa', json.empresa],
        ['E-mail', json.email],
        ['Cargo', json.cargo || '-'],
        ['Whatsapp', json.whatsapp || '-'],
        ['Recebido em', new Date().toLocaleString('pt-BR')],
      ].map(([k,v]) => `<tr><td style=\"padding:6px 8px;border:1px solid #e5e7eb;font-weight:600\">${k}</td><td style=\"padding:6px 8px;border:1px solid #e5e7eb\">${v}</td></tr>`).join('')}</table>
      <p style="font-size:12px;color:#555;margin-top:16px">Mensagem automática gerada pela landing Belz Conecta Saúde.</p>
    </body></html>`;

    try {
      const info = await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: process.env.EMAIL_TO,
        subject: 'Novo lead - Belz Conecta Saúde',
        text: plainText,
        html,
        replyTo: json.email,
      });
      console.log('[LEAD][EMAIL_ENVIADO]', info.messageId);
    } catch (err: any) {
        const e: any = err;
        console.error('[LEAD][SMTP_SEND_ERROR]', e);
        if (e?.code === 'EAUTH' || e?.responseCode === 535) {
        return NextResponse.json({ ok: false, error: 'smtp_auth_falhou' }, { status: 500 });
      }
      return NextResponse.json({ ok: false, error: 'envio_email_falhou' }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ ok: false, error: 'erro_interno' }, { status: 500 });
  }
}
