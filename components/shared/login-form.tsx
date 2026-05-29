'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '@/lib/utils';
import { Eye, EyeClosed, Lock, LogIn, Mail } from 'lucide-react';
import { Field, FieldError, FieldGroup, FieldLabel } from '../ui/field';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import Link from 'next/link';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useAuthStore } from '@/store/useAuthStore';

interface Props {
  className?: string;
}

type Form = {
  email: string;
  password: string;
};

const formSchema = z.object({
  email: z.string().email('Geçerli bir e-posta adresi giriniz.'),

  password: z.string().min(5, 'Şifre en az 5 karakterden oluşmalıdır.'),
});

export const LoginForm: React.FC<Props> = ({ className }) => {
  const [hiddenPass, setHiddenPass] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const { login } = useAuthStore();
  const route = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const onSubmit = async (data: Form) => {
    try {
      setIsLoading(true);
      const formData = {
        email: data.email,
        password: data.password,
      };
      const response = await axios.post(
        'https://kampustakas-backend-production.up.railway.app/api/auth/login',
        formData,
      );
      const token = response.data.data.token;
      const userData = response.data.data.user;
      login(userData, token);

      toast.success(response.data.message);
      console.log('Успешный ответ сервера:', response.data);
      route.push('/profile');
      route.refresh();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.message || 'Bir hata oluştu. Lütfen tekrar deneyin.';
        toast.error(errorMessage);
      } else {
        toast.error('Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn('mt-[50px] mb-[100px] flex justify-center px-4 sm:px-0', className)}>
      <div className="w-full max-w-[350px] sm:w-[350px] shadow-xl border rounded-xl py-8 sm:py-10">
        <div className="mx-auto w-[48px] h-[48px] sm:w-[50px] sm:h-[50px] bg-foreground/20 flex items-center justify-center rounded-full">
          <LogIn size={22} className="text-secondary" />
        </div>

        <h2 className="text-[20px] sm:text-[22px] text-secondary text-center font-bold mb-1">
          Giriş Yap
        </h2>

        <p className="text-[12px] sm:text-[13px] text-[#909090] text-center px-2">
          Kampüs topluluğuna tekrar hoş geldin.
        </p>

        <form className="px-4 sm:px-5 mt-4" onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="email">E-posta</FieldLabel>

              <div className="relative group">
                <Mail
                  size={20}
                  className="absolute top-[10px] left-3 group-focus-within:text-gray-400 transition-colors"
                />

                <Input
                  className="h-[40px] pl-10 rounded-sm focus-visible:ring-ring/50 w-full"
                  {...register('email')}
                  name="email"
                  id="email"
                  type="email"
                  placeholder="E-posta yazınız"
                />
              </div>

              {errors.email && <FieldError>{errors.email.message}</FieldError>}
            </Field>

            <Field>
              <div className="flex items-center justify-between">
                <FieldLabel htmlFor="password">Şifre</FieldLabel>

                <Link className="text-[11px] sm:text-[12px] text-gray-600" href="">
                  Şifremi unuttum?
                </Link>
              </div>

              <div className="relative group">
                <Lock
                  size={20}
                  className="absolute top-[10px] left-3 group-focus-within:text-gray-400 transition-colors"
                />

                <Input
                  className="h-[40px] pl-10 rounded-sm w-full"
                  {...register('password')}
                  name="password"
                  id="password"
                  type={hiddenPass ? 'text' : 'password'}
                  placeholder="Şifre yazınız"
                />

                {hiddenPass ? (
                  <EyeClosed
                    onClick={() => setHiddenPass(false)}
                    className="cursor-pointer right-2 text-gray-400 absolute top-[10px]"
                    size={20}
                  />
                ) : (
                  <Eye
                    onClick={() => setHiddenPass(true)}
                    className="cursor-pointer right-2 text-gray-400 absolute top-[10px]"
                    size={20}
                  />
                )}
              </div>

              {errors.password && <FieldError>{errors.password.message}</FieldError>}
            </Field>
          </FieldGroup>

          <Button
            disabled={isLoading}
            className="mx-auto block cursor-pointer hover:bg-foreground/70 bg-foreground text-white w-full sm:w-[150px] h-[42px] sm:h-[40px] rounded-sm mt-5"
            type="submit">
            {isLoading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
          </Button>

          <p className="text-[13px] sm:text-[14px] text-gray-500 mt-3 text-center">
            Hesabın yok mu?{' '}
            <Link className="hover:underline text-foreground font-bold" href={'/register'}>
              Kayıt Ol
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};
