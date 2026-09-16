export type ContactField = 'nome' | 'email' | 'telefone' | 'projeto' | 'mensagem';

export type ContactPayload = Record<ContactField, string>;

export type ContactErrors = Partial<Record<ContactField, string>>;

export const CONTACT_FIELDS: ContactField[] = ['nome', 'email', 'telefone', 'projeto', 'mensagem'];

export const validators: Record<ContactField, (value: string) => boolean> = {
  nome: (value) => value.trim().length >= 3,
  email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()),
  telefone: (value) => value.replace(/\D/g, '').length >= 10,
  projeto: (value) => value.trim() !== '',
  mensagem: (value) => value.trim().length >= 10,
};

export const errorMessages: Record<ContactField, string> = {
  nome: 'Digite seu nome completo.',
  email: 'Digite um e-mail válido.',
  telefone: 'Digite um telefone válido com DDD.',
  projeto: 'Selecione o tipo de projeto.',
  mensagem: 'Conte um pouco mais sobre o projeto (mínimo 10 caracteres).',
};

export function validateField(field: ContactField, value: string): string | undefined {
  return validators[field](value) ? undefined : errorMessages[field];
}

export function validateContact(payload: Partial<ContactPayload>): ContactErrors {
  const errors: ContactErrors = {};
  for (const field of CONTACT_FIELDS) {
    const message = validateField(field, payload[field] ?? '');
    if (message) errors[field] = message;
  }
  return errors;
}
