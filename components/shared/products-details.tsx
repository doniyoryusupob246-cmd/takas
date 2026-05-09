// components/ProductDetails.tsx
import { MapPin, Clock, Eye } from 'lucide-react';
import DescriptionSection from './description-section';

export default function ProductDetails() {
  return (
    <div className="bg-white rounded-[1.5rem] p-7 md:p-10 shadow-sm border border-gray-100 mt-6">
      <div className="flex gap-2 mb-5">
        <span className="bg-gray-100 text-green-800 text-[11px] font-bold px-3 py-1.5 rounded-full tracking-wide">Elektronik</span>
        <span className="bg-gray-100 text-green-800 text-[11px] font-bold px-3 py-1.5 rounded-full tracking-wide">Tablet</span>
      </div>
      
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-5 tracking-tight">
        iPad Pro 11 inç (M2 Çip, 256GB)
      </h1>

      <div className="flex flex-wrap items-center gap-5 md:gap-8 text-[13px] text-gray-500 border-b border-gray-100 pb-8">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-gray-400" />
          <span className="font-medium">ODTÜ Kampüsü</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-gray-400" />
          <span className="font-medium">2 saat önce yüklendi</span>
        </div>
        <div className="flex items-center gap-2">
          <Eye className="w-4 h-4 text-gray-400" />
          <span className="font-medium">142 Görüntülenme</span>
        </div>
      </div>

      <DescriptionSection />
    </div>
  );
}
