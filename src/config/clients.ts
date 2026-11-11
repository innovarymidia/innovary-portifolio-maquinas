import logoMoshia from '../assets/images/moshia/logo-moshia.png';
import { companyConfig, type CompanyConfig } from './company';
import { templateConfig, type TemplateConfig } from './template';
import type { ClientId } from '../lib/clientProfile';

export interface ClientProfile {
  id: ClientId;
  company: CompanyConfig;
  template: TemplateConfig;
  themeColorMeta: string;
}

export const moshiaCompanyConfig: CompanyConfig = {
  ...companyConfig,
  brandName: 'MOSHIA',
  brandSubtitle: 'ALUGUEL DE MÁQUINAS',
  logoSrc: logoMoshia,
  logoAlt: 'Moshia Aluguel de Máquinas',
  tagline:
    'Aluguel de máquinas e equipamentos profissionais para construção, reformas e serviços com revisão técnica e atendimento direto.',
  templateCredit: 'Moshia Aluguel de Máquinas',
  contact: {
    ...companyConfig.contact,
    whatsappDefaultMessage:
      'Ola! Gostaria de solicitar um orcamento na Moshia Aluguel de Maquinas.',
    email: 'contato@moshia.com.br',
    addressLabel: 'Moshia Aluguel de Máquinas: configure o endereço da unidade',
    cnpjLabel: 'CNPJ 00.000.000/0000-00 (Configure os dados da Moshia)',
  },
  seo: {
    title: 'Moshia | Aluguel de Máquinas e Equipamentos para Construção',
    description:
      'Moshia Aluguel de Máquinas: locação de betoneiras, marteletes, compactadores, cortadoras de piso, andaimes, lavadoras, jardinagem e geradores.',
  },
};

export function getClientProfile(clientId: ClientId): ClientProfile {
  if (clientId === 'moshia') {
    return {
      id: 'moshia',
      company: moshiaCompanyConfig,
      template: templateConfig,
      themeColorMeta: '#262421',
    };
  }

  return {
    id: 'default',
    company: companyConfig,
    template: templateConfig,
    themeColorMeta: '#25272B',
  };
}
