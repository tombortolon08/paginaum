'use client';

import { useEffect } from 'react';

const EASE_MS_PER_PX = 0.45;
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/**
 * Navegação animada entre seções: intercepta qualquer link #ancora, faz o scroll
 * com easing (descontando o header sticky) e sublinha o link da seção atual.
 */
export function useAnchorNavigation() {
  useEffect(() => {
    let raf: number | null = null;

    const headerOffset = () => {
      const header = document.querySelector('header');
      return header ? header.getBoundingClientRect().height : 0;
    };

    const onClick = (event: MouseEvent) => {
      const link = (event.target as HTMLElement | null)?.closest?.('a[href^="#"]') as HTMLAnchorElement | null;
      if (!link) return;
      const id = link.getAttribute('href')!.slice(1);
      const target = id ? document.getElementById(id) : document.body;
      if (!target) return;

      event.preventDefault();
      const destination = Math.max(0, window.scrollY + target.getBoundingClientRect().top - headerOffset() + 1);

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        window.scrollTo(0, destination);
        return;
      }

      const start = window.scrollY;
      const distance = destination - start;
      if (Math.abs(distance) < 2) return;
      const duration = Math.min(1100, Math.max(450, Math.abs(distance) * EASE_MS_PER_PX));
      const t0 = performance.now();

      if (raf !== null) cancelAnimationFrame(raf);
      const step = (now: number) => {
        const t = Math.min((now - t0) / duration, 1);
        window.scrollTo(0, start + distance * easeInOutCubic(t));
        raf = t < 1 ? requestAnimationFrame(step) : null;
      };
      raf = requestAnimationFrame(step);
    };

    const updateActive = () => {
      const links = document.querySelectorAll<HTMLAnchorElement>('header nav a[href^="#"]');
      if (!links.length) return;
      const offset = headerOffset() + 24;
      let activeId = 'topo';
      links.forEach((link) => {
        const section = document.getElementById(link.getAttribute('href')!.slice(1));
        if (section && section.getBoundingClientRect().top - offset <= 0) activeId = section.id;
      });
      links.forEach((link) => {
        const on = link.getAttribute('href') === `#${activeId}`;
        link.setAttribute('data-active', String(on));
      });
    };

    let scrollRaf: number | null = null;
    const onScroll = () => {
      if (scrollRaf !== null) return;
      scrollRaf = requestAnimationFrame(() => {
        scrollRaf = null;
        updateActive();
      });
    };

    // Recalcula depois que a geometria existe (fontes/imagens já dimensionadas).
    updateActive();
    requestAnimationFrame(updateActive);
    window.addEventListener('load', updateActive);
    const settle = window.setTimeout(updateActive, 250);
    document.addEventListener('click', onClick);
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.clearTimeout(settle);
      window.removeEventListener('load', updateActive);
      document.removeEventListener('click', onClick);
      window.removeEventListener('scroll', onScroll);
      if (raf !== null) cancelAnimationFrame(raf);
      if (scrollRaf !== null) cancelAnimationFrame(scrollRaf);
    };
  }, []);
}
