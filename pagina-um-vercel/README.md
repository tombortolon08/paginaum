# Página Um — pronto para a Vercel

App Next.js 15 (App Router) + TypeScript + Tailwind, com o formulário de contato
rodando como função serverless. **Esta pasta é a raiz do projeto** — não precisa
configurar Root Directory na Vercel.

## Enviar para a Vercel

Opção 1 — CLI:

```bash
npm i -g vercel
cd pagina-um-vercel
vercel        # preview
vercel --prod # produção
```

Opção 2 — Git: suba esta pasta como repositório no GitHub e clique em
"Add New… > Project" na Vercel. Framework detectado: Next.js. Nenhuma variável
de ambiente é necessária.

## Rodar local

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # mesma build que a Vercel executa
```

## O que tem aqui

```
app/
  layout.tsx            fontes (Inter + Poppins) e metadata/SEO
  page.tsx              monta as seções
  globals.css           reset + Tailwind + reveal
  api/contato/route.ts  POST /api/contato (validação no servidor)
components/             Header, Hero, Processo, Sobre, Servicos, Orcamentos, Contato, Footer, WhatsAppFloat
hooks/
  useAnchorNavigation.ts  scroll animado entre seções + link ativo
  useReveal.ts            animação ao rolar (IntersectionObserver)
lib/
  content.ts            conteúdo tipado (serviços, planos, stack)
  validation.ts         schema usado pelo formulário e pela rota da API
public/frames/          192 quadros da sequência do scroll (frame-0001…0192.jpg)
```

## Leads do formulário

Hoje o `POST /api/contato` valida e registra o lead nos logs da função
(Vercel > Deployments > Logs). Para receber por e-mail, adicione Resend ou
Nodemailer dentro de `app/api/contato/route.ts`.

## Peso dos frames

`public/frames/` tem ~10 MB em JPG. Funciona, mas converter para WebP/AVIF
reduz bastante o tráfego da section "Processo".
