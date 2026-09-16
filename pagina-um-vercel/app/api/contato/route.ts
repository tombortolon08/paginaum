import { NextResponse } from 'next/server';
import { validateContact, type ContactPayload } from '@/lib/validation';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  let payload: Partial<ContactPayload> = {};
  try {
    payload = (await request.json()) as Partial<ContactPayload>;
  } catch {
    return NextResponse.json({ ok: false, error: 'JSON inválido' }, { status: 400 });
  }

  const errors = validateContact(payload);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  const lead = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    nome: payload.nome!.trim(),
    email: payload.email!.trim(),
    telefone: payload.telefone!.trim(),
    projeto: payload.projeto!.trim(),
    mensagem: payload.mensagem!.trim(),
  };

  // Sem banco: o lead vai para os logs da função (Vercel > Deployments > Logs).
  // Para receber por e-mail, troque este console.log por Resend/Nodemailer.
  console.log('[contato] novo lead', lead);

  return NextResponse.json({ ok: true, id: lead.id }, { status: 201 });
}
