import type { CategoryId } from './catalog';

export interface TemplateSectionsConfig {
  categories: boolean;
  catalog: boolean;
  differentials: boolean;
  process: boolean;
  brands: boolean;
  quote: boolean;
}

export interface TemplateConfig {
  internalName: string;
  version: string;
  /**
   * Biblioteca modular de categorias ativas para este cliente.
   * Exemplos de perfis:
   * - Construcao civil (padrao): ['demolicao','concreto','compactacao','corte','andaimes','limpeza','jardinagem','energia']
   * - Locadora com modulos: adicione 'containers' ao array
   */
  enabledCategoryIds: CategoryId[];
  catalog: {
    allowSearch: boolean;
    showOptionalPrice: boolean;
  };
  sections: TemplateSectionsConfig;
}

export const templateConfig: TemplateConfig = {
  internalName: 'Innovary | Rental Equipment Template',
  version: '2.0',
  enabledCategoryIds: [
    'demolicao',
    'concreto',
    'compactacao',
    'corte',
    'andaimes',
    'limpeza',
    'jardinagem',
    'energia',
  ],
  catalog: {
    allowSearch: true,
    showOptionalPrice: false,
  },
  sections: {
    categories: true,
    catalog: true,
    differentials: true,
    process: true,
    brands: true,
    quote: true,
  },
};

