import React from 'react';
import { Container } from '@/components/shared/container';
import { HelpCircle, PlusCircle, Search, MessageSquare, Handshake, ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Nasıl Çalışır? | Kampüs Takas',
  description: 'Kampüs Takas ile ürün paylaşma, arama, takas teklifi gönderme ve güvenli takas adımları.',
};

export default function NasilCalisirPage() {
  const steps = [
    {
      number: '01',
      title: 'İlanını Kolayca Oluştur',
      description: 'Artık ihtiyacın olmayan kitabı, hesap makinesini veya herhangi bir kampüs eşyasını fotoğrafla, özelliklerini belirt ve sisteme yükle.',
      icon: PlusCircle,
      color: 'bg-blue-50 text-blue-700 border-blue-100',
    },
    {
      number: '02',
      title: 'İhtiyacın Olanı Bul',
      description: 'Arama çubuğunu veya kategorileri kullanarak diğer öğrencilerin kampüste paylaştığı ilanlar arasından aradığın ürünü saniyeler içinde bul.',
      icon: Search,
      color: 'bg-amber-50 text-amber-700 border-amber-100',
    },
    {
      number: '03',
      title: 'Takas Teklifi Gönder',
      description: 'Bulduğun ürüne karşılık kendi ürününü seçerek teklif et. Gerekirse teklifine nakit desteği veya detaylı açıklama/not ekle.',
      icon: MessageSquare,
      color: 'bg-purple-50 text-purple-700 border-purple-100',
    },
    {
      number: '04',
      title: 'Kampüste Buluş ve Takas Et',
      description: 'Teklif onaylandığında, diğer kullanıcıyla mesajlaşma veya kampüs ortamında bir araya gelerek güvenli bir şekilde takası yüz yüze tamamlayın.',
      icon: Handshake,
      color: 'bg-green-50 text-green-700 border-green-100',
    },
  ];

  return (
    <div className="min-h-screen bg-[#f9fafb] py-12 px-4 sm:px-6">
      <Container className="max-w-[900px]">
        {/* Back Button */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-gray-500 hover:text-green-700 font-medium text-sm transition-colors mb-8 group"
        >
          <ArrowLeft size={16} className="transform group-hover:-translate-x-1 transition-transform" />
          Ana Sayfaya Dön
        </Link>

        {/* Hero Section */}
        <div className="bg-white rounded-[1.5rem] shadow-sm border border-gray-100 p-8 sm:p-12 mb-12 relative overflow-hidden text-center sm:text-left">
          <div className="absolute top-0 right-0 w-48 h-48 bg-green-50 rounded-full transform translate-x-16 -translate-y-16 -z-0 opacity-45" />
          <div className="relative z-10 flex flex-col sm:flex-row items-center gap-8">
            <div className="w-16 h-16 bg-green-100 text-green-700 flex items-center justify-center rounded-2xl shrink-0 shadow-sm">
              <HelpCircle size={32} />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">Nasıl Çalışır?</h1>
              <p className="text-gray-500 text-base sm:text-lg mt-2 max-w-[600px] leading-relaxed">
                Kampüs Takas, karmaşık süreçleri ortadan kaldırarak üniversite arkadaşlarınla eşya alışverişi yapmanı 4 basit adımda sağlar.
              </p>
            </div>
          </div>
        </div>

        {/* Step-by-Step Cards Grid */}
        <div className="space-y-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div 
                key={step.number} 
                className="bg-white rounded-[1.5rem] p-6 sm:p-8 shadow-sm border border-gray-100 flex flex-col sm:flex-row items-start gap-6 hover:shadow-md transition-all duration-300"
              >
                {/* Step number badge / icon */}
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <span className="text-3xl font-black text-gray-200 tracking-tight">{step.number}</span>
                  <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center shrink-0 ${step.color}`}>
                    <Icon size={24} />
                  </div>
                </div>

                {/* Text Content */}
                <div className="space-y-1.5 flex-1">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900">{step.title}</h3>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Informative Safety Tips */}
        <div className="bg-yellow-50/50 border border-yellow-100 rounded-[1.5rem] p-8 mt-12 space-y-4">
          <h4 className="font-bold text-gray-900 text-lg flex items-center gap-2">
            💡 Güvenli Takas İçin İpuçları
          </h4>
          <ul className="text-gray-600 text-sm sm:text-base space-y-2.5 list-disc pl-5">
            <li>Buluşmalarınızı her zaman kampüs içerisindeki kalabalık ve aydınlık ortak alanlarda (kütüphane, yemekhane veya kantinler gibi) planlayın.</li>
            <li>Takas edeceğiniz ürünü teslim almadan önce fiziksel durumunu, çalışıp çalışmadığını iyice kontrol edin.</li>
            <li>Tekliflerde nakit ödeme eklediyseniz, transferi güvenli dijital yollarla veya buluşma anında elden yapın.</li>
          </ul>
        </div>

        {/* Bottom Call to Action */}
        <div className="mt-12 text-center">
          <Link 
            href="/" 
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-green-700 hover:bg-green-800 text-white font-bold rounded-xl transition-all shadow-md hover:shadow-lg cursor-pointer text-sm sm:text-base"
          >
            Hemen Keşfetmeye Başla
            <ArrowRight size={18} />
          </Link>
        </div>
      </Container>
    </div>
  );
}
