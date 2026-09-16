import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Processo from '@/components/Processo';
import Sobre from '@/components/Sobre';
import Servicos from '@/components/Servicos';
import Orcamentos from '@/components/Orcamentos';
import Contato from '@/components/Contato';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';

export default function Home() {
  return (
    <>
      <Header />
      <main id="conteudo">
        <Hero />
        <Processo />
        <Sobre />
        <Servicos />
        <Orcamentos />
        <Contato />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
