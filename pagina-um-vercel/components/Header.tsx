'use client';

import { useState } from 'react';
import { useAnchorNavigation } from '@/hooks/useAnchorNavigation';

const links = [
  { href: '#topo', label: 'Início' },
  { href: '#processo', label: 'Processo' },
  { href: '#servicos', label: 'Serviços' },
  { href: '#orcamentos', label: 'Orçamentos' },
  { href: '#contato', label: 'Contato' },
];

/**
 * O corte para o menu hambúrguer é 900px (não o md: de 768px do Tailwind):
 * abaixo disso os 5 links + o CTA não cabem na mesma linha e o header deforma.
 * A nav mobile usa top-full, então ela acompanha a altura real do header.
 */
export default function Header() {
  const [open, setOpen] = useState(false);
  useAnchorNavigation();

  return (
    <header id="topo" className="sticky top-0 z-[100] border-b border-line bg-white/90 backdrop-blur-[10px]">
      <div className="container-page flex items-center justify-between gap-6 py-4">
        <a href="#topo" className="shrink-0 font-display text-[1.2rem] font-semibold tracking-[-0.01em] text-ink">
          Página<span className="text-mid">.</span>Um
        </a>

        <nav
          id="nav"
          className={[
            'absolute left-0 right-0 top-full flex flex-col items-start border-b border-line bg-white px-8 pb-6 pt-4 transition-[opacity,transform]',
            open ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0 pointer-events-none',
            'min-[900px]:pointer-events-auto min-[900px]:static min-[900px]:ml-auto min-[900px]:mr-7 min-[900px]:flex-row min-[900px]:flex-nowrap min-[900px]:gap-7 min-[900px]:translate-y-0 min-[900px]:border-0 min-[900px]:bg-transparent min-[900px]:p-0 min-[900px]:opacity-100',
          ].join(' ')}
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="group relative w-full whitespace-nowrap border-b border-line py-4 text-[0.95rem] font-medium text-dark transition-colors last:border-b-0 data-[active=true]:text-ink min-[900px]:w-auto min-[900px]:border-0 min-[900px]:py-1"
            >
              {link.label}
              <span className="absolute -bottom-0.5 left-0 hidden h-[1.5px] w-0 bg-ink transition-[width] duration-300 group-hover:w-full group-data-[active=true]:w-full min-[900px]:block" />
            </a>
          ))}
        </nav>

        <a
          href="#contato"
          className="btn btn--primary btn--small hidden shrink-0 min-[900px]:inline-flex"
        >
          Fazer orçamento
        </a>

        <button
          type="button"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
          aria-controls="nav"
          onClick={() => setOpen((v) => !v)}
          className="ml-4 flex shrink-0 flex-col gap-[5px] border-0 bg-transparent p-2 min-[900px]:hidden"
        >
          <span className={`h-0.5 w-[22px] bg-ink transition-transform ${open ? 'translate-y-[7px] rotate-45' : ''}`} />
          <span className={`h-0.5 w-[22px] bg-ink transition-opacity ${open ? 'opacity-0' : ''}`} />
          <span className={`h-0.5 w-[22px] bg-ink transition-transform ${open ? '-translate-y-[7px] -rotate-45' : ''}`} />
        </button>
      </div>
    </header>
  );
}
