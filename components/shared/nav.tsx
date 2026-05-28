'use client';
import Link from 'next/link';
import React from 'react';
import { Container } from './container';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { MenuAvatar } from './menu-avatar';
import { useAuthStore } from '@/store/useAuthStore';
interface Props {
  className?: string;
}

const links = ['Ana Sayfa', 'Kategoriler', 'Nasıl Çalışır'];

export const Nav: React.FC<Props> = ({ className }) => {
  const { user, checkAuth, isAuthenticated, logOut } = useAuthStore();

  const [isMounted, setIsMounted] = React.useState(false);
  const route = useRouter();
  const pathname = usePathname();

  React.useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  const handleLogout = () => {
    Cookies.remove('token');
    localStorage.removeItem('user');
    logOut();
    route.push('/');
    route.refresh();
  };
  return (
    <div className={cn('h-[60px] flex items-center shadow-xl w-full', className)}>
      <Container>
        <div className="flex items-center justify-between">
          <Link href={'/'}>
            <Image src="/logo.png" width={80} height={80} alt="Logo" />
          </Link>
          <nav className="flex items-center gap-5">
            {links.map((link) => (
              <Link
                key={link}
                className="text-[#71717A] hover:text-secondary transition-all"
                href={'/'}>
                {link}
              </Link>
            ))}
          </nav>
          <div className="flex gap-3 items-center">
            {!isMounted ? (
              <div className="w-[120px] h-[35px]"></div>
            ) : (
              <div>
                {!isAuthenticated && (
                  <>
                    {pathname === '/login' ||
                      (pathname === '/' && (
                        <Link href={'/register'}>
                          <Button className="bg-foreground w-[120px] h-[35px] rounded-full cursor-pointer">
                            Kayit ol
                          </Button>
                        </Link>
                      ))}
                    {pathname === '/register' ||
                      (pathname === '/' && (
                        <Link href={'/login'}>
                          <Button className="bg-foreground w-[120px] h-[35px] rounded-full cursor-pointer">
                            Giriş Yap
                          </Button>
                        </Link>
                      ))}
                  </>
                )}
              </div>
            )}

            {isAuthenticated && (
              <MenuAvatar username={user?.fullName || 'Kullanıcı'} handleLogOut={handleLogout} />
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
