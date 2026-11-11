import heroMixCutout from '../assets/images/v2/hero-mix-cutout.webp';
import siteHeroConstruction from '../assets/images/site-hero-construction.webp';
import siteLogistics from '../assets/images/site-logistics.webp';

export const heroConfig = {
  eyebrow: 'LOCAÇÃO DE EQUIPAMENTOS PARA CONSTRUÇÃO, OBRAS E SERVIÇOS',
  headlineLine1: 'TUDO QUE SUA OBRA',
  headlineLine2: 'PRECISA, VOCÊ',
  headlineLine3: 'ENCONTRA AQUI.',
  description:
    'Equipamentos profissionais para construção, reformas e serviços. Catálogo organizado para você encontrar a máquina certa e solicitar a locação sem burocracia.',
  primaryCtaLabel: 'Encontrar equipamento',
  secondaryCtaLabel: 'Solicitar orçamento',
  calloutTitle: 'CATÁLOGO MODULAR PARA SUA OBRA',
  calloutText:
    'Ferramentas elétricas, concreto, demolição, compactação, corte, andaimes, limpeza, jardinagem e energia.',
  bottomLeftMetric: 'COMPLETA',
  bottomLeftSub: 'Linha para obra e manutenção',
  bottomRightValue: 'LOCAÇÃO ÁGIL',
  bottomRightSub: 'Diária, semanal ou mensal sob consulta',
  centerpieceImage: heroMixCutout,
  centerpieceAlt:
    'Composição com betoneira, rolo compactador compacto, martelete demolidor, placa vibratória e gerador de energia para locação',
  backgroundSceneImage: siteHeroConstruction,
  backgroundSceneAlt: 'Canteiro de obras civis com equipamentos em operação',
};

export const categoriesSectionConfig = {
  title: 'ENCONTRE O EQUIPAMENTO IDEAL',
  subtitle:
    'Navegue pelas categorias disponíveis no estoque e filtre imediatamente os equipamentos para a fase da sua obra ou serviço.',
};

export const catalogSectionConfig = {
  eyebrow: 'CATÁLOGO INTELIGENTE',
  title: 'EQUIPAMENTOS MAIS PROCURADOS',
  subtitle:
    'Busque por nome, marca ou aplicação, filtre por categoria e envie o equipamento selecionado direto para o orçamento ou WhatsApp.',
};

export const differentialsConfig = {
  eyebrow: 'DIFERENCIAIS',
  title: 'POR QUE ALUGAR COM A GENTE?',
  description:
    'Estruturamos cada locação para gerar economia frente à compra de máquinas, manter a obra produtiva e oferecer atendimento técnico direto.',
  sceneImage: siteLogistics,
  sceneImageAlt: 'Equipamentos de construção organizados em pátio logístico para expedição',
  sceneCaption: 'Logística e revisão técnica: equipamentos testados antes da retirada ou entrega',
  items: [
    {
      icon: 'wrench' as const,
      title: 'Equipamentos Revisados',
      description:
        'Inspeção funcional de motor, elétrica, impacto e acessórios antes de cada saída.',
    },
    {
      icon: 'wallet' as const,
      title: 'Economia na Obra',
      description:
        'Pague apenas pelo período de utilização sem imobilizar capital ou arcar com manutenção corretiva.',
    },
    {
      icon: 'layers' as const,
      title: 'Variedade em Estoque',
      description:
        'Do martelete e betoneira ao gerador, andaime e lavadora industrial no mesmo fornecedor.',
    },
    {
      icon: 'headphones' as const,
      title: 'Atendimento Especializado',
      description:
        'Orientação prática para escolher potência, voltagem e capacidade ideais para cada serviço.',
    },
  ],
};

export const processConfig = {
  eyebrow: 'COMO FUNCIONA',
  title: 'ALUGUE EM POUCOS PASSOS',
  subtitle:
    'Um processo direto do catálogo ao canteiro para você contratar ferramentas e equipamentos com agilidade.',
  steps: [
    {
      number: '01',
      title: 'Escolha o equipamento',
      description:
        'Explore as categorias ou utilize a busca do catálogo para localizar a máquina ou ferramenta ideal.',
    },
    {
      number: '02',
      title: 'Solicite orçamento',
      description:
        'Envie o item selecionado pelo formulário ou WhatsApp já identificado com marca e referência.',
    },
    {
      number: '03',
      title: 'Combine o período',
      description:
        'Defina a modalidade de cobrança (diária, semanal ou mensal) e confirme a disponibilidade.',
    },
    {
      number: '04',
      title: 'Receba conforme condições',
      description:
        'Retire no balcão ou receba diretamente na obra conforme as condições combinadas de entrega.',
    },
  ],
};

export const brandsSectionConfig = {
  eyebrow: 'MARCAS E PARCEIROS',
  title: 'TRABALHAMOS COM EQUIPAMENTOS DE QUALIDADE',
  subtitle:
    'Espaço configurável para destacar fabricantes presentes no portfólio da locadora (ative ou oculte conforme o estoque do cliente).',
};

export const rentalPeriods = [
  'Diária',
  'Semanal',
  'Quinzenal',
  'Mensal',
  'Período sob consulta',
] as const;
