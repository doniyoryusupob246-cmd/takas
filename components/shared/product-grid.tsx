// components/ProductGrid.tsx
import ProductCard from '@/components/shared/product-card';

const MOCK_PRODUCTS = [
    {
        id: 1,
        image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=600&auto=format&fit=crop',
        badge: 'YENİ GİBİ',
        category: 'KİTAP',
        title: 'Modern Sanat Tarihi',
    },
    {
        id: 2,
        image: 'https://images.unsplash.com/photo-1586210579191-33b45e38fa2c?q=80&w=600&auto=format&fit=crop',
        badge: 'AZ KULLANILMIŞ',
        category: 'ELEKTRONİK',
        title: 'Kablosuz Klavye & Mouse',
    },
    {
        id: 3,
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=600&auto=format&fit=crop',
        badge: 'İYİ DURUMDA',
        category: 'ÇANTA',
        title: 'Kanvas Sırt Çantası',
    },
    {
        id: 4,
        image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=600&auto=format&fit=crop',
        badge: 'YENİ GİBİ',
        category: 'ELEKTRONİK',
        title: 'Bluetooth Kulaklık',
    },
    {
        id: 5,
        image: 'https://images.unsplash.com/photo-1563805042-7684c8e9e1cb?q=80&w=600&auto=format&fit=crop',
        badge: 'KULLANILMAMIŞ',
        category: 'EV EŞYASI',
        title: 'Seramik Çay Seti',
    },
    {
        id: 6,
        image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=600&auto=format&fit=crop',
        badge: 'AZ KULLANILMIŞ',
        category: 'KIRTASİYE',
        title: 'Çizim Kalem Seti',
    },
];

export default function ProductGrid() {
    return (
        <section className="px-4 pb-16 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {MOCK_PRODUCTS.map((product) => (
                    <ProductCard key={product.id} {...product} />
                ))}
            </div>
        </section>
    );
}
