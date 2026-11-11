/**
 * Configuracao institucional centralizada da empresa locadora.
 * Edite este arquivo para personalizar o template comercial para qualquer cliente.
 */
export interface CompanyConfig {
  brandName: string;
  brandSubtitle: string;
  tagline: string;
  templateCredit: string;
  contact: {
    phoneDisplay: string;
    phoneHref: string;
    whatsappDigits: string;
    whatsappDefaultMessage: string;
    email: string;
    businessHours: string;
    cityRegion: string;
    addressLabel: string;
    cnpjLabel: string;
  };
  /** URL opcional de webhook (Formspree, Make, n8n, CRM) para envio de leads */
  formWebhookUrl: string;
  navigation: { label: string; href: string }[];
  coverage: {
    eyebrow: string;
    title: string;
    description: string;
    mobilizationNote: string;
    regions: { title: string; detail: string }[];
  };
  seo: {
    title: string;
    description: string;
  };
}

export const companyConfig: CompanyConfig = {
  brandName: 'SUA LOCADORA',
  brandSubtitle: 'ENGENHARIA E MÁQUINAS',
  tagline:
    'Locação de máquinas pesadas e equipamentos de engenharia civil com revisão técnica e agilidade operacional para sua obra.',
  templateCredit: 'Template Comercial • Innovary Mídia',
  contact: {
    phoneDisplay: '(00) 90000-0000',
    phoneHref: 'tel:+5500900000000',
    whatsappDigits: '5500900000000',
    whatsappDefaultMessage:
      'Ola! Gostaria de solicitar um orcamento para locacao de equipamentos.',
    email: 'orcamento@suaempresa.com.br',
    businessHours: 'Seg. a Sex. das 07h30 às 18h00 • Sáb. das 08h00 às 12h00',
    cityRegion: 'Sua Cidade e Região Metropolitana',
    addressLabel: 'Base Operacional: configure o endereço da sua empresa',
    cnpjLabel: 'CNPJ 00.000.000/0000-00 (Exemplo configurável)',
  },
  formWebhookUrl: '',
  navigation: [
    { label: 'Categorias', href: '#categorias' },
    { label: 'Diferenciais', href: '#diferenciais' },
    { label: 'Como Funciona', href: '#processo' },
    { label: 'Frota', href: '#frota' },
    { label: 'Atendimento', href: '#atendimento' },
    { label: 'Contato', href: '#orcamento' },
  ],
  coverage: {
    eyebrow: 'LOGÍSTICA E MOBILIZAÇÃO',
    title: 'ATENDIMENTO ESTRUTURADO PARA OBRAS URBANAS E RODOVIÁRIAS',
    description:
      'Deslocamento programado de equipamentos em caminhão prancha ou guincho plataforma, garantindo previsibilidade de entrega para o cronograma do canteiro.',
    mobilizationNote:
      'Configure neste bloco os municípios, polos industriais e rodovias atendidos pela sua operação.',
    regions: [
      {
        title: 'Capital e Região Metropolitana',
        detail: 'Atendimento prioritário para obras comerciais, fundações e infraestrutura urbana.',
      },
      {
        title: 'Polos Industriais e Logísticos',
        detail: 'Suporte para terraplanagem de galpões, pátios de manobra e movimentação pesada.',
      },
      {
        title: 'Obras Rodoviárias e Loteamentos',
        detail: 'Fornecimento contínuo de linha amarela para pavimentação, drenagem e saneamento.',
      },
      {
        title: 'Regiões Vizinhas sob Consulta',
        detail: 'Mobilização programada para contratos semanais, quinzenais e mensais em todo o estado.',
      },
    ],
  },
  seo: {
    title: 'Locação de Máquinas e Equipamentos para Construção Civil',
    description:
      'Locação de escavadeiras, pás carregadeiras, caminhões munck, plataformas elevatórias, tratores e rolos compactadores para obras civis.',
  },
};

