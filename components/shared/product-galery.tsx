// components/ProductGallery.tsx
export default function ProductGallery() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-8 gap-4 lg:gap-6 md:h-[540px]">
            {/* Left Column - Main Image */}
            <div className="md:col-span-5 bg-white rounded-[1.5rem] p-8 flex items-center justify-center relative shadow-sm border border-gray-100 min-h-[300px] md:min-h-0 h-full">
                <div className="absolute top-5 left-5 bg-green-800 text-white text-[11px] font-bold px-3.5 py-1.5 rounded-full tracking-wide z-10">
                    Yeni
                </div>
                <img
                    src="https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=800&auto=format&fit=crop"
                    alt="iPad Pro"
                    className="w-full h-full object-contain drop-shadow-xl"
                />
            </div>

            {/* Middle Column - Gallery stack */}
            <div className="md:col-span-3 flex flex-row md:flex-col gap-4 lg:gap-6 h-[140px] md:h-full">
                <div className="flex-1 bg-white rounded-[1.5rem] overflow-hidden shadow-sm border border-gray-100">
                    <img
                        src="https://images.unsplash.com/photo-1606857521015-7f9fcf423740?q=80&w=400&auto=format&fit=crop"
                        alt="Gallery Texture"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="flex-1 bg-black rounded-[1.5rem] overflow-hidden shadow-sm border border-gray-100 relative group cursor-pointer">
                    <img
                        src="https://images.unsplash.com/photo-1517059224940-d4af9eec41b7?q=80&w=400&auto=format&fit=crop"
                        alt="More Images"
                        className="w-full h-full object-cover opacity-40 transition-opacity group-hover:opacity-30"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-white font-medium text-lg">+4 Görsel</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
