'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Image from 'next/image';
import { Button } from '../ui/button';
import { CircleCheck, CircleX, ArrowRightLeft, Loader2 } from 'lucide-react';
import { Badge } from '../ui/badge';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import Cookies from 'js-cookie';
// Структура на основе твоего JSON
interface Offer {
  id: number;
  productId: number;
  productTitle: string;
  productOwnerId: number;
  productOwnerName: string;
  senderId: number;
  senderName: string;
  offeredProductId: number | null;
  offeredProductTitle: string | null;
  cashAmount: number;
  message: string;
  status: string; // 'Pending', 'Accepted', 'Rejected'
  createdAt: string;
  productImageUrl?: string;
}

export function OffersTabs() {
  const [incomingOffers, setIncomingOffers] = useState<Offer[]>([]);
  const [outgoingOffers, setOutgoingOffers] = useState<Offer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<number | null>(null);

  // Загрузка данных
  const fetchOffers = async () => {
    const token = Cookies.get('token');
    try {
      setIsLoading(true);
      const [incomingRes, outgoingRes] = await Promise.all([
        axios.get('https://kampustakas-backend-production.up.railway.app/api/offers/incoming', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
        axios.get('https://kampustakas-backend-production.up.railway.app/api/offers/outgoing', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
      ]);

      setIncomingOffers(incomingRes.data.data || []);
      setOutgoingOffers(outgoingRes.data.data || []);
    } catch (error) {
      console.error('Ошибка загрузки офферов:', error);
      toast.error('Teklifler yüklenirken hata oluştu.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchOffers();
  }, []);

  // Обработка кнопок (Accept, Reject, Cancel)
  const handleOfferAction = async (offerId: number, action: 'accept' | 'reject' | 'cancel') => {
    const token = Cookies.get('token');
    try {
      setActionLoading(offerId);
      await axios.post(
        `https://kampustakas-backend-production.up.railway.app/api/offers/${offerId}/${action}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      toast.success('İşlem başarılı!');
      fetchOffers(); // Перезагружаем список после действия
    } catch (error) {
      console.error(`Hata (${action}):`, error);
      toast.error('İşlem başarısız oldu.');
    } finally {
      setActionLoading(null);
    }
  };

  // Сборка строки предложения (Товар + Деньги)
  const renderOfferDetails = (offer: Offer) => {
    const parts = [];
    if (offer.offeredProductTitle) parts.push(offer.offeredProductTitle);
    if (offer.cashAmount > 0) parts.push(`₺${offer.cashAmount}`);
    return parts.length > 0 ? parts.join(' + ') : 'Belirtilmedi';
  };

  // Динамические цвета для бейджей статуса
  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'accepted':
        return (
          <Badge className="text-white bg-green-500 absolute right-4 top-5">Kabul Edildi</Badge>
        );
      case 'rejected':
        return <Badge className="text-white bg-red-500 absolute right-4 top-5">Reddedildi</Badge>;
      default: // pending
        return (
          <Badge className="text-gray-700 bg-yellow-400 absolute right-4 top-5">Beklemede</Badge>
        );
    }
  };

  return (
    <Tabs defaultValue="gelenler" className="w-full max-w-[800px]">
      <TabsList className="mb-4">
        <TabsTrigger className="w-[150px]" value="gelenler">
          Gelenler
        </TabsTrigger>
        <TabsTrigger className="w-[150px]" value="gidenler">
          Gidenler
        </TabsTrigger>
      </TabsList>

      {/* --- ВХОДЯЩИЕ ОФФЕРЫ (GELENLER) --- */}
      <TabsContent value="gelenler" className="space-y-4">
        {isLoading ? (
          <p className="text-gray-500 animate-pulse">Yükleniyor...</p>
        ) : incomingOffers.length === 0 ? (
          <div className="p-8 text-center bg-white border rounded-xl">
            <p className="text-gray-500">Hiç gelen teklifiniz yok.</p>
          </div>
        ) : (
          incomingOffers.map((offer) => (
            <div
              key={offer.id}
              className="relative w-full shadow-sm hover:shadow-md transition-all flex items-center gap-4 p-5 bg-white border rounded-xl">
              {getStatusBadge(offer.status)}

              <div className="relative w-[100px] h-[100px] shrink-0">
                <Image
                  src={offer.productImageUrl || '/placeholder.png'}
                  alt={offer.productTitle}
                  fill
                  className="rounded-xl object-cover border"
                />
              </div>

              <div className="w-full pr-24">
                <h2 className="text-[18px] font-bold text-black truncate">{offer.productTitle}</h2>
                <p className="text-gray-500 text-[14px] mb-2">Gönderen: {offer.senderName}</p>
                <p className="text-gray-500 text-[14px] mb-2">{offer.message}</p>

                <div className="flex items-center gap-2 text-secondary font-medium mt-1">
                  <ArrowRightLeft size={16} />
                  <span>{renderOfferDetails(offer)}</span>
                </div>

                {/* Показываем кнопки только если статус Pending */}
                {offer.status.toLowerCase() === 'pending' && (
                  <div className="flex items-center gap-3 mt-[12px] w-full">
                    <Button
                      disabled={actionLoading === offer.id}
                      onClick={() => handleOfferAction(offer.id, 'accept')}
                      className="flex w-[250px] bg-secondary text-white justify-center items-center hover:bg-secondary/80 rounded-xl transition-all">
                      {actionLoading === offer.id ? (
                        <Loader2 className="animate-spin mr-2" size={18} />
                      ) : (
                        <CircleCheck size={18} className="mr-2" />
                      )}
                      Kabul Et
                    </Button>
                    <Button
                      disabled={actionLoading === offer.id}
                      onClick={() => handleOfferAction(offer.id, 'reject')}
                      className="flex w-[250px] bg-transparent justify-center items-center text-red-500 hover:bg-red-50 hover:text-red-600 border border-red-500 rounded-xl transition-all">
                      <CircleX size={18} className="mr-2" />
                      Reddet
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </TabsContent>

      {/* --- ИСХОДЯЩИЕ ОФФЕРЫ (GİDENLER) --- */}
      <TabsContent value="gidenler" className="space-y-4">
        {isLoading ? (
          <p className="text-gray-500 animate-pulse">Yükleniyor...</p>
        ) : outgoingOffers.length === 0 ? (
          <div className="p-8 text-center bg-white border rounded-xl">
            <p className="text-gray-500">Gönderdiğiniz bir teklif bulunmuyor.</p>
          </div>
        ) : (
          outgoingOffers.map((offer) => (
            <div
              key={offer.id}
              className="relative w-full shadow-sm hover:shadow-md transition-all flex items-center gap-4 p-5 bg-white border rounded-xl">
              {getStatusBadge(offer.status)}

              <div className="relative w-[100px] h-[100px] shrink-0">
                <Image
                  src={offer.productImageUrl || '/placeholder.png'}
                  alt={offer.productTitle}
                  fill
                  className="rounded-xl object-cover border"
                />
              </div>

              <div className="w-full pr-24">
                <h2 className="text-[18px] font-bold text-black truncate">{offer.productTitle}</h2>
                <p className="text-gray-500 text-[14px] mb-2">
                  İlan Sahibi: {offer.productOwnerName}
                </p>

                <div className="flex items-center gap-2 text-secondary font-medium mt-1">
                  <ArrowRightLeft size={16} />
                  <span>{renderOfferDetails(offer)}</span>
                </div>

                {/* Показываем кнопку отмены только если статус Pending */}
                {offer.status.toLowerCase() === 'pending' && (
                  <div className="flex items-center gap-3 mt-[12px] w-full">
                    <Button
                      disabled={actionLoading === offer.id}
                      onClick={() => handleOfferAction(offer.id, 'cancel')}
                      className="flex w-full bg-transparent justify-center items-center text-gray-500 hover:bg-gray-50 hover:text-black border border-gray-300 rounded-xl transition-all">
                      {actionLoading === offer.id ? (
                        <Loader2 className="animate-spin mr-2" size={18} />
                      ) : (
                        <CircleX size={18} className="mr-2" />
                      )}
                      Teklifi İptal Et
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </TabsContent>
    </Tabs>
  );
}
