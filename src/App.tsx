import { useEffect, useState } from 'react';
import { analyticsConfig } from './config/analytics';
import { type CategoryId, type EquipmentItem } from './config/catalog';
import { initAnalytics } from './lib/analytics';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategoriesSection } from './components/CategoriesSection';
import { DifferentialsSection } from './components/DifferentialsSection';
import { ProcessSection } from './components/ProcessSection';
import { FleetSection } from './components/FleetSection';
import { CoverageSection } from './components/CoverageSection';
import { QuoteSection } from './components/QuoteSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

export function App() {
  const [activeCategory, setActiveCategory] = useState<CategoryId | 'all'>('all');
  const [selectedEquipmentId, setSelectedEquipmentId] = useState<string>('');

  useEffect(() => {
    initAnalytics(analyticsConfig);
  }, []);

  const handleSelectEquipment = (item: EquipmentItem) => {
    setSelectedEquipmentId(item.id);
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
        <Hero />
        <CategoriesSection onSelectCategory={setActiveCategory} />
        <DifferentialsSection />
        <ProcessSection />
        <FleetSection
          activeCategory={activeCategory}
          onChangeCategory={setActiveCategory}
          selectedEquipmentId={selectedEquipmentId}
          onSelectEquipment={handleSelectEquipment}
        />
        <CoverageSection />
        <QuoteSection
          selectedEquipmentId={selectedEquipmentId}
          onChangeSelectedEquipment={setSelectedEquipmentId}
        />
      </main>

      <Footer onSelectCategory={setActiveCategory} />
      <FloatingWhatsApp selectedEquipmentId={selectedEquipmentId} />
    </div>
  );
}

export default App;

