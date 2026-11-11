import { useEffect, useMemo, useState } from 'react';
import { analyticsConfig } from './config/analytics';
import { type CategoryId, type EquipmentItem } from './config/catalog';
import { getClientProfile } from './config/clients';
import { initAnalytics } from './lib/analytics';
import { resolveClientId } from './lib/clientProfile';
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

  const profile = useMemo(() => {
    const envClient =
      typeof import.meta !== 'undefined' && import.meta.env
        ? (import.meta.env.VITE_DEFAULT_CLIENT as string | undefined)
        : undefined;
    const clientId =
      typeof window !== 'undefined'
        ? resolveClientId(window.location.pathname, window.location.search, envClient)
        : resolveClientId('/', '', envClient);
    return getClientProfile(clientId);
  }, []);

  useEffect(() => {
    initAnalytics(analyticsConfig);
    document.title = profile.company.seo.title;
    const themeMeta = document.querySelector('meta[name="theme-color"]');
    if (themeMeta) {
      themeMeta.setAttribute('content', profile.themeColorMeta);
    }
  }, [profile]);

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
    <div
      data-client={profile.id}
      className="min-h-screen flex flex-col bg-surface text-dark selection:bg-accent selection:text-dark"
    >
      <a
        href="#conteudo-principal"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:rounded-md focus:bg-accent focus:text-dark focus:font-semibold"
      >
        Ir para o conteúdo principal
      </a>

      <Header company={profile.company} />

      <main id="conteudo-principal" className="flex-1">
        <Hero
          template={profile.template}
          onQuickCategorySelect={handleQuickCategorySelect}
          onFocusCatalogSearch={handleFocusCatalogSearch}
        />

        {profile.template.sections.categories && (
          <CategoriesSection
            template={profile.template}
            onSelectCategory={(catId) => {
              setActiveCategory(catId);
              setSearchQuery('');
            }}
          />
        )}

        {profile.template.sections.catalog && (
          <CatalogSection
            company={profile.company}
            template={profile.template}
            activeCategory={activeCategory}
            onChangeCategory={setActiveCategory}
            searchQuery={searchQuery}
            onChangeSearchQuery={setSearchQuery}
            selectedEquipmentId={selectedEquipmentId}
            onSelectEquipment={handleSelectEquipment}
          />
        )}

        {profile.template.sections.differentials && <DifferentialsSection />}
        {profile.template.sections.process && <ProcessSection />}
        {profile.template.sections.brands && (
          <BrandsSection company={profile.company} />
        )}

        {profile.template.sections.quote && (
          <QuoteSection
            company={profile.company}
            template={profile.template}
            selectedEquipmentId={selectedEquipmentId}
            onChangeSelectedEquipment={setSelectedEquipmentId}
          />
        )}
      </main>

      <Footer
        company={profile.company}
        template={profile.template}
        onSelectCategory={(catId) => {
          setActiveCategory(catId);
          setSearchQuery('');
        }}
      />
      <FloatingWhatsApp
        company={profile.company}
        selectedEquipmentId={selectedEquipmentId}
      />
    </div>
  );
}

export default App;
