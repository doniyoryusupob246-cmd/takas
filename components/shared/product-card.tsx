// components/ProductCard.tsx
import { Tag } from 'lucide-react';
import Link from 'next/link';

interface ProductCardProps {
    image: string;
    badge: string;
    category: string;
    title: string;
}

export default function ProductCard({ image, badge, category, title }: ProductCardProps) {
    return (
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col">
            <div className="relative h-56 w-full bg-gray-100 shrink-0">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm text-gray-700 px-3 py-1.5 text-[10px] font-bold rounded-full shadow-sm tracking-wide">
                    {badge}
                </div>
            </div>
            <div className="p-5 flex flex-col flex-grow">
                <p className="text-[11px] font-bold text-green-700 uppercase tracking-wider mb-2">
                    {category}
                </p>
                <h3 className="text-gray-900 font-semibold text-lg mb-5 line-clamp-1">
                    {title}
                </h3>
                <div className="mt-auto">
                    <Link href={"/products"}><button className="w-full bg-green-700 hover:bg-green-800 text-white py-2.5 rounded-lg flex items-center justify-center gap-2 font-medium text-sm transition-colors">
                        <Tag className="w-4 h-4" />
                        Takas Teklif Et
                    </button></Link>
                </div>
            </div>
        </div>
    );
}
