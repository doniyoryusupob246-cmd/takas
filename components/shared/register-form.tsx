'use client';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import z, { email } from 'zod';
import { Field, FieldError, FieldGroup, FieldLabel } from '../ui/field';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeClosed, Info, Lock, Mail, User } from 'lucide-react';
import Link from 'next/link';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';

interface Props {
  className?: string;
}

type Form = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  kvkkAccepted: boolean;
};
const formSchema = z
  .object({
    fullName: z.string().min(3, 'Min 3').max(30, 'Max 30'),
    email: z.string().email('Geçerli bir e-posta adresi giriniz.'),
    password: z.string().min(5, 'Şifre en az 5 karakterden oluşmalıdır.'),
    confirmPassword: z.string().min(5, 'Şifre en az 5 karakterden oluşmalıdır.'),
    kvkkAccepted: z.boolean().refine((val) => val === true, {
      message: 'Devam etmek için şartları kabul etmelisiniz.',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Şifreler eşleşmiyor',
    path: ['passwordRep'],
  });

export const RegisterForm: React.FC<Props> = ({ className }) => {
  const [isPassword, setIsPassword] = React.useState(false);
  const route = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      kvkkAccepted: false as boolean,
    },
  });

  const onSubmit = async (data: Form) => {
    try {
      const response = await axios.post(
        'https://kampustakas-backend-production.up.railway.app/api/auth/register',
        data,
      );

      const token = response.data.data.token;
      const user = response.data.data.user;

      Cookies.set('token', token, { expires: 7 });
      localStorage.setItem('user', JSON.stringify(user));

      alert('Kayıt işlemi başarılı! Hoş geldin, ' + user.fullName);
      console.log('Успешный ответ сервера:', response.data);
      route.push('/profile');

      route.refresh();
    } catch (error) {
      console.error('Ошибка при регистрации:', error);
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.message || 'Bir hata oluştu. Lütfen tekrar deneyin.';
        toast.error(errorMessage);
      } else {
        alert('Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.');
      }
    }
  };
  return (
    <div className="flex justify-center mb-[100px] px-4">
      <div className="w-full max-w-[450px]">
        <Image className="mx-auto mt-10" src={'/logo.png'} width={150} height={150} alt="" />

        <div className={cn('w-full shadow-xl rounded-xl p-6 sm:p-10', className)}>
          <h2 className="text-[18px] sm:text-[20px] font-bold text-black">Kayıt Ol</h2>

          <p className="text-[13px] sm:text-[14px] text-gray-400">
            Hemen aramıza katıl ve kampüs içi alışverişe başla.
          </p>

          <form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="fullName">Ad Soyad</FieldLabel>

                <div className="relative group">
                  <User
                    className="absolute top-[12px] left-3 group-focus-within:text-gray-400"
                    size={20}
                  />

                  <Input
                    placeholder="Ad Soyad Yazınız"
                    className="h-[45px] pl-10 w-full"
                    {...register('fullName')}
                    name="fullName"
                    type="text"
                  />
                </div>

                {errors.fullName && (
                  <FieldError className="gap-2 text-[12px] mt-0 flex items-center">
                    <Info size={15} />
                    <span>{errors.fullName.message}</span>
                  </FieldError>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="email">E-Posta</FieldLabel>

                <div className="relative group">
                  <Mail
                    className="absolute top-[12px] left-3 group-focus-within:text-gray-400"
                    size={20}
                  />

                  <Input
                    placeholder="E-Posta Yazınız"
                    className="h-[45px] pl-10 w-full"
                    {...register('email')}
                    name="email"
                    type="email"
                  />
                </div>

                {errors.email && (
                  <FieldError className="gap-2 text-[12px] mt-0 flex items-center">
                    <Info size={15} />
                    <span>{errors.email.message}</span>
                  </FieldError>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="password">Şifre</FieldLabel>

                <div className="relative group">
                  <Lock
                    className="absolute top-[12px] left-3 group-focus-within:text-gray-400"
                    size={20}
                  />

                  <Input
                    placeholder="Şifre"
                    className="h-[45px] pl-10 w-full"
                    {...register('password')}
                    name="password"
                    type={isPassword ? 'text' : 'password'}
                  />

                  {isPassword ? (
                    <EyeClosed
                      onClick={() => setIsPassword(false)}
                      size={20}
                      className="absolute right-2 top-[12px] cursor-pointer"
                    />
                  ) : (
                    <Eye
                      onClick={() => setIsPassword(true)}
                      size={20}
                      className="absolute right-2 top-[12px] cursor-pointer"
                    />
                  )}
                </div>

                {errors.password && (
                  <FieldError className="gap-2 text-[12px] mt-0 flex items-center">
                    <Info size={15} />
                    <span>{errors.password.message}</span>
                  </FieldError>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="passwordRep">Şifre Tekrar</FieldLabel>

                <div className="relative group">
                  <Lock
                    className="absolute top-3 left-3 group-focus-within:text-gray-400"
                    size={20}
                  />

                  <Input
                    placeholder="Şifre Tekrar"
                    className="h-11.25 pl-10 w-full"
                    {...register('confirmPassword')}
                    name="confirmPassword"
                    type={isPassword ? 'text' : 'password'}
                  />
                </div>

                {errors.confirmPassword && (
                  <FieldError className="gap-2 text-[12px] mt-0 flex items-center">
                    <Info size={15} />
                    <span>{errors.confirmPassword.message}</span>
                  </FieldError>
                )}
              </Field>

              <Field>
                <Label className="flex ">
                  <Controller
                    control={control}
                    name="kvkkAccepted"
                    render={({ field }) => (
                      <Checkbox
                        id="acceptTerms"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        name="kvkkAccepted"
                      />
                    )}
                  />
                  <p className="text-[13px] sm:text-[14px] text-black leading-relaxed">
                    Kayıt olarak{' '}
                    <span className="cursor-pointer text-secondary underline">
                      Kullanım Koşulları
                    </span>{' '}
                    ve{' '}
                    <span className="cursor-pointer text-secondary underline">
                      Gizlilik Politikasını
                    </span>{' '}
                    kabul etmiş olursun.
                  </p>
                </Label>
                {errors.kvkkAccepted && (
                  <span className="text-red-500 text-xs">{errors.kvkkAccepted.message}</span>
                )}
              </Field>
            </FieldGroup>

            <Button
              className="w-full sm:w-45 block mx-auto mt-5 bg-foreground cursor-pointer h-11.25"
              type="submit">
              Kayit ol
            </Button>

            <p className="text-black text-[13px] sm:text-[14px] mt-5 text-center">
              Zaten hesabın var mı?{' '}
              <Link className="text-secondary hover:underline" href={'/login'}>
                Giriş Yap
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
