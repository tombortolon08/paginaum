export type Service = { title: string; description: string };

export type Plan = {
  name: string;
  description: string;
  value: string;
  period?: string;
  features: string[];
  highlight?: boolean;
  tag?: string;
};

export type StackGroup = 'Front-end' | 'Back-end e CMS' | 'Performance e infra';

export type StackItem = { label: string; group: StackGroup };

export const stackFilters: ('Tudo' | StackGroup)[] = ['Tudo', 'Front-end', 'Back-end e CMS', 'Performance e infra'];

export const stack: StackItem[] = [
  { label: 'HTML5', group: 'Front-end' },
  { label: 'TailWindCSS', group: 'Front-end' },
  { label: 'JavaScript', group: 'Front-end' },
  { label: 'React', group: 'Front-end' },
  { label: 'Design responsivo', group: 'Front-end' },
  { label: 'Node.js', group: 'Back-end e CMS' },
  { label: 'WordPress', group: 'Back-end e CMS' },
  { label: 'Otimização de performance', group: 'Performance e infra' },
  { label: 'Hostinger', group: 'Performance e infra' },
];

export const services: Service[] = [
  {
    title: 'Design e desenvolvimento',
    description:
      'Layout pensado para o seu público, pode ser escrito tanto em HTML, CSS e JavaScript puros — sem builders, sem plugins pesados, quanto plugins mais variaveis e dinamicos como next.js node.js e react',
  },
  {
    title: 'Responsivo de verdade',
    description:
      'Testado em celular, tablet e desktop antes da entrega. A maior parte de quem acessa vem do celular — e é lá que sua página precisa funcionar melhor.',
  },
  {
    title: 'Performance e SEO básico',
    description:
      'Imagens otimizadas, código enxuto e estrutura semântica para carregar rápido e ser encontrado no Google.',
  },
  {
    title: 'Integrações essenciais',
    description: 'Botão de WhatsApp, formulário de contato, redes sociais e pixel de conversão, quando necessário.',
  },
  {
    title: 'Domínio e hospedagem',
    description:
      'Ajudo a registrar seu domínio e colocar o site no ar, com a hospedagem que fizer mais sentido para o seu caso.',
  },
  {
    title: 'Suporte pós-entrega',
    description:
      'Um período de ajustes incluso após a entrega, e planos de manutenção contínua para quem quiser seguir evoluindo o site.',
  },
];

export const landingPlans: Plan[] = [
  {
    name: 'Simples',
    description: 'Uma página, uma seção principal e um formulário ou botão de contato.',
    value: 'R$ 400 – R$ 800',
    features: ['Até 4 seções', 'Formulário ou botão de WhatsApp e links', 'Design responsivo'],
  },
  {
    name: 'Padrão',
    description: 'Página completa, com identidade visual e seções sob medida para o seu negócio.',
    value: 'R$ 1.000 – R$ 1.400',
    highlight: true,
    tag: 'Mais escolhido',
    features: [
      'De 5 a 7 seções',
      'Formulário validado + WhatsApp',
      'Animações e microinterações',
      'Otimização para buscadores',
    ],
  },
  {
    name: 'Premium',
    description: 'Projeto completo, com copywriting orientado a conversão e integrações avançadas.',
    value: 'R$ 1.500 – R$ 2.000',
    features: ['Seções ilimitadas', 'Copywriting incluso', 'Integrações e automações', 'Relatório de performance'],
  },
];

export const maintenancePlans: Plan[] = [
  {
    name: 'Básico',
    description: 'Para manter o site no ar com segurança e sem sustos.',
    value: 'R$ 150 – R$ 300',
    period: '/mês',
    features: ['Backup periódico', 'Monitoramento e segurança', 'Pequenos ajustes de texto'],
  },
  {
    name: 'Standard',
    description: 'Para quem atualiza o site com frequência e quer suporte próximo.',
    value: 'R$ 300 – R$ 600',
    period: '/mês',
    features: ['Tudo do plano Básico', 'Ajustes de conteúdo sob demanda', 'Otimizações pontuais', 'Suporte prioritário'],
  },
  {
    name: 'Premium',
    description: 'Para quem trata a landing page como parte central da estratégia de vendas.',
    value: 'R$ 600 – R$ 1.200',
    period: '/mês',
    features: ['Tudo do plano Standard', 'Testes A/B', 'Otimização de conversão', 'Relatório mensal de resultados'],
  },
];

export type HostingRow = { item: string; anual: string; mensal: string };

export const hostingRows: HostingRow[] = [
  { item: 'Domínio (.com.br / .com)', anual: 'R$ 40 – R$ 80 /ano', mensal: '≈ R$ 3 – R$ 7 /mês' },
];
