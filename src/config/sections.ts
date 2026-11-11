import heroExcavator from '../assets/images/hero-excavator.webp';
import siteHeroConstruction from '../assets/images/site-hero-construction.webp';
import siteLogistics from '../assets/images/site-logistics.webp';
import siteEarthwork from '../assets/images/site-earthwork.webp';

export const heroConfig = {
  headlineTop: 'LOCAÇÃO E SERVIÇOS',
  headlineRightTop: 'MÁQUINAS',
  headlineRightBottom: 'PESADAS',
  regionSubtitle: 'Para obras civis, terraplanagem e infraestrutura',
  description:
    'Solicite seu orçamento técnico. Nossa equipe indica o equipamento ideal para a produtividade e o prazo da sua obra.',
  primaryCtaLabel: 'Solicitar Orçamento',
  secondaryCtaLabel: 'Explorar Frota',
  topRightBadgeLabel: 'DISPONIBILIDADE',
  topRightBadgeValue: 'IMEDIATA',
  topRightBadgeNote: 'Modelos diários, semanais e mensais',
  calloutTitle: 'FROTA REVISADA EM CAMPO',
  calloutText:
    'Equipamentos inspecionados com checklist preventivo para máxima disponibilidade e desempenho na obra.',
  bottomLeftMetric: 'ÁGIL',
  bottomLeftSub: 'Atendimento comercial',
  bottomRightValue: 'LINHA PESADA',
  bottomRightSub: 'Escavação, carga, elevação e compactação',
  centerpieceImage: heroExcavator,
  centerpieceAlt:
    'Escavadeira hidráulica pesada amarela e grafite em destaque para locação',
  backgroundSceneImage: siteHeroConstruction,
  backgroundSceneAlt:
    'Máquinas pesadas e escavadeiras operando em canteiro de obras civis e infraestrutura',
};

export const categoriesSectionConfig = {
  title: 'EQUIPAMENTOS PARA QUALQUER DEMANDA',
  subtitle:
    'Selecione a categoria ideal para a fase da sua obra e visualize imediatamente os equipamentos disponíveis na frota.',
};

export const differentialsConfig = {
  eyebrow: 'PADRÃO OPERACIONAL',
  title: 'DIFERENCIAIS QUE EVITAM PARADAS NO CANTEIRO',
  description:
    'Cada contrato é estruturado para reduzir o tempo improdutivo da obra com inspeção mecânica prévia, documentação em dia e resposta técnica direta.',
  sceneImage: siteHeroConstruction,
  sceneImageAlt:
    'Escavadeiras hidráulicas atuando em obra civil de infraestrutura com estruturas em concreto',
  sceneCaption: 'Operação em campo: terraplanagem, fundações e infraestrutura pesada',
  items: [
    {
      icon: 'wrench' as const,
      title: 'Manutenção Preventiva',
      description:
        'Checklist técnico de sistemas hidráulicos, filtros, pneus e esteiras antes de cada mobilização.',
    },
    {
      icon: 'truck' as const,
      title: 'Logística de Mobilização',
      description:
        'Transporte programado com prancha própria ou parceira alinhado ao cronograma de entrada da obra.',
    },
    {
      icon: 'shield' as const,
      title: 'Conformidade e Segurança',
      description:
        'Equipamentos preparados conforme normas aplicáveis (NR-12, NR-18) com laudos e documentação.',
    },
    {
      icon: 'clock' as const,
      title: 'Substituição Assistida',
      description:
        'Suporte técnico em campo e plano de contingência para manter a frente de serviço ativa.',
    },
    {
      icon: 'fileCheck' as const,
      title: 'Contratos Flexíveis',
      description:
        'Modalidades por diária, semana, quinzena ou contrato mensal com renovação simplificada.',
    },
    {
      icon: 'headphones' as const,
      title: 'Dimensionamento Técnico',
      description:
        'Apoio consultivo para escolher capacidade de caçamba, alcance e tonelagem adequados ao solo.',
    },
  ],
};

export const processConfig = {
  eyebrow: 'COMO FUNCIONA',
  title: 'LOCAÇÃO DESCOMPLICADA EM 4 ETAPAS',
  subtitle:
    'Do pedido de orçamento à entrega técnica na obra, com comunicação direta e sem burocracia excessiva.',
  sceneImage: siteEarthwork,
  sceneImageAlt:
    'Rolo compactador vibratório e motoniveladora realizando terraplanagem em obra viária',
  steps: [
    {
      number: '01',
      title: 'Seleção do Equipamento',
      description:
        'Escolha a máquina no catálogo ou informe o tipo de serviço e a fase da obra pelo formulário ou WhatsApp.',
    },
    {
      number: '02',
      title: 'Dimensionamento e Proposta',
      description:
        'Confirmamos disponibilidade, modalidade (com ou sem operador), prazo e valor de mobilização.',
    },
    {
      number: '03',
      title: 'Aprovação e Contrato',
      description:
        'Formalização objetiva do contrato comercial e agendamento da janela de recebimento no canteiro.',
    },
    {
      number: '04',
      title: 'Entrega e Suporte em Obra',
      description:
        'Equipamento entregue revisado no local combinado com canal direto para suporte durante toda a locação.',
    },
  ],
};

export const logisticsImageConfig = {
  image: siteLogistics,
  alt: 'Caminhão prancha preparando mobilização de escavadeira hidráulica em pátio de locação',
};

export const rentalPeriods = [
  'Diária / Pontual',
  'Semanal (7 dias)',
  'Quinzenal (15 dias)',
  'Mensal (30 dias)',
  'Projeto / Longo prazo',
] as const;

