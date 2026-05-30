import React from 'react';
import { Container } from '@/components/shared/container';
import { FileText, Mail, ArrowLeft, Info, HelpCircle, FileCheck } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'KVKK Aydınlatma Metni | Kampüs Takas',
  description: 'Kampüs Takas Kişisel Verilerin Korunması Kanunu (KVKK) aydınlatma metni ve haklarınız.',
};

export default function KVKKPage() {
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
              <FileCheck size={26} />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">KVKK Aydınlatma Metni</h1>
              <p className="text-gray-500 text-xs sm:text-sm mt-1">6698 Sayılı Kişisel Verilerin Korunması Kanunu Kapsamında Bilgilendirme</p>
            </div>
          </div>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-[1.5rem] shadow-sm border border-gray-100 p-8 sm:p-12 space-y-10">
          
          {/* Section 1 */}
          <section className="space-y-4">
            <h2 className="flex items-center gap-3 text-lg sm:text-xl font-bold text-gray-900">
              <span className="w-1.5 h-6 bg-green-600 rounded-full block" />
              1. Veri Sorumlusu
            </h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              6698 sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”) uyarınca, kişisel verileriniz veri sorumlusu sıfatıyla <strong>Kampüs Takas</strong> tarafından aşağıda açıklanan kapsamda işlenebilecektir.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-4">
            <h2 className="flex items-center gap-3 text-lg sm:text-xl font-bold text-gray-900">
              <span className="w-1.5 h-6 bg-green-600 rounded-full block" />
              2. Kişisel Verilerinizin İşlenme Amacı
            </h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Toplanan kişisel verileriniz, Kanun’un 5. ve 6. maddelerinde belirtilen kişisel veri işleme şartları ve amaçları dahilinde, aşağıdaki süreçlerin yürütülmesi amacıyla işlenmektedir:
            </p>
            <ul className="space-y-3.5 pl-2 mt-2">
              <li className="flex gap-3 text-gray-600 text-sm sm:text-base">
                <Info size={18} className="text-green-600 shrink-0 mt-1" />
                <span>Üyeliğinizin oluşturulması, takas ilanlarınızın yayınlanması ve teklif süreçlerinin yürütülmesi.</span>
              </li>
              <li className="flex gap-3 text-gray-600 text-sm sm:text-base">
                <Info size={18} className="text-green-600 shrink-0 mt-1" />
                <span>Kampüs içi güvenli takas süreçlerinin desteklenmesi ve kullanıcı hesaplarının doğrulanması.</span>
              </li>
              <li className="flex gap-3 text-gray-600 text-sm sm:text-base">
                <Info size={18} className="text-green-600 shrink-0 mt-1" />
                <span>Platform içi şikayetlerin, isteklerin ve geri bildirimlerin değerlendirilerek müşteri memnuniyetinin artırılması.</span>
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-4">
            <h2 className="flex items-center gap-3 text-lg sm:text-xl font-bold text-gray-900">
              <span className="w-1.5 h-6 bg-green-600 rounded-full block" />
              3. İşlenen Kişisel Verilerin Aktarılması
            </h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Kişisel verileriniz; Kampüs Takas platformu dışındaki üçüncü şahıslarla ticari amaçlarla kesinlikle **paylaşılmamaktadır**. Ancak yasal yükümlülüklerin yerine getirilmesi amacıyla, yetkili kamu kurum ve kuruluşları ile adli makamlardan gelen talepler doğrultusunda kanuni sınırlar çerçevesinde paylaşılabilecektir.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-4">
            <h2 className="flex items-center gap-3 text-lg sm:text-xl font-bold text-gray-900">
              <span className="w-1.5 h-6 bg-green-600 rounded-full block" />
              4. Kişisel Veri Sahibinin Kanun’un 11. Maddesinde Sayılan Hakları
            </h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-4">
              Kişisel veri sahibi olarak KVKK kapsamında aşağıdaki haklara sahipsiniz:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 border border-gray-100 rounded-2xl">
                <p className="text-gray-700 text-sm sm:text-base font-medium">Bilgi Alma Hakları</p>
                <ul className="text-gray-500 text-xs sm:text-sm space-y-1.5 mt-2 pl-2 list-disc">
                  <li>Verilerinizin işlenip işlenmediğini öğrenme.</li>
                  <li>İşlenmişse buna ilişkin bilgi talep etme.</li>
                  <li>İşlenme amacını ve uygun kullanılıp kullanılmadığını öğrenme.</li>
                </ul>
              </div>
              <div className="p-4 bg-gray-50 border border-gray-100 rounded-2xl">
                <p className="text-gray-700 text-sm sm:text-base font-medium">Düzeltme ve Silme Hakları</p>
                <ul className="text-gray-500 text-xs sm:text-sm space-y-1.5 mt-2 pl-2 list-disc">
                  <li>Eksik veya yanlış işlenmişse düzeltilmesini isteme.</li>
                  <li>Kanuni şartlar oluştuğunda silinmesini veya yok edilmesini isteme.</li>
                  <li>İtiraz etme ve zararın giderilmesini talep etme.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 5 */}
          <section className="space-y-4">
            <h2 className="flex items-center gap-3 text-lg sm:text-xl font-bold text-gray-900">
              <span className="w-1.5 h-6 bg-green-600 rounded-full block" />
              5. Haklarınızı Kullanmak İçin Başvuru
            </h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              KVKK kapsamındaki haklarınızı kullanmak ve kişisel verilerinizle ilgili bilgi almak için taleplerinizi, sistemimizde kayıtlı e-posta adresiniz üzerinden doğrudan bize iletebilirsiniz. Talebiniz en kısa sürede ve en geç otuz (30) gün içinde ücretsiz olarak değerlendirilecektir.
            </p>
          </section>

          {/* Contact Section */}
          <div className="mt-12 p-6 sm:p-8 bg-green-50/50 rounded-[1.5rem] border border-green-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-green-100 text-green-700 flex items-center justify-center rounded-xl shrink-0 mt-1 sm:mt-0">
                <Mail size={20} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-base">KVKK İletişim Hattı</h3>
                <p className="text-gray-500 text-sm mt-0.5">Kişisel veri haklarınız ile ilgili taleplerinizi bize yazabilirsiniz.</p>
              </div>
            </div>
            <a 
              href="mailto:kampustakas@gmail.com" 
              className="px-6 py-3 bg-green-700 hover:bg-green-800 text-white font-medium rounded-xl text-sm transition-colors cursor-pointer shrink-0 w-full sm:w-auto text-center"
            >
              KVKK Talebi Gönder
            </a>
          </div>

        </div>
      </Container>
    </div>
  );
}
