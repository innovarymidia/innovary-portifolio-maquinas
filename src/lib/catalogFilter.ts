import type { CategoryId, EquipmentItem } from '../config/catalog';

export interface CatalogFilterParams {
  items: EquipmentItem[];
  enabledCategoryIds: CategoryId[];
  activeCategory: CategoryId | 'all';
  searchQuery: string;
}

/**
 * Filtra o catalogo modular respeitando as categorias habilitadas no cliente,
 * a categoria selecionada e o termo de busca por nome, marca, codigo ou especificacao.
 */
export function filterCatalogEquipments({
  items,
  enabledCategoryIds,
  activeCategory,
  searchQuery,
}: CatalogFilterParams): EquipmentItem[] {
  const enabledSet = new Set(enabledCategoryIds);
  const query = searchQuery.trim().toLowerCase();

  return items.filter((item) => {
    if (!enabledSet.has(item.categoryId)) {
      return false;
    }
    if (activeCategory !== 'all' && item.categoryId !== activeCategory) {
      return false;
    }
    if (!query) {
      return true;
    }

    const haystack = [
      item.name,
      item.brand,
      item.model,
      item.specification,
      item.code,
      item.categoryId,
    ]
      .join(' ')
      .toLowerCase();

    return haystack.includes(query);
  });
}
