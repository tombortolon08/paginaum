'use client';

import { useRef, useState } from 'react';
import Reveal from './Reveal';
import SectionHead from './SectionHead';
import { services } from '@/lib/content';

export default function Servicos() {
  const [active, setActive] = useState(0);
  const panelRef = useRef<HTMLDivElement | null>(null);

  /* Troca de serviço com micro-fade: apaga o painel, troca o conteúdo, volta. */
  function select(index: number) {
    if (index === active) return;
    const panel = panelRef.current;
    if (!panel || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setActive(index);
      return;
    }
    panel.style.opacity = '0';
    panel.style.transform = 'translateY(8px)';
    window.setTimeout(() => {
      setActive(index);
      requestAnimationFrame(() => {
        panel.style.opacity = '1';
        panel.style.transform = 'translateY(0)';
      });
    }, 170);
  }

  const service = services[active];

  return (
    <section id="servicos" className="py-[4.5rem]">
      <div className="container-page">
        <SectionHead title="O que está incluso">Do primeiro rascunho até o site publicado no ar.</SectionHead>

        <Reveal className="grid items-start gap-10 md:grid-cols-2">
          <div className="flex flex-col border-t border-line">
            {services.map((item, index) => {
              const on = index === active;
              return (
                <button
                  key={item.title}
                  type="button"
                  aria-pressed={on}
                  onClick={() => select(index)}
                  className={[
                    'flex w-full items-center gap-4 border-b border-l-[3px] border-b-line py-[1.15rem] text-left font-display text-[1.05rem] font-semibold',
                    'transition-[background,color,padding,border-color] duration-[250ms]',
                    on ? 'border-l-ink bg-light pl-5 pr-4 text-ink' : 'border-l-transparent bg-transparent pl-3 pr-4 text-mid hover:text-ink',
                  ].join(' ')}
                >
                  <span className={`font-display text-[0.75rem] font-semibold tracking-[0.1em] transition-colors ${on ? 'text-ink' : 'text-[#a3a3a3]'}`}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="flex-1 text-left">{item.title}</span>
                  <span className={`text-[1rem] text-ink transition-[opacity,transform] ${on ? 'translate-x-0 opacity-100' : '-translate-x-1.5 opacity-0'}`}>
                    →
                  </span>
                </button>
              );
            })}
          </div>

          <div
            ref={panelRef}
            className="rounded-r-sm border-l-[3px] border-ink bg-light p-10 transition-[opacity,transform] duration-[180ms]"
          >
            <p className="mb-6 font-display text-[0.8rem] font-semibold tracking-[0.18em] text-mid">
              {String(active + 1).padStart(2, '0')} / {String(services.length).padStart(2, '0')}
            </p>
            <h3 className="mb-4 text-[1.5rem]">{service.title}</h3>
            <p className="m-0 text-[1rem]">{service.description}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
