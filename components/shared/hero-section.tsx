// components/HeroSection.tsx
import { Search } from 'lucide-react';

export default function HeroSection() {
    return (
        <section className="text-center py-12 px-4 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
                İhtiyacın olmayanı ver, <span className="text-green-600">istediğini al.</span>
            </h1>
            <p className="text-gray-500 text-base md:text-lg mb-8 max-w-2xl mx-auto">
                Kampüsteki diğer öğrencilerle güvenle takas yap, bütçeni koru ve topluluğun bir parçası ol.
            </p>

            <div className="max-w-2xl mx-auto relative shadow-sm rounded-full bg-white">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                    type="text"
                    className="block w-full pl-12 pr-6 py-4 rounded-full border border-gray-100 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition-shadow shadow-sm text-lg"
                    placeholder="Ürün ara..."
                />
            </div>
        </section>
    );
}
