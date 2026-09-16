const social = [
  { href: 'https://instagram.com', label: 'Instagram' },
  { href: 'https://www.linkedin.com/in/tom-bortolon-freire-4a1870407/', label: 'LinkedIn' },
  { href: 'https://github.com/tombortolon08', label: 'GitHub' },
];

export default function Footer() {
  return (
    <footer className="bg-ink py-12">
      <div className="container-page flex flex-wrap items-center justify-between gap-6">
        <a href="#topo" className="font-display text-[1.2rem] font-semibold tracking-[-0.01em] text-white">
          Página<span className="text-mid">.</span>Um
        </a>

        <div className="flex gap-6">
          {social.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[0.9rem] text-light transition-colors hover:text-white hover:underline"
            >
              {item.label}
            </a>
          ))}
        </div>

        <p className="m-0 w-full border-t border-dark pt-6 text-left text-[0.85rem] text-mid">
          © {new Date().getFullYear()} Página Um. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
