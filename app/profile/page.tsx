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

  React.useEffect(() => {
    const loadAllData = async () => {
      try {
        const token = Cookies.get('token');
        const [productsRes, profileRes] = await Promise.all([
          axios.get('https://kampustakas-backend-production.up.railway.app/api/products/my', {
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
        <div className="flex items-center justify-around">
          <div className="mt-[40px]">
            <Image
              className="rounded-2xl border"
              src="https://img.freepik.com/free-vector/bird-colorful-gradient-design-vector_343694-2506.jpg?semt=ais_hybrid&w=740&q=80"
              width={320}
              height={320}
              alt="Profile"
            />
          </div>
          <div>
            <div className="flex gap-2">
              <Badge className="text-white uppercase" variant={'secondary'}>
                Mühendislik Fakültesi
              </Badge>
              <Badge>Aktif Üye</Badge>
            </div>
            <h2 className="text-black text-[34px] font-bold">{userData?.fullName}</h2>
            <p className="text-[15px] text-gray-500 w-[450px]">
              İstanbul Teknik Üniversitesi 3. sınıf öğrencisiyim. Artık ihtiyacım olmayan akademik
              kaynakları ve teknolojik aksesuarları paylaşıyorum.
            </p>
            <div className="flex gap-3 items-center mt-[10px]">
              <Link className="text flex items-center gap-3" href={'/'}>
                <Mail size={20} />
                <p>{userData?.email}</p>
              </Link>
              <Link className="text flex items-center gap-3" href={'/'}>
                <Phone size={20} />
                <p>+90 555 555 55 55</p>
              </Link>
              <Link className="text flex items-center gap-3" href={'/'}>
                <MapPin size={20} />
                <p>Bilecil/Merkez</p>
              </Link>
            </div>
            <Link href={'/settings'} className="mt-[15px] block cursor-pointer">
              <Button className="bg-secondary flex items-center gap-3 cursor-pointer">
                <UserPen />
                Profile düzenle
              </Button>
            </Link>
          </div>
        </div>

        <div className="flex justify-between mt-[30px]">
          <div className="w-[200px] h-[100px] rounded-xl flex items-center justify-center bg-[#f4f2f1]">
            <div className="text-center">
              <h2 className="text-[20px] font-bold">{products.length}</h2>
              <p className="text-[#515151] uppercase text-[14px]">İlan Sayısı</p>
            </div>
          </div>
          <div className="w-[200px] h-[100px] rounded-xl flex items-center justify-center bg-[#f4f2f1]">
            <div className="text-center">
              <h2 className="text-[20px] font-bold">4.9</h2>
              <p className="text-[#515151] uppercase text-[14px]">başarılı takas</p>
            </div>
          </div>
          <div className="w-[200px] h-25 rounded-xl flex items-center justify-center bg-[#f4f2f1]">
            <div className="text-center">
              <h2 className="text-[20px] font-bold">2y+</h2>
              <p className="text-[#515151] uppercase text-[14px]">Üyelik Süresi</p>
            </div>
          </div>
          <div className="w-[200px] h-[100px] rounded-xl flex items-center justify-center bg-[#f4f2f1]">
            <div className="text-center">
              <h2 className="text-[20px] font-bold">8</h2>
              <p className="text-[#515151] uppercase text-[14px]">İlan Sayısı</p>
            </div>
          </div>
        </div>
        <h2 className="text-[27px] text-black font-bold mt-[50px] mb-[30px]">Paylaşılan Ürünler</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link href={'/new-product'}>
            <div className="hover:bg-[#fff] cursor-pointer transition-all flex items-center justify-center shrink-0 h-94 bg-[#ebebeb] border-2 rounded-2xl">
              <div className="flex flex-col items-center text-center">
                <Plus size={30} />
                <p className="text-center text-[14px] text-[#898989]">Yeni ürün ekle</p>
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
