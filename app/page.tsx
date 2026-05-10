import CategoryFilter from '@/components/shared/category-filter';
import HeroSection from '@/components/shared/hero-section';
import ProductGrid from '@/components/shared/product-grid';

export default function Home() {
  return (
    <div>
      <HeroSection />
      <CategoryFilter />
      <ProductGrid />
    </div>
  );
}
