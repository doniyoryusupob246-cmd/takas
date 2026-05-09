// components/CategoryFilter.tsx
import { Book, PenTool, Laptop, Briefcase, Home } from 'lucide-react';

const categories = [
    { name: 'Tümü', icon: null, active: true },
    { name: 'Kitap', icon: Book, active: false },
    { name: 'Kırtasiye', icon: PenTool, active: false },
    { name: 'Elektronik', icon: Laptop, active: false },
    { name: 'Çanta', icon: Briefcase, active: false },
    { name: 'Ev Eşyası', icon: Home, active: false },
];

export default function CategoryFilter() {
    return (
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10 px-4 max-w-5xl mx-auto">
            {categories.map((category) => {
                const Icon = category.icon;
                return (
                    <button
                        key={category.name}
                        className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-colors ${category.active
                                ? 'bg-green-700 text-white shadow-sm'
                                : 'bg-gray-100/80 text-gray-600 hover:bg-gray-200'
                            }`}
                    >
                        {Icon && <Icon className="w-4 h-4" />}
                        {category.name}
                    </button>
                );
            })}
        </div>
    );
}
