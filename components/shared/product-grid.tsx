import ProductCard from '@/components/shared/product-card';
import axios from 'axios';
import React from 'react';
import { Product } from '@/app/products/[id]/page';

export default async function ProductGrid() {
  let products: Product[] = [];
  try {
    const res = await axios.get(
      'https://kampustakas-backend-production.up.railway.app/api/products',
    );
    products = res.data.data;
  } catch (error: any) {
    console.error('Ошибка загрузки профиля', error);
  }
  return (
    <section className="px-4 pb-16 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </section>
  );
}
