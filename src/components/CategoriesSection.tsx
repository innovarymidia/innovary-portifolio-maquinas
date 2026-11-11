import { ArrowRight } from 'lucide-react';
import { equipmentCategories, type CategoryId } from '../config/catalog';
import { categoriesSectionConfig } from '../config/sections';
import { trackEvent } from '../lib/analytics';

interface CategoriesSectionProps {
  onSelectCategory: (categoryId: CategoryId) => void;
}

export function CategoriesSection({ onSelectCategory }: CategoriesSectionProps) {
  const handleSelect = (category: (typeof equipmentCategories)[number]) => {
    trackEvent('select_category', { category_id: category.id, category_name: category.shortTitle });
    onSelectCategory(category.id);
    const fleetEl = document.getElementById('frota');
    if (fleetEl) {
      fleetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="categorias" className="scroll-mt-20 py-16 lg:py-24 bg-[#F2F3F5]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold uppercase text-[#25272B] tracking-tight leading-[0.95]">
            {categoriesSectionConfig.title}
          </h2>
          <p className="text-sm sm:text-base text-[#656B73] mt-3 leading-relaxed">
            {categoriesSectionConfig.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-12 gap-6 mt-10 lg:mt-12">
          {equipmentCategories.map((category) => (
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
              className="col-span-12 sm:col-span-6 lg:col-span-4 bg-white border border-[#D6D9DE] hover:border-[#F3B51B] rounded-[12px] p-6 flex flex-col justify-between transition-colors duration-200 cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F3B51B]"
            >
              <div>
                <h3 className="font-display text-2xl font-bold uppercase text-[#25272B] text-center leading-[1.05] min-h-[52px] flex items-center justify-center">
                  {category.title}
                </h3>

                <div className="h-48 sm:h-52 my-4 flex items-center justify-center bg-white overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.imageAlt}
                    loading="lazy"
                    className="max-h-full w-auto object-contain transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                </div>

                <p className="text-xs sm:text-sm text-[#656B73] text-center leading-relaxed mb-5">
                  {category.description}
                </p>
              </div>

              <span className="w-full min-h-[48px] px-4 rounded-[8px] bg-[#E8EAEE] group-hover:bg-[#F3B51B] text-[#25272B] font-semibold text-sm inline-flex items-center justify-center gap-2 transition-colors duration-200">
                <span>Ver equipamentos</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
