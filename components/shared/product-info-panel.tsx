'use client';
import { MessageSquare, ShieldCheck, ArrowRightLeft, UserPen, Trash2 } from 'lucide-react';
import SellerCard from './seller-card';
import Link from 'next/link';
import { useAuthStore } from '@/store/useAuthStore';
import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface Props {
  productId: number;
  price: number;
  ownerName: string;
  campus: string;
  ownerId?: number;
}

export default function ProductInfoPanel({ productId, campus, price, ownerName, ownerId }: Props) {
  const { user, isAuthenticated } = useAuthStore();
  const isOwnProduct =
    isAuthenticated && user && ((ownerId && user.id === ownerId) || user.fullName === ownerName);
  const router = useRouter();

  const deleteProduct = async () => {
    const token = Cookies.get('token');
    try {
      const res = await axios.delete(
        `https://kampustakas-backend-production-26c9.up.railway.app/api/products/${productId}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      router.push('/profile');
      router.refresh();
      toast.success('Ürün silindi!');
    } catch (error) {
      toast.error('Hata tekrar deneyin!');
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col gap-6 h-full">
      {/* Главная карточка с информацией */}
      <div className="bg-white rounded-[1.5rem] p-7 shadow-sm border border-gray-100">
        <div className="mb-6">
          <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider block mb-2">
            Tahmini Takas Değeri
          </span>
          <h2 className="text-3xl font-bold text-green-700">₺ {price}</h2>
        </div>

        <div className="space-y-3">
          {isOwnProduct ? (
            <div className="p-4 bg-gray-50 border rounded-xl text-center">
              <p className="text-sm font-medium text-gray-500 mb-3">Bu sizin ilanınızdır.</p>
              <Link href="/settings" className="w-full block">
                <button className="w-full bg-secondary hover:bg-secondary/80 text-white font-medium py-3 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer text-sm">
                  <UserPen className="w-4 h-4" />
                  Profil Ayarları
                </button>
              </Link>
              <button
                onClick={deleteProduct}
                className="w-full mt-[10px] bg-red-600 hover:bg-red-400 text-white font-medium py-3 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer text-sm">
                <Trash2 className="w-4 h-4" />
                Ürünü sil
              </button>
            </div>
          ) : (
            <>
              <Link href={`/offers/${productId}`} className="w-full block">
                <button className="w-full bg-green-700 hover:bg-green-800 text-white font-medium py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2.5 cursor-pointer">
                  <ArrowRightLeft className="w-5 h-5" />
                  Takas Teklifi Gönder
                </button>
              </Link>
              {/* <button className="w-full bg-white hover:bg-gray-50 text-green-700 font-medium py-3.5 rounded-xl transition-colors border-2 border-green-700/20 flex items-center justify-center gap-2.5">
                <MessageSquare className="w-5 h-5" />
                Mesaj Gönder
              </button> */}
            </>
          )}
        </div>

        <SellerCard campus={campus} ownerName={ownerName} />
      </div>

      {/* Карточка совета по безопасности */}
      <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 flex gap-4">
        <div className="shrink-0 mt-0.5">
          <ShieldCheck className="w-6 h-6 text-green-700" />
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-1.5">Güvenli Takas İpucu</h4>
          <p className="text-[13px] text-gray-500 leading-relaxed">
            Takas işlemlerinizi her zaman kampüs içindeki güvenli alanlarda ve kalabalık saatlerde
            gerçekleştirin.
          </p>
        </div>
      </div>
    </div>
  );
}
