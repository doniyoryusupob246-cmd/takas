import CategoryFilter from '@/components/shared/category-filter';
import { Container } from '@/components/shared/container';
import { Header } from '@/components/shared/header';
import HeroSection from '@/components/shared/hero-section';
import { Nav } from '@/components/shared/nav';
import ProductGrid from '@/components/shared/product-grid';

export default function Home() {
  return (
    <div>
      <Nav />
      <HeroSection />
      <CategoryFilter />
      <ProductGrid />
    </div>
  );
}
