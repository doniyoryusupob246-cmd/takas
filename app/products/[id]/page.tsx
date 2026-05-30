import ProductGallery from '@/components/shared/product-galery';
import ProductInfoPanel from '@/components/shared/product-info-panel';
import ProductDetails from '@/components/shared/products-details';
import RelatedProducts from '@/components/shared/realeted-products';
import axios from 'axios';

export interface ProdcutImage {
  id?: number;
  imageUrl: string;
  isMain: boolean;
}
export interface Product {
  id: number;
  title: string;
  description: string;
  estimatedMinPrice: number;
  estimatedMaxPrice: number;
  campus: string;
  condition: string;
  categoryName: string;
  images: ProdcutImage[];
  viewCount: number;
  createdAt: string;
  ownerName: string;
  categoryId: number;
  ownerId?: number;
  userId?: number;
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let product: Product | null = null;

  try {
    const res = await axios.get(
      `https://kampustakas-backend-production.up.railway.app/api/products/${id}`,
    );
    product = res.data.data;
  } catch (error) {
    console.error('Ошибка загрузки товара:', error);
  }

  if (!product) {
    return <div className="text-center mt-20 text-xl">Ürün bulunamadı</div>;
  }

  return (
    <div>
      <main className="min-h-screen bg-[#f9fafb] font-sans selection:bg-green-100 selection:text-green-900">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 pt-8 md:pt-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
            {/* Left Column (Gallery + Info) */}
            <div className="lg:col-span-8 flex flex-col">
              <ProductGallery images={product.images} condition={product.condition} />
              <ProductDetails
                description={product.description}
                createAt={product.createdAt}
                viewCount={product.viewCount}
                campus={product.campus}
                category={product.categoryName}
                title={product.title}
              />
            </div>

            {/* Right Column (Sidebar Panel) */}
            <div className="lg:col-span-4">
              <div className="sticky top-8">
                <ProductInfoPanel
                  productId={product.id}
                  campus={product.campus}
                  ownerName={product.ownerName}
                  ownerId={product.ownerId || product.userId}
                  price={product.estimatedMaxPrice}
                />
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <RelatedProducts categoryId={product.categoryId} currentProductId={product.id} />
        </div>
      </main>
    </div>
  );
}
