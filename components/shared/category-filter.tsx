'use client';
import { Book, PenTool, Laptop, Briefcase, Home } from 'lucide-react';
import React from 'react';

const categories = [
  { name: 'Tümü', icon: null },
  { name: 'Kitap', icon: Book },
  { name: 'Kırtasiye', icon: PenTool },
  { name: 'Elektronik', icon: Laptop },
  { name: 'Çanta', icon: Briefcase },
  { name: 'Ev Eşyası', icon: Home },
];

export default function CategoryFilter() {
  const [activeCat, setActiveCat] = React.useState('Tümü');
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 mb-10 px-4 max-w-5xl mx-auto">
      {categories.map((category) => {
        const Icon = category.icon;
        const isActive = activeCat === category.name;
        return (
          <button
            onClick={() => setActiveCat(category.name)}
            key={category.name}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-colors ${
              isActive
                ? 'bg-green-700 text-white shadow-sm'
                : 'bg-gray-100/80 text-gray-600 hover:bg-gray-200'
            }`}>
            {Icon && <Icon className="w-4 h-4" />}
            {category.name}
          </button>
        );
      })}
    </div>
  );
}
