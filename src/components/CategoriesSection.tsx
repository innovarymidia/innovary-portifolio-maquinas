import { ArrowRight } from 'lucide-react';
import { categoryLibrary, type CategoryId } from '../config/catalog';
import { categoriesSectionConfig } from '../config/sections';
import type { TemplateConfig } from '../config/template';
import { trackEvent } from '../lib/analytics';

interface CategoriesSectionProps {
  template: TemplateConfig;
  onSelectCategory: (categoryId: CategoryId) => void;
}

export function CategoriesSection({
  template,
  onSelectCategory,
}: CategoriesSectionProps) {
  const visibleCategories = categoryLibrary.filter((cat) =>
    template.enabledCategoryIds.includes(cat.id)
  );

  const handleSelect = (category: (typeof visibleCategories)[number]) => {
    trackEvent('select_category', {
      category_id: category.id,
      category_name: category.shortTitle,
    });
    onSelectCategory(category.id);
    const el = document.getElementById('catalogo');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="categorias" className="scroll-mt-16 sm:scroll-mt-20 py-12 sm:py-16 lg:py-24 bg-surface">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold uppercase text-dark tracking-tight leading-[0.95]">
            {categoriesSectionConfig.title}
          </h2>
          <p className="text-sm sm:text-base text-muted mt-2.5 sm:mt-3 leading-relaxed">
            {categoriesSectionConfig.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-12 gap-3 sm:gap-5 mt-8 sm:mt-10 lg:mt-12">
          {visibleCategories.map((category) => (
            <div
              key={category.id}
              onClick={() => handleSelect(category)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleSelect(category);
                }
              }}
              role="button"
              tabIndex={0}
              className="col-span-6 lg:col-span-3 bg-white border border-line hover:border-accent rounded-[12px] p-3.5 sm:p-5 flex flex-col justify-between transition-colors duration-200 cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <div>
                <h3 className="font-display text-lg sm:text-2xl font-bold uppercase text-dark text-center leading-[1.05] min-h-[38px] sm:min-h-[48px] flex items-center justify-center">
                  {category.title}
                </h3>

                <div className="h-24 sm:h-40 my-2 sm:my-3 flex items-center justify-center bg-white overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.imageAlt}
                    loading="lazy"
                    className="max-h-full w-auto object-contain transition-transform duration-300 group-hover:scale-[1.04]"
                  />
                </div>

                <p className="hidden sm:block text-xs text-muted text-center leading-relaxed mb-4">
                  {category.description}
                </p>
              </div>

              <span className="w-full min-h-[44px] sm:min-h-[48px] px-2.5 sm:px-3 rounded-[8px] bg-surface group-hover:bg-accent text-dark font-semibold text-xs sm:text-sm inline-flex items-center justify-center gap-1 sm:gap-1.5 transition-colors duration-200">
                <span>Ver linha</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" aria-hidden="true" />
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
