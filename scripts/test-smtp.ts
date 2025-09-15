import nodemailer from 'nodemailer';

async function main() {
  const requiredEnv = ['SMTP_PORT','SMTP_USER','SMTP_PASS','EMAIL_FROM','EMAIL_TO'];
  const missing = requiredEnv.filter(v => !process.env[v]);
  if (!process.env.SMTP_HOSTS && !process.env.SMTP_HOST) missing.push('SMTP_HOSTS|SMTP_HOST');
  if (missing.length) {
    console.error('Variáveis ausentes:', missing.join(','));
    process.exit(1);
  }

  const secure = process.env.SMTP_SECURE === 'true' || Number(process.env.SMTP_PORT) === 465;
  const hosts = (process.env.SMTP_HOSTS || process.env.SMTP_HOST || '')
    .split(',')
    .map(h => h.trim())
    .filter(Boolean);

  console.log('Iniciando teste SMTP');
  console.log('Hosts:', hosts.join(' -> '));
  console.log('Porta:', process.env.SMTP_PORT, 'Secure:', secure);

  for (const host of hosts) {
    console.log('\n-- Testando host:', host, '--');
    const transporter = nodemailer.createTransport({
      host,
      port: Number(process.env.SMTP_PORT) || 587,
      secure,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      logger: process.env.DEBUG_SMTP === '1',
      debug: process.env.DEBUG_SMTP === '1',
    });
    try {
      await transporter.verify();
      console.log('✔ Verificação OK');
    } catch (err: any) {
      console.error('✖ Falha na verificação:', err?.code, err?.responseCode, err?.message);
      continue;
    }

    try {
      const info = await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: process.env.EMAIL_TO,
        subject: 'Teste SMTP - Belz Conecta Saúde',
        text: `Teste de envio de e-mail via host ${host}`,
      });
      console.log('✔ E-mail enviado. ID:', info.messageId);
      console.log('Encerrando após sucesso.');
      process.exit(0);
    } catch (err: any) {
      console.error('✖ Falha ao enviar (host continuará para próximo se houver):', err?.code, err?.responseCode, err?.message);
    }
  }

  console.error('\nNenhum host conseguiu autenticar/enviar. Verifique credenciais ou política do provedor.');
  process.exit(1);
}

main();
