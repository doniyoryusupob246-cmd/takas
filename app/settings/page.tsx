'use client';
import { Container } from '@/components/shared/container';
import { Button } from '@/components/ui/button';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Loader2 } from 'lucide-react';
import { User } from '../profile/page';
import { fetchUserProfile } from '@/lib/axios';
import { useForm } from 'react-hook-form';
import z, { email } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';

export default function SettingsPage() {
  const [user, setUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState(true);
  const formSchema = z.object({
    fullName: z.string().min(3, 'Min 3').max(30, 'Max 30'),
    email: z.string().email('Geçerli bir e-posta adresi giriniz.'),
    bio: z.string().min(30, 'Min 30').max(200, 'Max 200'),
    campus: z.string().min(3, 'Min 3').max(40, 'Max 40'),
  });
  type Form = z.infer<typeof formSchema>;
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<Form>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: user?.fullName || '',
      email: user?.email || '',
      bio: user?.bio || '',
      campus: user?.campus || '',
    },
  });

  React.useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await fetchUserProfile();
        setUser(res.data);
        reset({
          fullName: res.data.fullName,
          email: res.data.email,
          bio: res.data.bio,
          campus: res.data.campus,
        });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, [reset]);

  const [isSavingProfile, setIsSavingProfile] = React.useState(false);
  const [isSavingSecurity, setIsSavingSecurity] = React.useState(false);

  const onSubmit = async (data: Form) => {
    setIsSavingProfile(true);
    try {
      // simulate api delay
      await new Promise((resolve) => setTimeout(resolve, 800));
      toast.success('Profil bilgileri başarıyla güncellendi!');
      console.log('Profile update data:', data);
    } catch (error) {
      toast.error('Profil güncellenirken bir hata oluştu.');
    } finally {
      setIsSavingProfile(false);
    }
  };

  const onSecuritySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSavingSecurity(true);
    try {
      // simulate api delay
      await new Promise((resolve) => setTimeout(resolve, 800));
      toast.success('Şifreniz başarıyla değiştirildi!');
    } catch (error) {
      toast.error('Şifre değiştirilirken bir hata oluştu.');
    } finally {
      setIsSavingSecurity(false);
    }
  };
  return (
    <div className="mb-[100px]">
      <Container>
        <h2 className="text-[26px] sm:text-[30px] font-bold text-black mt-6 sm:mt-[50px]">Profile Ayarları</h2>
        <div className="bg-[#f9f9f9] mt-[30px] sm:mt-[40px] p-4 sm:p-6 rounded-2xl shadow-sm">
          <h2 className="text-black text-[18px] sm:text-[20px] font-bold mb-2">Genel Bilgiler</h2>
          <hr />
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mt-[20px] text-center sm:text-left">
            <Image
              src={'https://github.com/shadcn.png'}
              alt="Image User"
              width={120}
              height={120}
              className="rounded-full"
            />
            <div>
              <div>
                <h2 className="text-black font-bold">Profil Fotoğrafı</h2>
                <p className="text-gray-400 mb-[10px] text-sm">En az 400x400px boyutunda JPG ve PNG</p>
              </div>
              <Link className="text-secondary font-medium hover:underline" href={'/'}>
                Değiştir
              </Link>
            </div>
          </div>
          <div className="mt-[30px] sm:mt-[50px]">
            <form className="w-full max-w-[500px]" onSubmit={handleSubmit(onSubmit)}>
              <FieldGroup className="flex flex-col sm:flex-row gap-4">
                <Field className="flex-1">
                  <FieldLabel htmlFor="fullName">Ad Soyad</FieldLabel>
                  <Input {...register('fullName')} />
                </Field>
                <Field className="flex-1">
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input {...register('email')} />
                </Field>
              </FieldGroup>
              <FieldGroup className="mt-4">
                <Field>
                  <FieldLabel htmlFor="campus">Bölüm</FieldLabel>
                  <Input {...register('campus')} />
                </Field>
                <Field>
                  <FieldLabel htmlFor="bio">Hakkımda</FieldLabel>
                  <Textarea {...register('bio')} className="min-h-[100px]" />
                </Field>
              </FieldGroup>
              <div className="flex flex-col sm:flex-row gap-4 mt-[20px]">
                <Button
                  disabled={isSavingProfile}
                  type="submit"
                  className="py-[12px] sm:py-[22px] px-[40px] w-full sm:w-auto bg-foreground transform cursor-pointer rounded-full text-white flex items-center justify-center gap-2">
                  {isSavingProfile && <Loader2 className="animate-spin" size={16} />}
                  {isSavingProfile ? 'Kaydediliyor...' : 'Kaydet'}
                </Button>
              </div>
            </form>
          </div>
        </div>

        <div className="bg-[#f9f9f9] mt-[30px] sm:mt-[40px] p-4 sm:p-6 rounded-2xl shadow-sm">
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
        </div>
      </Container>
    </div>
  );
}
