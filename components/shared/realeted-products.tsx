import axios from 'axios';
import Link from 'next/link';

// components/RelatedProducts.tsx
const RELATED = [
  {
    id: 1,
    image:
      'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=600&auto=format&fit=crop',
    category: 'ELEKTRONİK',
    title: 'Apple Watch Series 7',
  },
  {
    id: 2,
    image:
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=600&auto=format&fit=crop',
    category: 'ELEKTRONİK',
    title: 'iPhone 14 Pro 128GB',
  },
  {
    id: 3,
    image:
      'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=600&auto=format&fit=crop',
    category: 'MÜZİK',
    title: 'Sony WH-1000XM4',
  },
  {
    id: 4,
    image:
      'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=600&auto=format&fit=crop',
    category: 'GİYİM',
    title: 'Nike Air Jordan Retro',
  },
];
interface Props {
  categoryId: number;
  currentProductId: number;
}

interface Product {
  id: number;
  title: string;
  categoryName: string;
  categoryId: number;
  images: { imageUrl: string; isMain: boolean }[];
}

export default async function RelatedProducts({ categoryId, currentProductId }: Props) {
  let relatedProducts: Product[] = [];

  try {
    const res = await axios.get(
      `https://kampustakas-backend-production-26c9.up.railway.app/api/products`,
    );
    const allProducts = res.data.data || [];

    relatedProducts = allProducts
      .filter((p: Product) => p.categoryId === categoryId && p.id !== currentProductId)
      .slice(0, 4);
  } catch (error) {
    console.error('Ошибка загрузки похожих товаров:', error);
  }

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <div className="mt-16 mb-20">
      <h3 className="text-2xl font-bold text-gray-900 mb-8 tracking-tight">
        Bunlar da İlgini Çekebilir
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts.map((product) => {
          const displayImage =
            product.images?.find((img) => img.isMain)?.imageUrl ||
            product.images?.[0]?.imageUrl ||
            'https://via.placeholder.com/600';
          return (
            <Link href={`/products/${product.id}`} key={product.id}>
              <div className="bg-white rounded-[1.5rem] overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow p-3 flex flex-col h-full cursor-pointer">
                <div className="bg-gray-100 rounded-xl h-52 mb-5 overflow-hidden">
                  <img
                    src={displayImage}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="px-3 pb-3 flex flex-col flex-grow">
                  <span className="text-[10px] font-bold text-green-800 uppercase tracking-wider mb-2.5 bg-gray-100 w-fit px-2.5 py-1 rounded-md">
                    {product.categoryName}
                  </span>
                  <h4 className="text-[15px] font-semibold text-gray-900 mb-5 line-clamp-1">
                    {product.title}
                  </h4>
                  <div className="mt-auto">
                    <span className="text-green-700 font-bold text-base">Takas</span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
