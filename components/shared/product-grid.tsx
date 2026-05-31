import ProductCard from '@/components/shared/product-card';
import axios from 'axios';
import React from 'react';
import { Product } from '@/app/products/[id]/page';
import { cookies } from 'next/headers';

interface Props {
  search?: string;
  category?: string;
}

export default async function ProductGrid({ search, category }: Props) {
  let products: Product[] = [];
  let loggedInUserId: number | null = null;
  let loggedInUserFullName = '';

  try {
    // Считывание токена авторизации из cookies
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (token) {
      const meRes = await axios.get(
        'https://kampustakas-backend-production-26c9.up.railway.app/api/auth/me',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      loggedInUserId = meRes.data?.data?.id || null;
      loggedInUserFullName = meRes.data?.data?.fullName || '';
    }
  } catch (err) {
    console.error('Error fetching me in ProductGrid:', err);
  }

  try {
    const res = await axios.get(
      'https://kampustakas-backend-production-26c9.up.railway.app/api/products',
    );
    products = res.data.data || [];

    // Исключение собственных товаров текущего пользователя
    if (loggedInUserId || loggedInUserFullName) {
      products = products.filter((product) => {
        const ownerId = product.ownerId || product.userId;
        if (ownerId && loggedInUserId) {
          return ownerId !== loggedInUserId;
        }
        // Откат на имя, если ID не предоставлен бэкендом
        return product.ownerName !== loggedInUserFullName;
      });
    }

    // Фильтрация по категории
    if (category && category !== 'Tümü') {
      products = products.filter(
        (product) => product.categoryName?.toLowerCase() === category.toLowerCase(),
      );
    }

    // Фильтрация по поисковому запросу
    if (search) {
      const q = search.toLowerCase();
      products = products.filter(
        (product) =>
          product.title?.toLowerCase().includes(q) ||
          product.description?.toLowerCase().includes(q),
      );
    }
  } catch (error: any) {
    console.error('Error fetching products:', error);
  }

  return (
    <section className="px-4 pb-16 max-w-7xl mx-auto">
      {products.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500 text-lg">Aradığınız kriterlere uygun ürün bulunamadı.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      )}
    </section>
  );
}
