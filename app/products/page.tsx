// app/page.tsx
import { Nav } from '@/components/shared/nav';
import ProductGallery from '@/components/shared/product-galery';
import ProductInfoPanel from '@/components/shared/product-info-panel';
import ProductDetails from '@/components/shared/products-details';
import RelatedProducts from '@/components/shared/realeted-products';

export default function ProductDetailPage() {
    return (
        <div>
            <Nav />
            <main className="min-h-screen bg-[#f9fafb] font-sans selection:bg-green-100 selection:text-green-900">
                <div className="max-w-[1280px] mx-auto px-4 md:px-6 pt-8 md:pt-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">

                        {/* Left Column (Gallery + Info) */}
                        <div className="lg:col-span-8 flex flex-col">
                            <ProductGallery />
                            <ProductDetails />
                        </div>

                        {/* Right Column (Sidebar Panel) */}
                        <div className="lg:col-span-4">
                            <div className="sticky top-8">
                                <ProductInfoPanel />
                            </div>
                        </div>

                    </div>

                    {/* Bottom Section */}
                    <RelatedProducts />
                </div>
            </main>
        </div>
    );
}
