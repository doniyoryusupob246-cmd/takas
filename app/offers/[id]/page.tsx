'use client';
import { Container } from '@/components/shared/container';
import { OfferInfoPanel } from '@/components/shared/offer-info-panel';
import { OfferPayForm } from '@/components/shared/offer-pay-form';
import { OfferProduct } from '@/components/shared/offer-product';
import { OfferSelectProduct } from '@/components/shared/offer-select-product';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';
export default function OfferPage() {
  const router = useRouter();
  const params = useParams();
  const targetProductId = params.id;

  const [selectedMyProductId, setSelectedMyProductId] = React.useState<number | null>(null);
  const [cashAmount, setCashAmount] = React.useState<string>('');
  const [message, setMessage] = React.useState<string>('');
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [targetInfo, setTargetInfo] = React.useState({ title: '', image: '' });
  const handleSubmitOffer = async () => {
    if (!selectedMyProductId) {
      toast.error('Lütfen takas etmek için kendi ürününüzü seçin!');
      return;
    }

    try {
      const token = Cookies.get('token');
      setIsLoading(true);
      const payload = {
        productId: Number(targetProductId),
        offeredProductId: selectedMyProductId,
        cashAmount: cashAmount,
        message: message,
      };

      await axios.post(
        'https://kampustakas-backend-production-26c9.up.railway.app/api/offers',
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      toast.success('Teklif başarıyla gönderildi!');
      // router.push('/');
    } catch (error) {
      console.error('Teklif gönderilirken hata oluştu:', error);
      toast.error('Bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-[20px]">
      <Container>
        <h2 className="font-medium text-[25px] text-secondary">Takas Teklifi Gönder</h2>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
          <div className="lg:col-span-8 flex flex-col">
            <OfferProduct onProductLoaded={setTargetInfo} targetProduct={Number(targetProductId)} />
            <OfferSelectProduct
              selectedId={selectedMyProductId}
              onSelect={setSelectedMyProductId}
            />
            <OfferPayForm
              cashAmount={cashAmount}
              setCashAmount={setCashAmount}
              message={message}
              setMessage={setMessage}
            />
          </div>
          <OfferInfoPanel
            targetProductTitle={targetInfo.title}
            targetProductImage={targetInfo.image}
            cashAmount={cashAmount}
            isProductSelected={!!selectedMyProductId}
            onSubmit={handleSubmitOffer}
            isLoading={isLoading}
          />
        </div>
      </Container>
    </div>
  );
}
