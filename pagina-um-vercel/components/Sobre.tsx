'use client';

import { useState } from 'react';
import Reveal from './Reveal';
import { stack, stackFilters } from '@/lib/content';

export default function Sobre() {
  const [filter, setFilter] = useState<(typeof stackFilters)[number]>('Tudo');
  const visible = stack.filter((item) => filter === 'Tudo' || item.group === filter);

  return (
    <section id="sobre" className="bg-light py-[4.5rem]">
      <Reveal className="container-page grid items-start gap-12 md:grid-cols-[1.3fr_1fr]">
        <div>
          <h2 className="mb-4 text-h2">Um desenvolvedor. Um projeto de cada vez.</h2>
          <p className="max-w-[60ch]">
            Trabalho sozinho — e é por isso que consigo ser rápido. Cada landing page é escrita à mão, sem construtores
            visuais e sem código extra que deixa o site pesado. O resultado é uma página que carrega rápido, fica bem em
            qualquer tela e foi pensada desde o início para levar quem visita até a ação que você precisa: comprar,
            preencher um formulário ou chamar no WhatsApp.
          </p>
        </div>

        <div>
          <p className="mb-4 font-display text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-mid">
            Com o que eu trabalho
          </p>

          <div className="mb-6 flex flex-wrap gap-2">
            {stackFilters.map((option) => {
              const on = option === filter;
              return (
                <button
                  key={option}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setFilter(option)}
                  className={[
                    'whitespace-nowrap rounded-full border px-[0.9rem] py-[0.4rem] text-[0.8rem] font-semibold transition-[background,color,border-color]',
                    on ? 'border-ink bg-ink text-white' : 'border-[#d4d4d4] bg-transparent text-mid hover:border-ink hover:text-ink',
                  ].join(' ')}
                >
                  {option}
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap content-start gap-2.5">
            {stack.map((item) => {
              const on = filter === 'Tudo' || item.group === filter;
              return (
                <span
                  key={item.label}
                  className={[
                    'whitespace-nowrap rounded-full border px-4 py-2 text-[0.85rem] font-medium transition-[opacity,transform,color,border-color] duration-300',
                    on ? 'border-dark bg-white text-dark opacity-100' : 'scale-[0.96] border-line text-[#b8b8b8] opacity-55',
                  ].join(' ')}
                >
                  {item.label}
                </span>
              );
            })}
          </div>

          <p className="mt-6 text-[0.8rem]">
            {visible.length} de {stack.length} tecnologias{filter === 'Tudo' ? '' : ` em ${filter}`}
          </p>
        </div>
      </Reveal>
    </section>
  );
}
