// components/ProductInfoPanel.tsx
import { MessageSquare, ShieldCheck, ArrowRightLeft } from 'lucide-react';
import SellerCard from './seller-card';

export default function ProductInfoPanel() {
    return (
        <div className="flex flex-col gap-6 h-full">
            {/* Main Info Card */}
            <div className="bg-white rounded-[1.5rem] p-7 shadow-sm border border-gray-100">
                <div className="mb-6">
                    <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider block mb-2">Tahmini Takas Değeri</span>
                    <h2 className="text-3xl font-bold text-green-700">₺24.500 - ₺27.000</h2>
                </div>

                <div className="space-y-3">
                    <button className="w-full bg-green-700 hover:bg-green-800 text-white font-medium py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2.5">
                        <ArrowRightLeft className="w-5 h-5" />
                        Takas Teklifi Gönder
                    </button>
                    <button className="w-full bg-white hover:bg-gray-50 text-green-700 font-medium py-3.5 rounded-xl transition-colors border-2 border-green-700/20 flex items-center justify-center gap-2.5">
                        <MessageSquare className="w-5 h-5" />
                        Mesaj Gönder
                    </button>
                </div>

                <SellerCard />
            </div>

            {/* Safety Tip Card */}
            <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 flex gap-4">
                <div className="shrink-0 mt-0.5">
                    <ShieldCheck className="w-6 h-6 text-green-700" />
                </div>
                <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-1.5">Güvenli Takas İpucu</h4>
                    <p className="text-[13px] text-gray-500 leading-relaxed">
                        Takas işlemlerinizi her zaman kampüs içindeki güvenli alanlarda ve kalabalık saatlerde gerçekleştirin.
                    </p>
                </div>
            </div>
        </div>
    );
}
