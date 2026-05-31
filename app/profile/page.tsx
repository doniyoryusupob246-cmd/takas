'use client';

import { Container } from '@/components/shared/container';
import ProductCard from '@/components/shared/product-card';
import { SkeletonProfile } from '@/components/shared/skeleton-profile';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { fetchUserProfile } from '@/lib/axios';
import { Mail, MapPin, Phone, Plus, UserPen } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';
import axios from 'axios';
import { Product } from '../products/[id]/page';
export interface User {
  id: number;
  fullName: string;
  email: string;
  phone: string | null;
  department: string | null;
  campus: string | null;
  bio: string | null;
  avatarUrl: string | null;
  role: string;
  rating: number;
  successfulSwaps: number;
  createdAt: string;
}

export default function ProfilePage() {
  const [userData, setUserData] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [products, setProducts] = React.useState<Product[]>([]);

  // Умная функция для расчета времени на турецком
  const calculateMembershipDuration = (dateString?: string) => {
    if (!dateString) return '-';

    const createdAt = new Date(dateString);
    const now = new Date();

    // Разница в миллисекундах
    const diffInMs = now.getTime() - createdAt.getTime();
    // Переводим в дни
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return 'Yeni'; // Сегодня зарегистрировался
    if (diffInDays < 30) return `${diffInDays} gün`; // До месяца пишем в днях
    if (diffInDays < 365) {
      const months = Math.floor(diffInDays / 30);
      return `${months} ay`; // До года пишем в месяцах
    }

    const years = Math.floor(diffInDays / 365);
    return `${years}y+`; // Больше года пишем в годах
  };

  React.useEffect(() => {
    const loadAllData = async () => {
      try {
        const token = Cookies.get('token');
        const [productsRes, profileRes] = await Promise.all([
          axios.get('https://kampustakas-backend-production-26c9.up.railway.app/api/products/my', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetchUserProfile(),
        ]);
        setProducts(productsRes.data.data);
        setUserData(profileRes.data);
      } catch (error: any) {
        console.error('Ошибка загрузки данных страницы:', error);

        if (error.response?.status === 401) {
          toast.error('Oturum süreniz doldu. Lütfen tekrar giriş yapın.');
          Cookies.remove('token');
          localStorage.removeItem('user');
          window.location.href = '/login';
        }
      } finally {
        setLoading(false);
      }
    };
    loadAllData();
  }, []);
  console.log(products);

  if (loading) return <SkeletonProfile />;
  return (
    <div className="mb-[100px]">
      <Container className="max-w-[1140px]">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-around gap-8 md:gap-10">
          <div className="mt-6 md:mt-[40px] flex justify-center w-full md:w-auto">
            <Image
              className="rounded-2xl border w-full max-w-[280px] sm:max-w-[320px] h-auto object-cover"
              src={
                userData?.avatarUrl ||
                'https://img.freepik.com/free-vector/bird-colorful-gradient-design-vector_343694-2506.jpg?semt=ais_hybrid&w=740&q=80'
              }
              width={320}
              height={320}
              alt="Profile"
            />
          </div>
          <div className="flex flex-col items-center md:items-start text-center md:text-left mt-6 md:mt-[40px] max-w-[500px]">
            <div className="flex gap-2 justify-center md:justify-start">
              <Badge className="text-white uppercase" variant={'secondary'}>
                {userData?.campus}
              </Badge>
              <Badge>Aktif Üye</Badge>
            </div>
            <h2 className="text-black text-[30px] md:text-[34px] font-bold mt-2">
              {userData?.fullName}
            </h2>
            <p className="text-[15px] text-gray-500 w-full max-w-[450px] mt-2">{userData?.bio}</p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start items-center mt-[15px] text-sm">
              <Link className="flex items-center gap-2 hover:text-secondary transition" href={'/'}>
                <Mail size={18} />
                <span>{userData?.email}</span>
              </Link>
              <Link
                className="flex items-center gap-2 hover:text-secondary transition"
                href={`tel:${userData?.phone}`}>
                <Phone size={18} />
                <span>{userData?.phone}</span>
              </Link>
              <div className="flex items-center gap-2 hover:text-secondary transition">
                <MapPin size={18} />
                <span>{userData?.campus}</span>
              </div>
            </div>
            <Link href={'/settings'} className="mt-[20px] block cursor-pointer">
              <Button className="bg-secondary flex items-center gap-3 cursor-pointer">
                <UserPen size={18} />
                Profile düzenle
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-[40px]">
          <div className="h-[100px] rounded-xl flex items-center justify-center bg-[#f4f2f1] p-4">
            <div className="text-center">
              <h2 className="text-[20px] font-bold">{products.length}</h2>
              <p className="text-[#515151] uppercase text-[12px] md:text-[14px]">İlan Sayısı</p>
            </div>
          </div>
          {/* <div className="h-[100px] rounded-xl flex items-center justify-center bg-[#f4f2f1] p-4">
            <div className="text-center">
              <h2 className="text-[20px] font-bold">4.9</h2>
              <p className="text-[#515151] uppercase text-[12px] md:text-[14px]">başarılı takas</p>
            </div>
          </div> */}
          <div className="h-[100px] rounded-xl flex items-center justify-center bg-[#f4f2f1] p-4">
            <div className="text-center">
              <h2 className="text-[20px] font-bold">
                {calculateMembershipDuration(userData?.createdAt)}
              </h2>
              <p className="text-[#515151] uppercase text-[12px] md:text-[14px]">Üyelik Süresi</p>
            </div>
          </div>
          {/* <div className="h-[100px] rounded-xl flex items-center justify-center bg-[#f4f2f1] p-4">
            <div className="text-center">
              <h2 className="text-[20px] font-bold">8</h2>
              <p className="text-[#515151] uppercase text-[12px] md:text-[14px]">İlan Sayısı</p>
            </div>
          </div> */}
        </div>
        <h2 className="text-[27px] text-black font-bold mt-[50px] mb-[30px]">Paylaşılan Ürünler</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link href={'/new-product'} className="h-full flex">
            <div className="hover:bg-white hover:border-green-600 hover:shadow-md cursor-pointer transition-all flex items-center justify-center w-full min-h-[350px] md:h-full bg-gray-50 border-2 border-dashed border-gray-300 rounded-2xl p-5 flex-grow">
              <div className="flex flex-col items-center text-center">
                <Plus size={30} className="text-gray-400" />
                <p className="text-center text-sm font-semibold text-gray-500 mt-2">
                  Yeni ürün ekle
                </p>
              </div>
            </div>
          </Link>
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </Container>
    </div>
  );
}
