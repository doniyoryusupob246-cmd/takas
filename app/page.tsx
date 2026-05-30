import CategoryFilter from '@/components/shared/category-filter';
import HeroSection from '@/components/shared/hero-section';
import ProductGrid from '@/components/shared/product-grid';
export const dynamic = 'force-dynamic';

interface PageProps {
  searchParams: Promise<{ query?: string; category?: string }>;
}

export default async function Home({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams.query || '';
  const category = resolvedSearchParams.category || '';

  return (
    <div>
      <HeroSection />
      <CategoryFilter />
      <ProductGrid search={query} category={category} />
    </div>
  );
}
