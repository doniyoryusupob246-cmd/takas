'use client';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import React from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { Field, FieldError, FieldGroup, FieldLabel } from '../ui/field';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeClosed, Info, Lock, Mail, User } from 'lucide-react';
import Link from 'next/link';

interface Props {
  className?: string;
}

type Form = {
  fullName: string;
  email: string;
  password: string;
  passwordRep: string;
};
const formSchema = z
  .object({
    fullName: z.string().min(3, 'Min 3').max(30, 'Max 30'),
    email: z.string().email('Geçerli bir e-posta adresi giriniz.'),
    password: z.string().min(5, 'Şifre en az 5 karakterden oluşmalıdır.'),
    passwordRep: z.string().min(5, 'Şifre en az 5 karakterden oluşmalıdır.'),
  })
  .refine((data) => data.password === data.passwordRep, {
    message: 'Şifreler eşleşmiyor',
    path: ['passwordRep'],
  });

export const RegisterForm: React.FC<Props> = ({ className }) => {
  const [isPassword, setIsPassword] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      passwordRep: '',
    },
  });

  const onSubmit = (data: Form) => {
    console.log(data);
    alert('Kayit oldu');
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
                    className="absolute top-[12px] left-3 group-focus-within:text-gray-400"
                    size={20}
                  />

                  <Input
                    placeholder="Şifre Tekrar"
                    className="h-[45px] pl-10 w-full"
                    {...register('passwordRep')}
                    name="passwordRep"
                    type={isPassword ? 'text' : 'password'}
                  />
                </div>

                {errors.passwordRep && (
                  <FieldError className="gap-2 text-[12px] mt-0 flex items-center">
                    <Info size={15} />
                    <span>{errors.passwordRep.message}</span>
                  </FieldError>
                )}
              </Field>

              <p className="text-[13px] sm:text-[14px] text-black leading-relaxed">
                Kayıt olarak{' '}
                <span className="cursor-pointer text-secondary underline">Kullanım Koşulları</span>{' '}
                ve{' '}
                <span className="cursor-pointer text-secondary underline">
                  Gizlilik Politikasını
                </span>{' '}
                kabul etmiş olursun.
              </p>
            </FieldGroup>

            <Button
              className="w-full sm:w-[180px] block mx-auto mt-5 bg-foreground cursor-pointer h-[45px]"
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
