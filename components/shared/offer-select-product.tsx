import axios from 'axios';
import { Package2, Plus } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { Button } from '../ui/button';
interface Props {
  className?: string;
  selectedId: number | null;
  onSelect: (id: number) => void;
}

interface MyProduct {
  id: number;
  title: string;
  condition: string;
  images: { imageUrl: string }[];
}

export const OfferSelectProduct: React.FC<Props> = ({ onSelect, selectedId, className }) => {
  const [myProduct, setMyProduct] = React.useState<MyProduct[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const token = Cookies.get('token');
    const fetchMyProduct = async () => {
      try {
        const res = await axios.get(
          `https://kampustakas-backend-production-26c9.up.railway.app/api/products/my`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setMyProduct(res.data.data);
      } catch (error) {
        console.error('Ошибка загрузки моих товаров:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMyProduct();
  }, []);

  return (
    <div className="w-full bg-[#f6f6f6] p-8 mt-8 rounded-xl border">
      <h2 className="flex items-center gap-2">
        <Package2 size={20} />
        <span className="text-secondary text-[18px] font-medium">Ürünlerimden Seç</span>
      </h2>
      <p className="text-[14px] text-gray-400">Takas etmek istediğiniz bir ürününüzü seçin.</p>
      <div className="mt-5 w-full block p-4 rounded-xl bg-white">
        {isLoading ? (
          <p className="text-gray-500 animate-pulse">Ürünleriniz yükleniyor...</p>
        ) : myProduct.length === 0 ? (
          <div className="p-6 bg-white rounded-xl text-center border flex flex-col items-center gap-3">
            <p className="text-gray-500 text-sm">Henüz hiç ürün eklemediniz.</p>
            <Link href="/new-product" target="_blank">
              <Button size="sm" className="bg-secondary text-white hover:bg-secondary/80 flex items-center gap-1.5 rounded-lg h-9 px-4 cursor-pointer">
                <Plus size={16} />
                Yeni Ürün Ekle
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {myProduct.map((product) => {
              const isSelected = selectedId === product.id;
              const imageUrl = product.images?.[0]?.imageUrl || '/placeholder.png';
              return (
                <div
                  key={product.id}
                  onClick={() => onSelect(product.id)}
                  className={`p-4 rounded-xl cursor-pointer transition-all border-2 ${
                    isSelected
                      ? 'bg-green-50 border-green-600 shadow-md transform scale-105' // Стиль для ВЫБРАННОГО
                      : 'bg-white border-transparent hover:border-gray-200' // Стиль для обычного
                  }`}>
                  <div className="relative w-full h-24 mb-2 rounded-lg overflow-hidden">
                    <img src={imageUrl} alt={product.title} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h2 className="text-black font-bold text-sm truncate">{product.title}</h2>
                    <p className="text-gray-400 text-xs truncate">{product.condition}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
