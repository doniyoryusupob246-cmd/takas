import React from 'react';
import { Container } from '@/components/shared/container';
import { Users, Heart, Target, Leaf, ArrowLeft, ArrowRightLeft } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Hakkımızda | Kampüs Takas',
  description: 'Kampüs Takas vizyonu, misyonu ve öğrenciler için sunduğu sürdürülebilir paylaşım ekosistemi.',
};

export default function HakkimizdaPage() {
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
        <div className="bg-white rounded-[1.5rem] shadow-sm border border-gray-100 p-8 sm:p-12 mb-8 relative overflow-hidden text-center sm:text-left">
          <div className="absolute top-0 right-0 w-48 h-48 bg-green-50 rounded-full transform translate-x-16 -translate-y-16 -z-0 opacity-45" />
          <div className="relative z-10 flex flex-col sm:flex-row items-center gap-8">
            <div className="w-16 h-16 bg-green-100 text-green-700 flex items-center justify-center rounded-2xl shrink-0 shadow-sm">
              <Users size={32} />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">Hakkımızda</h1>
              <p className="text-gray-500 text-base sm:text-lg mt-2 max-w-[600px] leading-relaxed">
                Kampüs Takas, üniversite öğrencileri arasında sürdürülebilir, ekonomik ve güvenli bir paylaşım ağı kurma amacıyla hayata geçirilmiş bir öğrenci platformudur.
              </p>
            </div>
          </div>
        </div>

        {/* Main Content Info */}
        <div className="space-y-8">
          {/* Mission and Vision Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-[1.5rem] p-8 shadow-sm border border-gray-100 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 bg-green-100 text-green-700 flex items-center justify-center rounded-xl mb-5">
                  <Target size={22} />
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-3">Misyonumuz</h2>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  Öğrencilerin akademik kaynaklara, teknolojik ürünlere ve ev eşyalarına harcama yapmadan kolayca ulaşabilmesini sağlamak. Gereksiz tüketimin önüne geçerek öğrenci bütçesini desteklemek ve sürdürülebilir bir tüketim alışkanlığı kazandırmak.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-[1.5rem] p-8 shadow-sm border border-gray-100 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 bg-green-100 text-green-700 flex items-center justify-center rounded-xl mb-5">
                  <Heart size={22} />
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-3">Vizyonumuz</h2>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  Türkiye’deki tüm üniversitelerde öğrencilerin birincil yardımlaşma ve paylaşım adresi olmak. Tüketmek yerine paylaşmayı seçen bilinçli bir kampüs topluluğu oluşturarak paylaşım ekonomisini yaygınlaştırmak.
                </p>
              </div>
            </div>
          </div>

          {/* Core Values Section */}
          <div className="bg-white rounded-[1.5rem] p-8 sm:p-12 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Temel Değerlerimiz</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div className="text-center space-y-3">
                <div className="mx-auto w-12 h-12 bg-green-50 text-green-700 flex items-center justify-center rounded-2xl">
                  <ArrowRightLeft size={24} />
                </div>
                <h3 className="font-bold text-gray-900 text-base">Kolay ve Ücretsiz</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  İhtiyacınız olmayan bir ürünü yükleyin, başka bir ürünle tamamen ücretsiz veya ufak nakit destekleriyle takas edin.
                </p>
              </div>

              <div className="text-center space-y-3">
                <div className="mx-auto w-12 h-12 bg-green-50 text-green-700 flex items-center justify-center rounded-2xl">
                  <Users size={24} />
                </div>
                <h3 className="font-bold text-gray-900 text-base">Güvenli Topluluk</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Sadece doğrulanmış üniversite öğrencileri arasında, kampüsün güvenli sınırları içinde yüz yüze takas imkanı sunuyoruz.
                </p>
              </div>

              <div className="text-center space-y-3">
                <div className="mx-auto w-12 h-12 bg-green-50 text-green-700 flex items-center justify-center rounded-2xl">
                  <Leaf size={24} />
                </div>
                <h3 className="font-bold text-gray-900 text-base">Çevre Dostu</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Tekrar kullanımı teşvik ederek karbon ayak izimizi azaltıyor, sürdürülebilir bir gelecek için birlikte adım atıyoruz.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="bg-green-700 rounded-[1.5rem] p-8 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-green-600/40 via-transparent to-transparent pointer-events-none" />
            <h3 className="text-2xl font-bold mb-3 relative z-10">Topluluğun Bir Parçası Olun</h3>
            <p className="text-green-100 text-sm sm:text-base max-w-xl mx-auto mb-6 relative z-10">
              Kullanmadığınız kitaplarınızı, elektronik eşyalarınızı veya oda eşyalarınızı paylaşarak hem bütçenizi koruyun hem de kampüsteki diğer arkadaşlarınızı destekleyin.
            </p>
            <Link 
              href="/new-product" 
              className="inline-block px-8 py-3.5 bg-white hover:bg-green-50 text-green-800 font-bold rounded-xl text-sm transition-colors relative z-10 cursor-pointer shadow-md"
            >
              İlk İlanını Ver
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
