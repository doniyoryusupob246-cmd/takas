import React from 'react';
import { Container } from '@/components/shared/container';
import { ShieldCheck, Mail, ArrowLeft, Eye, Lock, FileText } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Gizlilik Politikası | Kampüs Takas',
  description: 'Kampüs Takas kullanıcılarının kişisel verilerinin korunması ve gizlilik politikası detayları.',
};

export default function GizlilikPolitikasiPage() {
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

        {/* Header Hero Section */}
        <div className="bg-white rounded-[1.5rem] shadow-sm border border-gray-100 p-8 sm:p-10 mb-8 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-full transform translate-x-10 -translate-y-10 -z-0 opacity-50" />
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center gap-5">
            <div className="w-12 h-12 bg-green-100 text-green-700 flex items-center justify-center rounded-2xl shrink-0">
              <ShieldCheck size={26} />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Gizlilik Politikası</h1>
              <p className="text-gray-500 text-xs sm:text-sm mt-1">Son Güncelleme: 30 Mayıs 2026</p>
            </div>
          </div>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-[1.5rem] shadow-sm border border-gray-100 p-8 sm:p-12 space-y-10">
          
          {/* Section 1 */}
          <section className="space-y-4">
            <h2 className="flex items-center gap-3 text-lg sm:text-xl font-bold text-gray-900">
              <span className="w-1.5 h-6 bg-green-600 rounded-full block" />
              1. Giriş
            </h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Kampüs Takas olarak, kullanıcılarımızın gizliliğine son derece önem veriyoruz. Bu Gizlilik Politikası, platformumuzu kullandığınızda kişisel verilerinizin nasıl toplandığını, kullanıldığını, korunduğunu ve hangi haklara sahip olduğunuzu açıklamaktadır. Hizmetlerimizi kullanarak, bu politikada belirtilen esasları kabul etmiş sayılmaktasınız.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-4">
            <h2 className="flex items-center gap-3 text-lg sm:text-xl font-bold text-gray-900">
              <span className="w-1.5 h-6 bg-green-600 rounded-full block" />
              2. Toplanan Veriler
            </h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Platforma üye olurken ve platformu kullanırken aşağıdaki verileri toplamaktayız:
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-4">
              <li className="flex items-start gap-2.5 text-gray-600 text-sm sm:text-base">
                <span className="text-green-600 font-bold mt-0.5">•</span>
                <span><strong>Hesap Bilgileri:</strong> Ad Soyad, E-posta adresi, Şifre.</span>
              </li>
              <li className="flex items-start gap-2.5 text-gray-600 text-sm sm:text-base">
                <span className="text-green-600 font-bold mt-0.5">•</span>
                <span><strong>Profil Bilgileri:</strong> Profil fotoğrafı, biyografi, kampüs ve bölüm bilgileri.</span>
              </li>
              <li className="flex items-start gap-2.5 text-gray-600 text-sm sm:text-base">
                <span className="text-green-600 font-bold mt-0.5">•</span>
                <span><strong>İlan Bilgileri:</strong> Yüklediğiniz ürün görselleri, açıklamaları ve takas koşulları.</span>
              </li>
              <li className="flex items-start gap-2.5 text-gray-600 text-sm sm:text-base">
                <span className="text-green-600 font-bold mt-0.5">•</span>
                <span><strong>Teklifler ve Mesajlar:</strong> Gönderilen takas teklifleri ve kullanıcılar arası iletişim.</span>
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-4">
            <h2 className="flex items-center gap-3 text-lg sm:text-xl font-bold text-gray-900">
              <span className="w-1.5 h-6 bg-green-600 rounded-full block" />
              3. Verilerin Kullanım Amaçları
            </h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Toplanan kişisel verileriniz, yalnızca aşağıdaki amaçlar doğrultusunda işlenmektedir:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              <div className="p-4 bg-gray-50 border border-gray-100 rounded-2xl flex gap-3">
                <Eye className="text-green-600 shrink-0 w-5 h-5 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">Hizmetin Sunulması</h4>
                  <p className="text-gray-500 text-xs mt-1">Takas ilanlarının yayınlanması ve teklif süreçlerinin yönetilmesi.</p>
                </div>
              </div>
              <div className="p-4 bg-gray-50 border border-gray-100 rounded-2xl flex gap-3">
                <Lock className="text-green-600 shrink-0 w-5 h-5 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">Güvenliğin Sağlanması</h4>
                  <p className="text-gray-500 text-xs mt-1">Platform içi suistimallerin ve şüpheli aktivitelerin önlenmesi.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section className="space-y-4">
            <h2 className="flex items-center gap-3 text-lg sm:text-xl font-bold text-gray-900">
              <span className="w-1.5 h-6 bg-green-600 rounded-full block" />
              4. Veri Güvenliği ve Saklama
            </h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Verileriniz, yetkisiz erişim, kayıp veya ifşa risklerine karşı korumak amacıyla güvenli veri sunucularında saklanmaktadır. Veri koruma protokollerimiz düzenli olarak gözden geçirilmekte ve güncellenmektedir. Kişisel verileriniz, üyeliğiniz devam ettiği sürece veya yasal yükümlülükler gerektirdiği müddetçe saklanacaktır.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-4">
            <h2 className="flex items-center gap-3 text-lg sm:text-xl font-bold text-gray-900">
              <span className="w-1.5 h-6 bg-green-600 rounded-full block" />
              5. Çerezler (Cookies)
            </h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Kampüs Takas, oturum durumunuzu doğrulamak ve tercihlerinizi hatırlamak amacıyla çerezleri (cookies) kullanmaktadır. Tarayıcı ayarlarınızdan çerezleri engelleyebilirsiniz ancak bu durumda platformun bazı özellikleri tam olarak çalışmayabilir.
            </p>
          </section>

          {/* Contact Section */}
          <div className="mt-12 p-6 sm:p-8 bg-green-50/50 rounded-[1.5rem] border border-green-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-green-100 text-green-700 flex items-center justify-center rounded-xl shrink-0 mt-1 sm:mt-0">
                <Mail size={20} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-base">Sorularınız mı var?</h3>
                <p className="text-gray-500 text-sm mt-0.5">Gizlilik politikamızla ilgili tüm sorularınız için bize ulaşabilirsiniz.</p>
              </div>
            </div>
            <a 
              href="mailto:kampustakas@gmail.com" 
              className="px-6 py-3 bg-green-700 hover:bg-green-800 text-white font-medium rounded-xl text-sm transition-colors cursor-pointer shrink-0 w-full sm:w-auto text-center"
            >
              İletişime Geç
            </a>
          </div>

        </div>
      </Container>
    </div>
  );
}
