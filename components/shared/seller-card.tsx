// components/SellerCard.tsx
import { Star } from 'lucide-react';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { getInitials } from '@/lib/getInitials';
interface Props {
  ownerName: string;
  campus: string;
}

export default function SellerCard({ campus, ownerName }: Props) {
  return (
    <div className="border-t border-gray-100 pt-6 mt-6">
      <div className="flex items-center gap-4 mb-6">
        <Avatar className="w-[40px] h-[40px]">
          <AvatarFallback>{getInitials(ownerName)}</AvatarFallback>
        </Avatar>
        <div>
          <h4 className="font-semibold text-gray-900">{ownerName}</h4>
        </div>
      </div>

      <div className="space-y-3.5 text-sm mb-7">
        <div className="flex justify-between items-center">
          <span className="text-gray-500">Kampüs</span>
          <span className="font-medium text-gray-900">{campus}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-500">Üyelik</span>
          <span className="font-medium text-gray-900">2 Yıldır Üye</span>
        </div>
      </div>

      {/* <button className="w-full text-green-700 font-bold text-sm hover:text-green-800 transition-colors">
        Tüm İlanlarını Gör
      </button> */}
    </div>
  );
}
