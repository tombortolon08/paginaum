'use client';

import { useState } from 'react';
import { useReveal } from '@/hooks/useReveal';
import {
  CONTACT_FIELDS,
  validateContact,
  validateField,
  type ContactErrors,
  type ContactField,
  type ContactPayload,
} from '@/lib/validation';

const EMPTY: ContactPayload = { nome: '', email: '', telefone: '', projeto: '', mensagem: '' };

export default function Contato() {
  const ref = useReveal<HTMLDivElement>();
  const [values, setValues] = useState<ContactPayload>(EMPTY);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  function update(field: ContactField, value: string) {
    setValues((v) => ({ ...v, [field]: value }));
    // Revalida em tempo real apenas se o campo já estava com erro (igual ao script.js).
    setErrors((prev) => (prev[field] ? { ...prev, [field]: validateField(field, value) } : prev));
  }

  function blur(field: ContactField) {
    setErrors((prev) => ({ ...prev, [field]: validateField(field, values[field]) }));
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const found = validateContact(values);
    setErrors(found);

    const firstError = CONTACT_FIELDS.find((field) => found[field]);
    if (firstError) {
      setStatus('idle');
      document.getElementById(firstError)?.focus();
      return;
    }

    setStatus('sending');
    try {
      const response = await fetch('/api/contato', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => ({}))) as { errors?: ContactErrors };
        if (data.errors) setErrors(data.errors);
        setStatus('error');
        return;
      }

      setValues(EMPTY);
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  }

  const fieldClass = (field: ContactField) =>
    [
      'rounded-sm border-[1.5px] px-4 py-3 font-body text-[0.95rem] text-dark transition-colors focus:border-ink',
      errors[field] ? 'border-ink bg-light' : 'border-line bg-white',
    ].join(' ');

  return (
    <section id="contato" className="py-[4.5rem]">
      <div ref={ref} className="reveal container-page grid items-start gap-[4.5rem] md:grid-cols-[0.9fr_1.1fr]">
        <div>
          <h2 className="mb-4 text-h2">Vamos conversar sobre o seu projeto?</h2>
          <p className="text-[1.05rem]">
            Conta um pouco sobre o que você precisa e eu retorno com um orçamento personalizado. Se preferir, chama
            direto no WhatsApp pelo botão no canto da tela.
          </p>
        </div>

        <form onSubmit={onSubmit} noValidate className="grid gap-6 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="nome" className="text-[0.85rem] font-semibold text-ink">Nome</label>
            <input
              id="nome" name="nome" type="text" autoComplete="name" required
              value={values.nome}
              onChange={(e) => update('nome', e.target.value)}
              onBlur={() => blur('nome')}
              className={fieldClass('nome')}
            />
            <span className="min-h-[1em] text-[0.8rem] text-mid">{errors.nome}</span>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-[0.85rem] font-semibold text-ink">E-mail</label>
            <input
              id="email" name="email" type="email" autoComplete="email" required
              value={values.email}
              onChange={(e) => update('email', e.target.value)}
              onBlur={() => blur('email')}
              className={fieldClass('email')}
            />
            <span className="min-h-[1em] text-[0.8rem] text-mid">{errors.email}</span>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="telefone" className="text-[0.85rem] font-semibold text-ink">WhatsApp</label>
            <input
              id="telefone" name="telefone" type="tel" autoComplete="tel" placeholder="(00) 00000-0000" required
              value={values.telefone}
              onChange={(e) => update('telefone', e.target.value)}
              onBlur={() => blur('telefone')}
              className={fieldClass('telefone')}
            />
            <span className="min-h-[1em] text-[0.8rem] text-mid">{errors.telefone}</span>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="projeto" className="text-[0.85rem] font-semibold text-ink">Tipo de projeto</label>
            <select
              id="projeto" name="projeto" required
              value={values.projeto}
              onChange={(e) => update('projeto', e.target.value)}
              onBlur={() => blur('projeto')}
              className={fieldClass('projeto')}
            >
              <option value="" disabled>Selecione uma opção</option>
              <option value="simples">Landing page simples</option>
              <option value="padrao">Landing page padrão</option>
              <option value="premium">Landing page premium</option>
              <option value="nao-sei">Ainda não sei</option>
            </select>
            <span className="min-h-[1em] text-[0.8rem] text-mid">{errors.projeto}</span>
          </div>

          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <label htmlFor="mensagem" className="text-[0.85rem] font-semibold text-ink">Conte um pouco sobre o projeto</label>
            <textarea
              id="mensagem" name="mensagem" rows={4} required
              value={values.mensagem}
              onChange={(e) => update('mensagem', e.target.value)}
              onBlur={() => blur('mensagem')}
              className={`min-h-[110px] resize-y ${fieldClass('mensagem')}`}
            />
            <span className="min-h-[1em] text-[0.8rem] text-mid">{errors.mensagem}</span>
          </div>

          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <button type="submit" className="btn btn--primary self-start" disabled={status === 'sending'}>
              {status === 'sending' ? 'Enviando…' : 'Enviar mensagem'}
            </button>

            {status === 'sent' ? (
              <p role="status" className="mt-4 rounded-sm bg-light px-6 py-4 text-[0.9rem] font-medium text-ink">
                Mensagem enviada! Vou responder em breve pelo e-mail ou WhatsApp informado.
              </p>
            ) : null}

            {status === 'error' ? (
              <p role="status" className="mt-4 rounded-sm bg-light px-6 py-4 text-[0.9rem] font-medium text-ink">
                Não foi possível enviar agora. Tente novamente ou chame no WhatsApp.
              </p>
            ) : null}
          </div>
        </form>
      </div>
    </section>
  );
}
