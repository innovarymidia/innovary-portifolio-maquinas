import catCleaning from '../assets/images/v2/cat-cleaning.webp';
import catCompaction from '../assets/images/v2/cat-compaction.webp';
import catConcrete from '../assets/images/v2/cat-concrete.webp';
import catCutting from '../assets/images/v2/cat-cutting.webp';
import catDemolition from '../assets/images/v2/cat-demolition.webp';
import catGardening from '../assets/images/v2/cat-gardening.webp';
import catPower from '../assets/images/v2/cat-power.webp';
import catScaffolding from '../assets/images/v2/cat-scaffolding.webp';
import presetContainers from '../assets/images/v2/preset-containers.webp';
import prodCompactionWacker from '../assets/images/v2/prod-compaction-wacker.webp';
import prodConcreteMenegotti from '../assets/images/v2/prod-concrete-menegotti.webp';
import prodConcreteOmaer from '../assets/images/v2/prod-concrete-omaer.webp';
import prodDemolitionDewalt from '../assets/images/v2/prod-demolition-dewalt.webp';

export type CategoryId =
  | 'demolicao'
  | 'concreto'
  | 'compactacao'
  | 'corte'
  | 'andaimes'
  | 'limpeza'
  | 'jardinagem'
  | 'energia'
  | 'containers';

export interface EquipmentCategory {
  id: CategoryId;
  title: string;
  shortTitle: string;
  description: string;
  image: string;
  imageAlt: string;
}

export interface EquipmentItem {
  id: string;
  code: string;
  name: string;
  categoryId: CategoryId;
  brand: string;
  model: string;
  specification: string;
  billingUnit: string;
  availability: string;
  /** Campo opcional: quando preenchido e showOptionalPrice=true, exibe valor referencial */
  optionalPrice?: string;
  image: string;
  imageAlt: string;
  featured?: boolean;
}

export const categoryLibrary: EquipmentCategory[] = [
  {
    id: 'demolicao',
    title: 'FURAÇÃO E DEMOLIÇÃO',
    shortTitle: 'Demolição',
    description: 'Marteletes, rompedores, perfuradores e acessórios para concreto e alvenaria.',
    image: catDemolition,
    imageAlt: 'Martelo demolidor rompedor industrial isolado em fundo branco',
  },
  {
    id: 'concreto',
    title: 'LINHA CONCRETO',
    shortTitle: 'Concreto',
    description: 'Betoneiras, vibradores de imersão, mangotes e misturadores de obra.',
    image: catConcrete,
    imageAlt: 'Betoneira profissional de 400 litros isolada em fundo branco',
  },
  {
    id: 'compactacao',
    title: 'COMPACTAÇÃO',
    shortTitle: 'Compactação',
    description: 'Placas vibratórias, compactadores de percussão e rolos compactos.',
    image: catCompaction,
    imageAlt: 'Placa vibratória compactadora de solo isolada em fundo branco',
  },
  {
    id: 'corte',
    title: 'CORTE E ACABAMENTO',
    shortTitle: 'Corte e acabamento',
    description: 'Cortadoras de piso, serras mármore, lixadeiras e equipamentos de acabamento.',
    image: catCutting,
    imageAlt: 'Cortadora de piso a combustão com disco diamantado em fundo branco',
  },
  {
    id: 'andaimes',
    title: 'ANDAIMES E ESCORAMENTOS',
    shortTitle: 'Andaimes e escoras',
    description: 'Andaimes tubulares, escoras metálicas, plataformas e estruturas auxiliares.',
    image: catScaffolding,
    imageAlt: 'Conjunto de andaimes metálicos e escoras ajustáveis em fundo branco',
  },
  {
    id: 'limpeza',
    title: 'LIMPEZA PROFISSIONAL',
    shortTitle: 'Limpeza',
    description: 'Lavadoras de alta pressão, aspiradores industriais e higienização pós-obra.',
    image: catCleaning,
    imageAlt: 'Lavadora profissional de alta pressão Kärcher sobre rodas em fundo branco',
  },
  {
    id: 'jardinagem',
    title: 'MÁQUINAS PARA JARDINAGEM',
    shortTitle: 'Jardinagem',
    description: 'Motosserras, podadores, sopradores, roçadeiras e manutenção de áreas verdes.',
    image: catGardening,
    imageAlt: 'Equipamentos profissionais de jardinagem e poda em fundo branco',
  },
  {
    id: 'energia',
    title: 'ENERGIA E ILUMINAÇÃO',
    shortTitle: 'Energia e iluminação',
    description: 'Geradores portáteis, torres de iluminação, quadros e extensões industriais.',
    image: catPower,
    imageAlt: 'Gerador de energia portátil amarelo e preto em fundo branco',
  },
  {
    id: 'containers',
    title: 'CONTAINERS E MÓDULOS',
    shortTitle: 'Containers e módulos',
    description: 'Containers para escritório, almoxarifado, vestiários e módulos habitáveis.',
    image: presetContainers,
    imageAlt: 'Conjunto de containers modulares amarelos e brancos para canteiro de obra',
  },
];

export const equipmentCatalog: EquipmentItem[] = [
  {
    id: 'betoneira-400l-menegotti',
    code: 'CON-400M',
    name: 'Betoneira 400 Litros Prime',
    categoryId: 'concreto',
    brand: 'Menegotti',
    model: 'Conforme equipamento',
    specification: 'Capacidade de 400 L (monofásica)',
    billingUnit: 'Diária, semanal ou mensal',
    availability: 'Sob consulta',
    image: prodConcreteMenegotti,
    imageAlt: 'Betoneira amarela Menegotti 400 litros isolada em fundo branco',
    featured: true,
  },
  {
    id: 'martelo-demolidor-1600w',
    code: 'DEM-1600D',
    name: 'Martelo Demolidor SDS-Max 1600W',
    categoryId: 'demolicao',
    brand: 'DeWalt',
    model: 'Conforme equipamento',
    specification: 'Energia de impacto de 35 J com controle de vibração',
    billingUnit: 'Diária, semanal ou mensal',
    availability: 'Sob consulta',
    image: prodDemolitionDewalt,
    imageAlt: 'Martelo demolidor DeWalt 1600W amarelo e preto em fundo branco',
    featured: true,
  },
  {
    id: 'placa-vibratoria-wacker',
    code: 'CMP-1550W',
    name: 'Placa Vibratória Reversível / Unidirecional',
    categoryId: 'compactacao',
    brand: 'Wacker Neuson',
    model: 'Conforme equipamento',
    specification: 'Base de 500 mm com motor a gasolina',
    billingUnit: 'Diária, semanal ou mensal',
    availability: 'Sob consulta',
    image: prodCompactionWacker,
    imageAlt: 'Placa vibratória Wacker Neuson para compactação de solo',
    featured: true,
  },
  {
    id: 'cortadora-de-piso-combustao',
    code: 'CRT-350P',
    name: 'Cortadora de Piso e Asfalto',
    categoryId: 'corte',
    brand: 'Conforme estoque',
    model: 'Conforme equipamento',
    specification: 'Disco diamantado de até 350 mm e tanque de água',
    billingUnit: 'Diária, semanal ou mensal',
    availability: 'Sob consulta',
    image: catCutting,
    imageAlt: 'Cortadora de piso amarela com motor a combustão e disco frontal',
    featured: true,
  },
  {
    id: 'martelo-rompedor-1550w',
    code: 'DEM-1550B',
    name: 'Martelo Rompedor 1550W',
    categoryId: 'demolicao',
    brand: 'Buffalo',
    model: 'Conforme equipamento',
    specification: 'Potência de 1550W em versões 127V ou 220V',
    billingUnit: 'Diária, semanal ou mensal',
    availability: 'Sob consulta',
    image: catDemolition,
    imageAlt: 'Martelo rompedor 1550W vertical para demolição de pisos e vigas',
  },
  {
    id: 'betoneira-profissional-csm',
    code: 'CON-400C',
    name: 'Betoneira Profissional 400L',
    categoryId: 'concreto',
    brand: 'CSM',
    model: 'Conforme equipamento',
    specification: 'Tambor 400 L com cremalheira reforçada e caixa de proteção',
    billingUnit: 'Diária, semanal ou mensal',
    availability: 'Sob consulta',
    image: catConcrete,
    imageAlt: 'Betoneira profissional CSM 400 litros amarela',
  },
  {
    id: 'betoneira-compacta-omaer',
    code: 'CON-250O',
    name: 'Betoneira Elétrica de Obra',
    categoryId: 'concreto',
    brand: 'Omaer',
    model: 'Conforme equipamento',
    specification: 'Mistura contínua de argamassa e concreto leve',
    billingUnit: 'Diária, semanal ou mensal',
    availability: 'Sob consulta',
    image: prodConcreteOmaer,
    imageAlt: 'Betoneira elétrica amarela sobre cavalete com volante de basculamento',
  },
  {
    id: 'andaime-tubular-escoras',
    code: 'AND-150M',
    name: 'Conjunto de Andaimes e Escoras Metálicas',
    categoryId: 'andaimes',
    brand: 'Linha Estrutural',
    model: 'Conforme equipamento',
    specification: 'Torres moduladas, pisos metálicos, rodízios e escoras ajustáveis',
    billingUnit: 'Diária, semanal ou mensal',
    availability: 'Sob consulta',
    image: catScaffolding,
    imageAlt: 'Torres de andaimes metálicos e escoras reguláveis de obra',
    featured: true,
  },
  {
    id: 'lavadora-alta-pressao-karcher',
    code: 'LMP-HD925',
    name: 'Lavadora de Alta Pressão Industrial',
    categoryId: 'limpeza',
    brand: 'Kärcher',
    model: 'Conforme equipamento',
    specification: 'Alta vazão e chassi tubular para limpeza pesada em obra',
    billingUnit: 'Diária, semanal ou mensal',
    availability: 'Sob consulta',
    image: catCleaning,
    imageAlt: 'Lavadora de alta pressão profissional Kärcher sobre chassi tubular',
    featured: true,
  },
  {
    id: 'kit-jardinagem-stihl',
    code: 'JRD-STH',
    name: 'Linha Profissional de Poda e Limpeza Verde',
    categoryId: 'jardinagem',
    brand: 'Stihl',
    model: 'Conforme equipamento',
    specification: 'Motosserra, podador de cerca viva e soprador costal',
    billingUnit: 'Diária, semanal ou mensal',
    availability: 'Sob consulta',
    image: catGardening,
    imageAlt: 'Conjunto de equipamentos Stihl com motosserra, podador e soprador',
  },
  {
    id: 'gerador-comercial-5700w',
    code: 'ENE-5700D',
    name: 'Gerador de Energia 5700W',
    categoryId: 'energia',
    brand: 'DeWalt',
    model: 'Conforme equipamento',
    specification: 'Potência de 5700W com tomadas protegidas e partida fácil',
    billingUnit: 'Diária, semanal ou mensal',
    availability: 'Sob consulta',
    image: catPower,
    imageAlt: 'Gerador portátil comercial 5700W amarelo com rodas de transporte',
    featured: true,
  },
  {
    id: 'modulo-container-obra',
    code: 'CNT-600M',
    name: 'Container Escritório / Almoxarifado Modular',
    categoryId: 'containers',
    brand: 'Estrutura Modular',
    model: 'Conforme equipamento',
    specification: 'Módulo padrão 6 m com isolamento termoacústico e ponto elétrico',
    billingUnit: 'Mensal ou por projeto',
    availability: 'Sob consulta',
    image: presetContainers,
    imageAlt: 'Containers modulares para escritório e almoxarifado em canteiro',
  },
];
