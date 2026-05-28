// components/ProductDetails.tsx
import { MapPin, Clock, Eye } from 'lucide-react';
import DescriptionSection from './description-section';
import { getTimeAgo } from '@/lib/timeAgo';
interface Props {
  title: string;
  category: string;
  campus: string;
  createAt: string;
  viewCount: number;
  description: string;
}
export default function ProductDetails({
  description,
  createAt,
  viewCount,
  title,
  category,
  campus,
}: Props) {
  return (
    <div className="bg-white rounded-[1.5rem] p-7 md:p-10 shadow-sm border border-gray-100 mt-6">
      <div className="flex gap-2 mb-5">
        <span className="bg-gray-100 text-green-800 text-[11px] font-bold px-3 py-1.5 rounded-full tracking-wide">
          {category}
        </span>
      </div>

      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-5 tracking-tight">{title}</h1>

      <div className="flex flex-wrap items-center gap-5 md:gap-8 text-[13px] text-gray-500 border-b border-gray-100 pb-8">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-gray-400" />
          <span className="font-medium">{campus}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-gray-400" />
          <span className="font-medium">{getTimeAgo(createAt)}</span>
        </div>
        <div className="flex items-center gap-2">
          <Eye className="w-4 h-4 text-gray-400" />
          <span className="font-medium">{viewCount} Görüntülenme</span>
        </div>
      </div>

      <DescriptionSection description={description} />
    </div>
  );
}
