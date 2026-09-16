const WHATSAPP_URL = 'https://wa.me/AGFYROLAZVTK1';

export default function WhatsAppFloat() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Conversar no WhatsApp"
      className="fixed bottom-8 right-8 z-[90] flex h-[58px] w-[58px] items-center justify-center rounded-full bg-ink text-white shadow-float transition-[transform,background] hover:scale-105 hover:bg-dark"
    >
      <svg viewBox="0 0 32 32" width="28" height="28" fill="currentColor" aria-hidden="true">
        <path d="M16.02 3C9.4 3 4 8.4 4 15.02c0 2.4.7 4.63 1.9 6.5L4 29l7.66-1.85a11.9 11.9 0 0 0 4.36.82h.01c6.62 0 12.02-5.4 12.02-12.02C28.05 8.4 22.65 3 16.02 3Zm0 21.9c-1.5 0-2.95-.38-4.22-1.1l-.3-.18-4.55 1.1 1.13-4.44-.2-.32a9.9 9.9 0 0 1-1.5-5.24c0-5.47 4.45-9.92 9.94-9.92a9.9 9.9 0 0 1 9.93 9.93c0 5.47-4.46 9.17-10.23 10.17Zm5.44-7.44c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.65-2.05-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.6-.92-2.2-.24-.57-.49-.5-.67-.5h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.5s1.07 2.9 1.22 3.1c.15.2 2.1 3.2 5.08 4.5.7.3 1.26.48 1.68.62.7.22 1.35.19 1.85.12.57-.09 1.76-.72 2-1.4.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35Z" />
      </svg>
    </a>
  );
}
