import Reveal from './Reveal';

export default function SectionHead({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <Reveal className="mb-12 max-w-[60ch]">
      <h2 className="mb-4 text-h2">{title}</h2>
      {children ? <p className="text-[1.05rem]">{children}</p> : null}
    </Reveal>
  );
}
