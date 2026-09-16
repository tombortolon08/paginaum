'use client';

import { useState } from 'react';
import PriceCard from './PriceCard';
import SectionHead from './SectionHead';
import { hostingRows, landingPlans, maintenancePlans } from '@/lib/content';

type Period = 'anual' | 'mensal';

export default function Orcamentos() {
  const [period, setPeriod] = useState<Period>('anual');

  return (
    <section id="orcamentos" className="bg-light py-[4.5rem]">
      <div className="container-page">
        <SectionHead title="Orçamentos">
          Valores de referência para o mercado brasileiro em 2026. O valor final varia com a complexidade do projeto.
        </SectionHead>

        <div className="mb-[4.5rem]">
          <h3 className="mb-8 text-[1.25rem]">
            Landing page <span className="font-body text-[0.95rem] font-normal text-mid">(valor único)</span>
          </h3>
          <div className="grid gap-6 lg:grid-cols-3">
            {landingPlans.map((plan) => (
              <PriceCard key={plan.name} plan={plan} />
            ))}
          </div>
        </div>

        <div className="mb-[4.5rem]">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <h3 className="text-[1.25rem]">Domínio e hospedagem</h3>

            <div className="inline-flex rounded-full border border-line bg-white p-1" role="group" aria-label="Alternar período de exibição dos preços">
              {(['anual', 'mensal'] as Period[]).map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setPeriod(value)}
                  aria-pressed={period === value}
                  className={[
                    'rounded-full border-0 px-[1.1rem] py-2 text-[0.85rem] font-semibold transition-[background,color]',
                    period === value ? 'bg-ink text-white' : 'bg-transparent text-mid',
                  ].join(' ')}
                >
                  {value === 'anual' ? 'Anual' : 'Mensal'}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto rounded-md border border-line bg-white">
            <table className="w-full min-w-[480px] border-collapse">
              <thead>
                <tr>
                  <th scope="col" className="border-b border-line bg-light p-6 text-left font-display text-[0.8rem] font-semibold text-mid">Item</th>
                  <th scope="col" className="border-b border-line bg-light p-6 text-left font-display text-[0.8rem] font-semibold text-mid">Valor</th>
                </tr>
              </thead>
              <tbody>
                {hostingRows.map((row) => (
                  <tr key={row.item}>
                    <th scope="row" className="p-6 text-left text-[0.95rem] font-medium text-ink">{row.item}</th>
                    <td className="p-6 text-left text-[0.95rem]">
                      {period === 'anual' ? row.anual : <span className="text-mid">{row.mensal}</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-6 text-[0.85rem]">
            Domínio e hospedagem são contratados em seu nome — você fica com a titularidade da sua página em qualquer
            situação.
          </p>
        </div>

        <div>
          <h3 className="mb-8 text-[1.25rem]">
            Manutenção mensal <span className="font-body text-[0.95rem] font-normal text-mid">(opcional)</span>
          </h3>
          <div className="grid gap-6 lg:grid-cols-3">
            {maintenancePlans.map((plan) => (
              <PriceCard key={plan.name} plan={plan} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
