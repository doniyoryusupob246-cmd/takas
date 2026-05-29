import Image from 'next/image';
import React from 'react';
import { Button } from '../ui/button';
import { SendHorizontal } from 'lucide-react';

interface Props {
  className?: string;
  cashAmount: string;
  isProductSelected: boolean;
  onSubmit: () => void;
  isLoading: boolean;
  targetProductTitle?: string;
  targetProductImage?: string;
}

export const OfferInfoPanel: React.FC<Props> = ({
  cashAmount,
  isProductSelected,
  onSubmit,
  isLoading,
  className,
  targetProductTitle,
  targetProductImage,
}) => {
  return (
    <div className="lg:col-span-4">
      <div className="sticky top-8 bg-[#f6f6f6] p-5 rounded-xl">
        <h2 className="text-black text-[20px] font-bold">Teklif Özeti</h2>
        <div>
          <div className="mt-5 flex items-center justify-between">
            <p className="text-gray-500">Senin Ürünün</p>
            {isProductSelected ? (
              <p className="text-green-600">Seçildi</p>
            ) : (
              <p className="text-black">Seçilmedi</p>
            )}
          </div>
          <div className="mt-5 flex items-center justify-between">
            <p className="text-gray-500">Nakit İlavesi</p>
            {cashAmount ? `+ ${cashAmount} ₺` : 'Yok'}
          </div>
          <hr className="mt-3 mb-3" />
          <div>
            <h2 className="text-gray-500 text-[14px] font-bold uppercase">ALINACAK ÜRÜN</h2>
            <div className="mt-[15px] flex items-center gap-3">
              {/* Динамическая картинка или серый квадрат, пока грузится */}
              <div className="relative w-[40px] h-[40px] rounded-xl overflow-hidden bg-gray-200 shrink-0 border">
                {targetProductImage && (
                  <img
                    src={targetProductImage}
                    alt={targetProductTitle || 'Ürün'}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              {/* Динамическое название */}
              <h2 className="text-black font-medium text-sm line-clamp-2">
                {targetProductTitle || 'Yükleniyor...'}
              </h2>
            </div>
          </div>

          <div className="mt-5">
            <Button
              disabled={isLoading}
              onClick={onSubmit}
              className="mb-5 hover:bg-secondary/70 cursor-pointer w-full h-[65px] bg-secondary flex items-center gap-3 justify-center">
              <SendHorizontal className=" text-[22px]" />
              <p className="text-[18px]">{isLoading ? 'Gönderiliyor...' : 'Teklifi Gönder'}</p>
            </Button>

            <Button
              disabled={isLoading}
              onClick={() => window.history.back()}
              className="hover:bg-secondary cursor-pointer hover:text-white w-full h-[65px] bg-transparent border-2 border-secondary text-secondary flex items-center gap-3 justify-center">
              <p className=" text-[18px]">Iptal</p>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
