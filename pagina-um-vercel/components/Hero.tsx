import BrowserMock from './BrowserMock';

export default function Hero() {
  return (
    <section className="pb-[4.5rem] pt-[7rem]">
      <div className="container-page grid items-center gap-[4.5rem] md:grid-cols-[1.05fr_0.95fr]">
        <div className="order-2 md:order-1">
          <h1 className="mb-4 text-h1 font-bold">Sua landing page no ar, em poucos dias.</h1>
          <p className="max-w-[46ch] text-[1.1rem]">
            Desenvolvo landing pages rápidas e objetivas para quem precisa vender, captar contato ou lançar um produto —
            sem enrolação, sem código desnecessário, sem depender de plataforma nenhuma.
          </p>

          <div className="my-8 mb-12 flex flex-wrap gap-4">
            <a href="#contato" className="btn btn--primary">Solicitar orçamento</a>
            <a href="#orcamentos" className="btn btn--ghost">Ver planos e preços</a>
          </div>

          <ul className="flex flex-wrap gap-12 border-t border-line pt-6">
            <li className="text-[0.85rem] text-mid">
              <strong className="block font-display text-[1.3rem] font-semibold text-ink">100%</strong>
              Templates Ágeis e construtivos
            </li>
            <li className="text-[0.85rem] text-mid">
              <strong className="block font-display text-[1.3rem] font-semibold text-ink">7 dias</strong>
              prazo médio de entrega
            </li>
          </ul>
        </div>

        <div className="order-1 mx-auto w-full max-w-[420px] md:order-2 md:max-w-none" aria-hidden="true">
          <BrowserMock />
        </div>
      </div>
    </section>
  );
}
