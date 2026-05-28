// components/DescriptionSection.tsx
interface Props {
  description: string;
}
export default function DescriptionSection({ description }: Props) {
  return (
    <div className="mt-10">
      <h3 className="text-lg font-bold text-gray-900 mb-5">Açıklama</h3>
      <div className="text-gray-600 text-[15px] leading-relaxed space-y-5 mb-10 max-w-4xl">
        <p>{description}</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-100 rounded-xl py-5 px-4 flex flex-col items-center justify-center text-center shadow-sm">
          <span className="text-[11px] text-gray-400 uppercase tracking-widest font-semibold mb-1.5">
            DURUM
          </span>
          <span className="text-sm font-semibold text-green-700">Yeni Gibi</span>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl py-5 px-4 flex flex-col items-center justify-center text-center shadow-sm">
          <span className="text-[11px] text-gray-400 uppercase tracking-widest font-semibold mb-1.5">
            GARANTİ
          </span>
          <span className="text-sm font-semibold text-gray-900">14 Ay Kaldı</span>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl py-5 px-4 flex flex-col items-center justify-center text-center shadow-sm">
          <span className="text-[11px] text-gray-400 uppercase tracking-widest font-semibold mb-1.5">
            TAKAS
          </span>
          <span className="text-sm font-semibold text-gray-900">Mümkün</span>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl py-5 px-4 flex flex-col items-center justify-center text-center shadow-sm">
          <span className="text-[11px] text-gray-400 uppercase tracking-widest font-semibold mb-1.5">
            KARGO
          </span>
          <span className="text-sm font-semibold text-gray-900">Elden</span>
        </div>
      </div>
    </div>
  );
}
