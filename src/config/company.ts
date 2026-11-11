export interface CompanyConfig {
  brandName: string;
  brandSubtitle: string;
  logoSrc?: string;
  logoAlt?: string;
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
  formWebhookUrl: string;
  navigation: { label: string; href: string }[];
  brands: { name: string; focus: string }[];
  seo: {
    title: string;
    description: string;
  };
}

export const companyConfig: CompanyConfig = {
  brandName: 'SUA LOCADORA',
  brandSubtitle: 'EQUIPAMENTOS E OBRAS',
  tagline:
    'Locação de equipamentos elétricos, máquinas para concreto, compactação, corte, andaimes e infraestrutura leve para construção, reformas e serviços.',
  templateCredit: 'Innovary | Rental Equipment Template',
  contact: {
    phoneDisplay: '(00) 90000-0000',
    phoneHref: 'tel:+5500900000000',
    whatsappDigits: '5500900000000',
    whatsappDefaultMessage:
      'Ola! Gostaria de solicitar um orcamento para locacao de equipamentos.',
    email: 'orcamento@suaempresa.com.br',
    businessHours: 'Seg. a Sex. das 07h30 às 18h00 • Sáb. das 08h00 às 12h00',
    cityRegion: 'Sua Cidade e Região Metropolitana',
    addressLabel: 'Loja e Centro de Distribuição: configure o endereço da sua empresa',
    cnpjLabel: 'CNPJ 00.000.000/0000-00 (Exemplo configurável)',
  },
  formWebhookUrl: '',
  navigation: [
    { label: 'Categorias', href: '#categorias' },
    { label: 'Equipamentos', href: '#catalogo' },
    { label: 'Como funciona', href: '#processo' },
    { label: 'Diferenciais', href: '#diferenciais' },
    { label: 'Contato', href: '#orcamento' },
  ],
  brands: [
    { name: 'DEWALT', focus: 'Demolição e energia' },
    { name: 'WACKER NEUSON', focus: 'Compactação de solo' },
    { name: 'MENEGOTTI', focus: 'Linha concreto' },
    { name: 'KÄRCHER', focus: 'Limpeza profissional' },
    { name: 'STIHL', focus: 'Jardinagem e corte' },
    { name: 'CSM', focus: 'Betoneiras e mistura' },
    { name: 'BUFFALO', focus: 'Rompedores e motores' },
  ],
  seo: {
    title: 'Locação de Equipamentos para Construção, Obras e Serviços',
    description:
      'Catálogo modular para locação de betoneiras, marteletes, compactadores, cortadoras de piso, andaimes, lavadoras, ferramentas de jardinagem e geradores.',
  },
};
