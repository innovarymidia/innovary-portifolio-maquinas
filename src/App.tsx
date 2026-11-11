import { useEffect, useState } from 'react';
import { analyticsConfig } from './config/analytics';
import { type CategoryId, type EquipmentItem } from './config/catalog';
import { templateConfig } from './config/template';
import { initAnalytics } from './lib/analytics';
import { BrandsSection } from './components/BrandsSection';
import { CatalogSection } from './components/CatalogSection';
import { CategoriesSection } from './components/CategoriesSection';
import { DifferentialsSection } from './components/DifferentialsSection';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProcessSection } from './components/ProcessSection';
import { QuoteSection } from './components/QuoteSection';

export function App() {
  const [activeCategory, setActiveCategory] = useState<CategoryId | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedEquipmentId, setSelectedEquipmentId] = useState<string>('');

  useEffect(() => {
    initAnalytics(analyticsConfig);
  }, []);

  const handleSelectEquipment = (item: EquipmentItem) => {
    setSelectedEquipmentId(item.id);
  };

  const handleQuickCategorySelect = (categoryId: CategoryId) => {
    setActiveCategory(categoryId);
    setSearchQuery('');
    const el = document.getElementById('catalogo');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleFocusCatalogSearch = () => {
    const el = document.getElementById('catalogo');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setTimeout(() => {
      document.getElementById('catalog-search')?.focus();
    }, 350);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F2F3F5] text-[#25272B]">
      <a
        href="#conteudo-principal"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:rounded-md focus:bg-[#F3B51B] focus:text-[#25272B] focus:font-semibold"
      >
        Ir para o conteúdo principal
      </a>

      <Header />

      <main id="conteudo-principal" className="flex-1">
        <Hero
          onQuickCategorySelect={handleQuickCategorySelect}
          onFocusCatalogSearch={handleFocusCatalogSearch}
        />

        {templateConfig.sections.categories && (
          <CategoriesSection
            onSelectCategory={(catId) => {
              setActiveCategory(catId);
              setSearchQuery('');
            }}
          />
        )}

        {templateConfig.sections.catalog && (
          <CatalogSection
            activeCategory={activeCategory}
            onChangeCategory={setActiveCategory}
            searchQuery={searchQuery}
            onChangeSearchQuery={setSearchQuery}
            selectedEquipmentId={selectedEquipmentId}
            onSelectEquipment={handleSelectEquipment}
          />
        )}

        {templateConfig.sections.differentials && <DifferentialsSection />}
        {templateConfig.sections.process && <ProcessSection />}
        {templateConfig.sections.brands && <BrandsSection />}

        {templateConfig.sections.quote && (
          <QuoteSection
            selectedEquipmentId={selectedEquipmentId}
            onChangeSelectedEquipment={setSelectedEquipmentId}
          />
        )}
      </main>

      <Footer
        onSelectCategory={(catId) => {
          setActiveCategory(catId);
          setSearchQuery('');
        }}
      />
      <FloatingWhatsApp selectedEquipmentId={selectedEquipmentId} />
    </div>
  );
}

export default App;
