import { ShoppingCart, User } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { Badge } from '../ui/badge';
import axios from 'axios';
import { title } from 'process';

interface Props {
  className?: string;
  targetProduct: number;
  onProductLoaded: (data: { title: string; image: string }) => void;
}

interface TargetProductData {
  id: number;
  title: string;
  ownerName: string;
  categoryName: string;
  images: { imageUrl: string }[];
}

export const OfferProduct: React.FC<Props> = ({ onProductLoaded, targetProduct, className }) => {
  const [product, setProduct] = React.useState<TargetProductData | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `https://kampustakas-backend-production.up.railway.app/api/products/${targetProduct}`,
        );

        const data = res.data.data;

        setProduct(data);

        if (onProductLoaded) {
          onProductLoaded({
            title: data.title,
            image: data.images?.[0]?.imageUrl || '/placeholder.png',
          });
        }
      } catch (error) {
        console.error('Ошибка загрузки целевого товара:', error);
      } finally {
        setIsLoading(false);
      }
    };
    if (targetProduct) {
      fetchProduct();
    }
  }, [targetProduct, onProductLoaded]);

  return (
    <div className="w-full bg-[#f6f6f6] p-8 mt-8 rounded-xl border">
      <h2 className="flex items-center gap-2">
        <ShoppingCart size={20} />
        <span className="text-secondary text-[18px] font-medium">İstenen Ürün</span>
      </h2>

      {isLoading ? (
        <div className="mt-5 flex items-center gap-5 animate-pulse">
          <div className="w-[80px] h-[80px] bg-gray-200 rounded-xl" />
          <div className="space-y-3">
            <div className="h-4 w-32 bg-gray-200 rounded" />
            <div className="h-3 w-24 bg-gray-200 rounded" />
            <div className="h-5 w-20 bg-gray-200 rounded-full" />
          </div>
        </div>
      ) : !product ? (
        <div className="mt-5 text-red-500">Ürün bulunamadı veya silinmiş.</div>
      ) : (
        <div className="mt-5 flex flex-col sm:flex-row items-center sm:items-start gap-5">
          <div className="relative w-[100px] h-[100px] rounded-xl overflow-hidden bg-white shrink-0 border border-gray-200">
            <img
              src={product.images?.[0]?.imageUrl || '/placeholder.png'}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-center sm:text-left">
            <h2 className="text-black font-bold text-lg">{product.title}</h2>
            <span className="flex items-center justify-center sm:justify-start gap-2 mt-1">
              <User size={15} className="text-gray-400" />
              <p className="text-[14px] text-gray-400">İlan Sahibi: {product.ownerName}</p>
            </span>
            <Badge className="bg-secondary/20 text-secondary mt-2.5">{product.categoryName}</Badge>
          </div>
        </div>
      )}
    </div>
  );
};
