import catAerialLift from '../assets/images/cat-aerial-lift.webp';
import catCompactor from '../assets/images/cat-compactor.webp';
import catCraneTruck from '../assets/images/cat-crane-truck.webp';
import catExcavator from '../assets/images/cat-excavator.webp';
import catGrader from '../assets/images/cat-grader.webp';
import catLoader from '../assets/images/cat-loader.webp';
import fleetDumpTruck from '../assets/images/fleet-dump-truck.webp';
import fleetMiniExcavator from '../assets/images/fleet-mini-excavator.webp';

export type CategoryId =
  | 'escavadeiras'
  | 'carregadeiras'
  | 'caminhoes'
  | 'plataformas'
  | 'tratores'
  | 'compactadores';

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
  categoryId: CategoryId;
  name: string;
  subtitle: string;
  image: string;
  imageAlt: string;
  specs: {
    label: string;
    value: string;
  }[];
  modality: string;
}

export const equipmentCategories: EquipmentCategory[] = [
  {
    id: 'escavadeiras',
    title: 'ESCAVADEIRAS E MINI-ESCAVADEIRAS',
    shortTitle: 'Escavadeiras',
    description:
      'Para qualquer etapa de escavação: de valas urbanas e fundações até movimentação pesada de solo.',
    image: catExcavator,
    imageAlt: 'Escavadeira hidráulica sobre esteiras isolada em fundo branco',
  },
  {
    id: 'carregadeiras',
    title: 'PÁS CARREGADEIRAS E COMPACTAS',
    shortTitle: 'Pás Carregadeiras',
    description:
      'Equipamentos articulados versáteis para carregamento de agregados, limpeza de canteiro e aterros.',
    image: catLoader,
    imageAlt: 'Pá carregadeira articulada amarela isolada em fundo branco',
  },
  {
    id: 'caminhoes',
    title: 'CAMINHÕES MUNCK E BASCULANTES',
    shortTitle: 'Caminhões e Muncks',
    description:
      'Transporte, basculamento de materiais e içamento de cargas técnicas com precisão no canteiro.',
    image: catCraneTruck,
    imageAlt: 'Caminhão equipado com guindauto munck isolado em fundo branco',
  },
  {
    id: 'plataformas',
    title: 'PLATAFORMAS ELEVATÓRIAS',
    shortTitle: 'Plataformas Elevatórias',
    description:
      'Acesso seguro em altura para montagens estruturais, instalações industriais e manutenção predial.',
    image: catAerialLift,
    imageAlt: 'Plataforma elevatória articulada amarela isolada em fundo branco',
  },
  {
    id: 'tratores',
    title: 'MOTONIVELADORAS E TRATORES',
    shortTitle: 'Motoniveladoras e Tratores',
    description:
      'Alto torque e precisão para nivelamento de subleito, abertura de vias e corte de taludes.',
    image: catGrader,
    imageAlt: 'Motoniveladora pesada amarela isolada em fundo branco',
  },
  {
    id: 'compactadores',
    title: 'ROLOS COMPACTADORES',
    shortTitle: 'Rolos Compactadores',
    description:
      'Compactação uniforme de solos granulares, bases de pavimento e camadas asfálticas.',
    image: catCompactor,
    imageAlt: 'Rolo compactador vibratório de tambor único isolado em fundo branco',
  },
];

export const fleetEquipments: EquipmentItem[] = [
  {
    id: 'escavadeira-20t',
    code: 'ESC-20T',
    categoryId: 'escavadeiras',
    name: 'Escavadeira Hidráulica 20t',
    subtitle: 'Escavação profunda, taludes e carregamento de caminhões',
    image: catExcavator,
    imageAlt: 'Escavadeira Hidráulica 20 toneladas sobre esteiras',
    specs: [
      { label: 'Peso operacional', value: 'Classe 20 a 22 t' },
      { label: 'Caçamba padrão', value: '1,0 a 1,2 m³' },
      { label: 'Profundidade máx.', value: 'Até 6,6 m' },
    ],
    modality: 'Com ou sem operador',
  },
  {
    id: 'mini-escavadeira-35t',
    code: 'MESC-35',
    categoryId: 'escavadeiras',
    name: 'Mini Escavadeira 3,5t',
    subtitle: 'Redes hidráulicas, drenagem e obras em espaços restritos',
    image: fleetMiniExcavator,
    imageAlt: 'Mini escavadeira compacta com esteiras de borracha e lâmina frontal',
    specs: [
      { label: 'Peso operacional', value: 'Classe 3,5 a 4,0 t' },
      { label: 'Esteira', value: 'Borracha (baixo impacto)' },
      { label: 'Profundidade máx.', value: 'Até 3,2 m' },
    ],
    modality: 'Diária, semanal ou mensal',
  },
  {
    id: 'pa-carregadeira-18m3',
    code: 'CAR-180',
    categoryId: 'carregadeiras',
    name: 'Pá Carregadeira Articulada 1,8 m³',
    subtitle: 'Movimentação de brita, areia, entulho e alimentação de usinas',
    image: catLoader,
    imageAlt: 'Pá carregadeira articulada amarela com caçamba frontal',
    specs: [
      { label: 'Capacidade caçamba', value: '1,8 a 2,1 m³' },
      { label: 'Peso operacional', value: 'Classe 11 a 13 t' },
      { label: 'Altura de descarga', value: 'Até 2,9 m' },
    ],
    modality: 'Com ou sem operador',
  },
  {
    id: 'caminhao-munck-15t',
    code: 'MNK-150',
    categoryId: 'caminhoes',
    name: 'Caminhão Guindauto (Munck) 15t',
    subtitle: 'Içamento, descarga técnica e transporte de pré-moldados',
    image: catCraneTruck,
    imageAlt: 'Caminhão carroceria aberta equipado com guindaste articulado munck',
    specs: [
      { label: 'Momento de carga', value: 'Classe 15 a 20 tm' },
      { label: 'Alcance hidráulico', value: 'Até 14 m' },
      { label: 'Patolas', value: 'Estabilização hidráulica' },
    ],
    modality: 'Operação com motorista/operador',
  },
  {
    id: 'caminhao-basculante-12m3',
    code: 'BSC-12M',
    categoryId: 'caminhoes',
    name: 'Caminhão Basculante Traçado 12 m³',
    subtitle: 'Bota-fora, transporte de terra, brita e apoio à terraplanagem',
    image: fleetDumpTruck,
    imageAlt: 'Caminhão basculante pesado 6x4 amarelo e grafite',
    specs: [
      { label: 'Caçamba basculante', value: '12 a 14 m³' },
      { label: 'Tração', value: '6x4 Off-Road' },
      { label: 'Aplicação', value: 'Terraplanagem e agregados' },
    ],
    modality: 'Diária, semanal ou mensal',
  },
  {
    id: 'plataforma-articulada-16m',
    code: 'PLT-16A',
    categoryId: 'plataformas',
    name: 'Plataforma Elevatória Articulada 16m',
    subtitle: 'Montagem metálica, cobertura, elétrica e fachada industrial',
    image: catAerialLift,
    imageAlt: 'Plataforma elevatória articulada diesel para trabalho em altura',
    specs: [
      { label: 'Altura de trabalho', value: '16 m (classe 15 a 20 m)' },
      { label: 'Alcance horizontal', value: 'Até 9,0 m' },
      { label: 'Norma', value: 'Conforme NR-18 / NR-35' },
    ],
    modality: 'Diária, semanal ou mensal',
  },
  {
    id: 'motoniveladora-140hp',
    code: 'MNV-140',
    categoryId: 'tratores',
    name: 'Motoniveladora Articulada 140 HP',
    subtitle: 'Nivelamento fino, regularização de sub-base e abertura de pistas',
    image: catGrader,
    imageAlt: 'Motoniveladora pesada amarela com lâmina central e escarificador',
    specs: [
      { label: 'Potência nominal', value: 'Classe 140 a 170 HP' },
      { label: 'Largura da lâmina', value: '3,66 m (12 pés)' },
      { label: 'Peso operacional', value: 'Classe 15 a 16 t' },
    ],
    modality: 'Com ou sem operador',
  },
  {
    id: 'rolo-compactador-11t',
    code: 'CMP-11T',
    categoryId: 'compactadores',
    name: 'Rolo Compactador Vibratório 11t',
    subtitle: 'Compactação de aterros, pavimentação e vias de acesso pesado',
    image: catCompactor,
    imageAlt: 'Rolo compactador vibratório de cilindro liso com cabine fechada',
    specs: [
      { label: 'Peso operacional', value: 'Classe 11 a 12 t' },
      { label: 'Largura do cilindro', value: '2,13 m' },
      { label: 'Sistema', value: 'Tambor liso ou kit pé-de-carneiro' },
    ],
    modality: 'Diária, semanal ou mensal',
  },
];

