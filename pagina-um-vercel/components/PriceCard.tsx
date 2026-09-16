import Reveal from './Reveal';
import type { Plan } from '@/lib/content';

export default function PriceCard({ plan }: { plan: Plan }) {
  const highlight = Boolean(plan.highlight);

  return (
    <Reveal
      className={[
        'relative flex flex-col rounded-md p-8 transition-[transform,box-shadow,border-color] duration-[350ms] ease-[cubic-bezier(0.2,0.7,0.2,1)]',
        highlight
          ? 'border border-ink bg-ink hover:-translate-y-3 hover:scale-[1.015] hover:shadow-[0_34px_60px_-28px_rgba(0,0,0,0.6)]'
          : 'border border-line bg-white hover:-translate-y-2 hover:border-dark hover:shadow-[0_26px_50px_-26px_rgba(0,0,0,0.3)]',
      ].join(' ')}
    >
      {plan.tag ? (
        <p className="absolute -top-[13px] left-8 m-0 rounded-full bg-white px-3 py-1 text-[0.75rem] font-semibold text-ink">
          {plan.tag}
        </p>
      ) : null}

      <h4 className={`mb-4 text-[1.1rem] ${highlight ? 'text-white' : ''}`}>{plan.name}</h4>
      <p className={`min-h-[3.2em] text-[0.9rem] ${highlight ? 'text-white' : ''}`}>{plan.description}</p>

      <p className={`mb-6 font-display text-[1.5rem] font-semibold ${highlight ? 'text-white' : 'text-ink'}`}>
        {plan.value}
        {plan.period ? <span className="text-[0.9rem] font-normal"> {plan.period}</span> : null}
      </p>

      <ul className="mb-8 flex-grow">
        {plan.features.map((feature) => (
          <li
            key={feature}
            className={`relative mb-2 pl-[1.4em] text-[0.9rem] ${highlight ? 'text-light' : 'text-mid'}`}
          >
            <span
              className={`absolute left-0 top-[0.55em] h-1.5 w-1.5 rounded-full ${highlight ? 'bg-white' : 'bg-ink'}`}
            />
            {feature}
          </li>
        ))}
      </ul>

      <a href="#contato" className={`btn btn--small self-start ${highlight ? 'btn--primary bg-white text-ink hover:bg-light' : 'btn--ghost'}`}>
        Solicitar
      </a>
    </Reveal>
  );
}
