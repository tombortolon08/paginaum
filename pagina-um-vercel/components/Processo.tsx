'use client';

import { useEffect, useRef } from 'react';

const FRAME_COUNT = 192;
const frameSrc = (i: number) => `/frames/frame-${String(i + 1).padStart(4, '0')}.jpg`;

const captions = [
  { title: '01 — Briefing e escopo', text: 'Entendo o que a página precisa fazer e defino as seções antes de escrever qualquer linha de código.' },
  { title: '02 — Desenvolvimento à mão', text: 'Código escrito do zero, testado em celular, tablet e desktop, sem builders e sem peso extra.' },
  { title: '03 — No ar, no seu domínio', text: 'Publicação, domínio no seu nome e um período de ajustes incluso depois da entrega.' },
];

/**
 * Sequência de frames dirigida pelo scroll: a section tem 340vh, o conteúdo
 * fica sticky e a posição do scroll escolhe qual dos 192 quadros é desenhado
 * no canvas. Os quadros ficam em public/frames/.
 */
export default function Processo() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const counterRef = useRef<HTMLParagraphElement | null>(null);
  const barRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const frames: (HTMLImageElement | undefined)[] = [];
    let frameIndex = -1;
    let raf: number | null = null;
    let unmounted = false;

    const nearest = (index: number) => {
      if (frames[index]) return frames[index];
      for (let d = 1; d < FRAME_COUNT; d++) {
        if (frames[index - d]) return frames[index - d];
        if (frames[index + d]) return frames[index + d];
      }
      return undefined;
    };

    const draw = (index: number) => {
      const canvas = canvasRef.current;
      const img = nearest(index);
      if (!canvas || !img || !canvas.width) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
      const w = img.width * scale;
      const h = img.height * scale;
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, (canvas.width - w) / 2, (canvas.height - h) / 2, w, h);
    };

    const resize = () => {
      const canvas = canvasRef.current;
      if (!canvas || !canvas.clientWidth) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(canvas.clientWidth * dpr);
      canvas.height = Math.round(canvas.clientHeight * dpr);
      draw(Math.max(frameIndex, 0));
    };

    const update = () => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const travel = rect.height - window.innerHeight;
      const progress = travel > 0 ? Math.min(Math.max(-rect.top / travel, 0), 1) : 0;
      const index = Math.min(FRAME_COUNT - 1, Math.floor(progress * FRAME_COUNT));

      if (index !== frameIndex) {
        frameIndex = index;
        draw(index);
        if (counterRef.current) {
          counterRef.current.textContent = `${String(index + 1).padStart(3, '0')} / ${FRAME_COUNT}`;
        }
      }
      if (barRef.current) barRef.current.style.width = `${(progress * 100).toFixed(2)}%`;

      const active = progress < 0.3 ? 0 : progress < 0.68 ? 1 : 2;
      section.querySelectorAll<HTMLElement>('[data-cap]').forEach((el) => {
        const on = Number(el.dataset.cap) === active;
        el.style.opacity = on ? '1' : '0';
        el.style.transform = on ? 'translateY(0)' : 'translateY(14px)';
      });
    };

    const onScroll = () => {
      if (raf !== null) return;
      raf = requestAnimationFrame(() => {
        raf = null;
        update();
      });
    };

    // Carrega em ondas (1 de cada 8, depois todos) com 6 requisições simultâneas.
    const order: number[] = [];
    for (const step of [8, 4, 2, 1]) {
      for (let i = 0; i < FRAME_COUNT; i += step) if (!order.includes(i)) order.push(i);
    }
    let cursor = 0;
    const next = () => {
      if (cursor >= order.length || unmounted) return;
      const index = order[cursor++];
      const img = new Image();
      img.decoding = 'async';
      img.onload = () => {
        frames[index] = img;
        draw(Math.max(frameIndex, 0));
        next();
      };
      img.onerror = next;
      img.src = frameSrc(index);
    };
    for (let worker = 0; worker < 6; worker++) next();

    resize();
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', resize);

    return () => {
      unmounted = true;
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', resize);
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={sectionRef} id="processo" className="relative h-[340vh] bg-ink text-white">
      <div className="sticky top-0 h-screen overflow-hidden bg-ink">
        <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 block h-full w-full" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.75)_0%,rgba(0,0,0,0.15)_38%,rgba(0,0,0,0.2)_60%,rgba(0,0,0,0.85)_100%)]" />

        <div className="container-page absolute inset-0 flex flex-col justify-between py-20">
          <div className="flex items-start justify-between gap-8">
            <div className="max-w-[34ch]">
              <p className="mb-4 font-display text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-white/55">O processo</p>
              <h2 className="mb-4 text-h2 text-white">Da tela apagada ao site no ar.</h2>
              <p className="max-w-[40ch] text-[1.05rem] text-white/80">
                Role a página. Cada quadro é um passo do projeto — do primeiro rascunho até a página publicada no seu
                domínio.
              </p>
            </div>
            <p ref={counterRef} className="whitespace-nowrap font-display text-[0.8rem] font-semibold tracking-[0.08em] text-white/50">
              001 / {FRAME_COUNT}
            </p>
          </div>

          <div>
            <div className="relative mb-8 min-h-[8.5rem]">
              {captions.map((caption, index) => (
                <div
                  key={caption.title}
                  data-cap={index}
                  className="absolute bottom-0 left-0 max-w-[42ch] translate-y-[14px] opacity-0 transition-[opacity,transform] duration-500"
                >
                  <h3 className="mb-2 text-[1.5rem] text-white">{caption.title}</h3>
                  <p className="text-[1rem] text-white/75">{caption.text}</p>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-6">
              <div className="relative h-0.5 flex-1 overflow-hidden bg-white/20">
                <div ref={barRef} className="absolute inset-y-0 left-0 w-0 bg-white" />
              </div>
              <a
                href="#contato"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-full border-[1.5px] border-white px-[1.3rem] py-[0.65rem] text-[0.88rem] font-semibold text-white transition-[transform,background,color] hover:-translate-y-0.5 hover:bg-white hover:text-ink"
              >
                Começar meu projeto
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
