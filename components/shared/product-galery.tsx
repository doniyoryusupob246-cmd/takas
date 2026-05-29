import { ProdcutImage } from '@/app/products/[id]/page';

interface Props {
  images: ProdcutImage[];
  condition: string;
}

export default function ProductGallery({ images, condition }: Props) {
  // Высчитываем, сколько картинок осталось "за кадром" (если их больше 3)
  const remainingCount = images?.length > 3 ? images.length - 3 : 0;
  const hasMoreImages = images?.length > 1;

  if (!hasMoreImages) {
    return (
      <div className="bg-white rounded-[1.5rem] p-8 flex items-center justify-center relative shadow-sm border border-gray-100 min-h-[300px] md:h-[540px]">
        <div className="absolute top-5 left-5 bg-green-800 text-white text-[11px] font-bold px-3.5 py-1.5 rounded-full tracking-wide z-10">
          {condition}
        </div>

        {images?.[0] && (
          <img
            src={images[0].imageUrl}
            alt="Ana Görsel"
            className="w-full h-full object-contain drop-shadow-xl"
          />
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-8 gap-4 lg:gap-6 md:h-[540px]">
      {/* Left Column - Main Image */}
      <div className="md:col-span-5 bg-white rounded-[1.5rem] p-8 flex items-center justify-center relative shadow-sm border border-gray-100 min-h-[300px] md:min-h-0 h-full">
        <div className="absolute top-5 left-5 bg-green-800 text-white text-[11px] font-bold px-3.5 py-1.5 rounded-full tracking-wide z-10">
          {condition}
        </div>

        {/* Проверяем, есть ли хотя бы 1 картинка */}
        {images?.[0] && (
          <img
            src={images[0].imageUrl}
            alt="Ana Görsel"
            className="w-full h-full object-contain drop-shadow-xl"
          />
        )}
      </div>

      {/* Middle Column - Gallery stack */}
      <div className="md:col-span-3 flex flex-row md:flex-col gap-4 lg:gap-6 h-[140px] md:h-full">
        {/* Top Right - 2nd Image */}
        <div className="flex-1 bg-white rounded-[1.5rem] overflow-hidden shadow-sm border border-gray-100 flex items-center justify-center">
          {images?.[1] ? (
            <img src={images[1].imageUrl} alt="Görsel 2" className="w-full h-full object-cover" />
          ) : (
            // Заглушка, если второй картинки нет, чтобы верстка не сломалась
            <span className="text-gray-300 text-sm">Görsel Yok</span>
          )}
        </div>

        {/* Bottom Right - 3rd Image with Overlay */}
        <div className="flex-1 bg-black rounded-[1.5rem] overflow-hidden shadow-sm border border-gray-100 relative group cursor-pointer flex items-center justify-center">
          {images?.[2] ? (
            <>
              <img
                src={images[2].imageUrl}
                alt="Görsel 3"
                // Если есть еще фотки, делаем картинку затемненной, если нет — оставляем обычной
                className={`w-full h-full object-cover ${
                  remainingCount > 0
                    ? 'opacity-40 transition-opacity group-hover:opacity-30'
                    : 'opacity-100'
                }`}
              />

              {/* Показываем счетчик только если реально есть скрытые картинки */}
              {remainingCount > 0 && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white font-medium text-lg">+{remainingCount} Görsel</span>
                </div>
              )}
            </>
          ) : (
            // Заглушка, если третьей картинки нет
            <span className="text-gray-600 text-sm">Görsel Yok</span>
          )}
        </div>
      </div>
    </div>
  );
}
