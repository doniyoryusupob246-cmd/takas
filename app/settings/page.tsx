'use client';

import { Container } from '@/components/shared/container';
import { Button } from '@/components/ui/button';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';
import React, { useRef } from 'react';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import axios from 'axios';
import Cookies from 'js-cookie';

// Схема валидации
const formSchema = z.object({
  fullName: z.string().min(3, 'Min 3').max(30, 'Max 30'),
  email: z.string().email('Geçerli bir e-posta adresi giriniz.'),
  phone: z.string().nullable().or(z.string().optional()),
  bio: z.string().max(200, 'Max 200 karakter').nullable().or(z.string().optional()),
  campus: z.string().min(3, 'Min 3').max(40, 'Max 40').nullable().or(z.string().optional()),
  avatarUrl: z.string().nullable().or(z.string().optional()),
});

type Form = z.infer<typeof formSchema>;

export default function SettingsPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = React.useState<any | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [isUploading, setIsUploading] = React.useState(false);
  const [isSavingProfile, setIsSavingProfile] = React.useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    handleSubmit,
    register,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Form>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      bio: '',
      campus: '',
      avatarUrl: '',
    },
  });

  const currentAvatarUrl = watch('avatarUrl');

  // 1. ЗАГРУЗКА ПРОФИЛЯ ПРЯМО ЗДЕСЬ
  React.useEffect(() => {
    const loadUser = async () => {
      const token = Cookies.get('token');

      if (!token) {
        toast.error('Oturum bulunamadı. Lütfen giriş yapın.');
        setLoading(false);
        return;
      }

      try {
        // ⚠️ Уточни у бэкендера точный URL для получения профиля (обычно /api/user/me или /api/profile)
        const res = await axios.get(
          'https://kampustakas-backend-production-26c9.up.railway.app/api/auth/me',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const userData = res.data.data || res.data;

        setUser(userData);
        reset({
          fullName: userData?.fullName || '',
          email: userData?.email || '',
          phone: userData?.phone || '',
          bio: userData?.bio || '',
          campus: userData?.campus || '',
          avatarUrl: userData?.avatarUrl || '',
        });
      } catch (error) {
        console.error('Профиль загрузить не удалось:', error);
        toast.error('Profil bilgileri yüklenemedi.');
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, [reset]);

  // 2. ЗАГРУЗКА КАРТИНКИ (Vercel Blob)
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Yükleme hatası');

      const data = await res.json();

      if (data.url) {
        setValue('avatarUrl', data.url);
        toast.success('Fotoğraf başarıyla yüklendi!');
      }
    } catch (error) {
      toast.error('Fotoğraf yüklenemedi.');
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  // 3. ОТПРАВКА ОБНОВЛЕННЫХ ДАННЫХ
  const onSubmit = async (data: Form) => {
    setIsSavingProfile(true);
    const token = Cookies.get('token');

    try {
      // ⚠️ Уточни URL для обновления данных
      const response = await axios.put(
        'https://kampustakas-backend-production-26c9.up.railway.app/api/auth/me',
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success('Profil bilgileri başarıyla güncellendi!');
      setUser(response.data.data || response.data);
    } catch (error) {
      console.error('Ошибка обновления профиля:', error);
      toast.error('Profil güncellenirken bir hata oluştu.');
    } finally {
      setIsSavingProfile(false);
    }
  };

  if (loading) {
    return <div className="p-20 text-center animate-pulse text-gray-500">Yükleniyor...</div>;
  }

  return (
    <div className="mb-[100px]">
      <Container>
        <h2 className="text-[26px] sm:text-[30px] font-bold text-black mt-6 sm:mt-[50px]">
          Profile Ayarları
        </h2>
        <div className="bg-[#f9f9f9] mt-[30px] sm:mt-[40px] p-4 sm:p-6 rounded-2xl shadow-sm">
          <h2 className="text-black text-[18px] sm:text-[20px] font-bold mb-2">Genel Bilgiler</h2>
          <hr />

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mt-[20px] text-center sm:text-left">
            <div className="relative w-[120px] h-[120px] shrink-0 rounded-full overflow-hidden border bg-gray-200">
              <Image
                src={currentAvatarUrl || 'https://github.com/shadcn.png'}
                alt="User Avatar"
                fill
                className="object-cover"
              />
              {isUploading && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <Loader2 className="animate-spin text-white" />
                </div>
              )}
            </div>
            <div>
              <div>
                <h2 className="text-black font-bold">Profil Fotoğrafı</h2>
                <p className="text-gray-400 mb-[10px] text-sm">
                  En az 400x400px boyutunda JPG ve PNG
                </p>
              </div>

              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleImageUpload}
              />

              <Button
                type="button"
                variant="link"
                className="text-secondary font-medium p-0 hover:underline cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}>
                {isUploading ? 'Yükleniyor...' : 'Değiştir'}
              </Button>
            </div>
          </div>

          <div className="mt-[30px] sm:mt-[50px]">
            <form className="w-full max-w-[500px]" onSubmit={handleSubmit(onSubmit)}>
              <FieldGroup className="flex flex-col sm:flex-row gap-4">
                <Field className="flex-1">
                  <FieldLabel htmlFor="fullName">Ad Soyad</FieldLabel>
                  <Input {...register('fullName')} />
                  {errors.fullName && (
                    <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>
                  )}
                </Field>
                <Field className="flex-1">
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input {...register('email')} />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                  )}
                </Field>
              </FieldGroup>

              <FieldGroup className="flex flex-col sm:flex-row gap-4 mt-4">
                <Field className="flex-1">
                  <FieldLabel htmlFor="phone">Telefon Numarası</FieldLabel>
                  <Input placeholder="555 555 5555" {...register('phone')} />
                </Field>
                <Field className="flex-1">
                  <FieldLabel htmlFor="campus">Kampüs / Bölüm</FieldLabel>
                  <Input {...register('campus')} />
                  {errors.campus && (
                    <p className="text-red-500 text-xs mt-1">{errors.campus.message}</p>
                  )}
                </Field>
              </FieldGroup>

              <FieldGroup className="mt-4">
                <Field>
                  <FieldLabel htmlFor="bio">Hakkımda (Bio)</FieldLabel>
                  <Textarea
                    placeholder="Kendinizden bahsedin..."
                    {...register('bio')}
                    className="min-h-[100px]"
                  />
                  {errors.bio && <p className="text-red-500 text-xs mt-1">{errors.bio.message}</p>}
                </Field>
              </FieldGroup>

              <div className="flex flex-col sm:flex-row gap-4 mt-[20px]">
                <Button
                  disabled={isSavingProfile || isUploading}
                  type="submit"
                  className="py-[12px] sm:py-[22px] px-[40px] w-full sm:w-auto bg-foreground transform cursor-pointer rounded-full text-white flex items-center justify-center gap-2">
                  {isSavingProfile && <Loader2 className="animate-spin" size={16} />}
                  {isSavingProfile ? 'Kaydediliyor...' : 'Kaydet'}
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* <div className="bg-[#f9f9f9] mt-[30px] sm:mt-[40px] p-4 sm:p-6 rounded-2xl shadow-sm">
          <h2 className="text-black text-[18px] sm:text-[20px] font-bold mb-2">Güvenlik</h2>
          <hr />

          <div className="mt-[30px] sm:mt-[50px]">
            <form className="w-full max-w-[500px]" onSubmit={onSecuritySubmit}>
              <FieldGroup className="mt-2">
                <Field>
                  <FieldLabel htmlFor="password">Mevcut Şifre</FieldLabel>
                  <Input type="password" required />
                </Field>
                <Field>
                  <FieldLabel htmlFor="newPassword">Yeni Şifre</FieldLabel>
                  <Input type="password" required />
                </Field>
                <Field>
                  <FieldLabel htmlFor="confirmPassword">Yeni Şifre Tekrar</FieldLabel>
                  <Input type="password" required />
                </Field>
              </FieldGroup>
              <div className="flex flex-col sm:flex-row gap-4 mt-[20px]">
                <Button
                  type="button"
                  onClick={() => window.history.back()}
                  className="py-[12px] sm:py-[22px] px-[40px] w-full sm:w-auto hover:bg-secondary transform hover:text-white cursor-pointer border-secondary bg-transparent text-secondary rounded-full">
                  Iptal
                </Button>
                <Button
                  disabled={isSavingSecurity}
                  type="submit"
                  className="py-[12px] sm:py-[22px] px-[40px] w-full sm:w-auto bg-foreground transform cursor-pointer rounded-full text-white flex items-center justify-center gap-2">
                  {isSavingSecurity && <Loader2 className="animate-spin" size={16} />}
                  {isSavingSecurity ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
                </Button>
              </div>
            </form>
          </div>
        </div> */}
      </Container>
    </div>
  );
}
