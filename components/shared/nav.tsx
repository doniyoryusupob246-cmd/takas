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
import { Menu, X } from 'lucide-react';

interface Props {
  className?: string;
}

const links = ['Ana Sayfa', 'Kategoriler', 'Nasıl Çalışır'];

export const Nav: React.FC<Props> = ({ className }) => {
  const { user, checkAuth, isAuthenticated, logOut } = useAuthStore();

  const [isMounted, setIsMounted] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
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

  React.useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <div className={cn('relative h-[60px] flex items-center shadow-lg bg-white w-full z-50', className)}>
      <Container>
        <div className="flex items-center justify-between">
          <Link href={'/'}>
            <Image src="/logo.png" width={80} height={80} alt="Logo" className="w-[70px] h-auto" />
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-5">
            {links.map((link) => (
              <Link
                key={link}
                className="text-[#71717A] hover:text-secondary font-medium transition-all"
                href={'/'}>
                {link}
              </Link>
            ))}
          </nav>
          
          <div className="flex gap-3 items-center">
            {/* Desktop Auth Section */}
            <div className="hidden md:flex gap-3 items-center">
              {!isMounted ? (
                <div className="w-[120px] h-[35px]"></div>
              ) : (
                <div className="flex gap-3">
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

            {/* Mobile Actions */}
            <div className="flex md:hidden items-center gap-2">
              {isMounted && isAuthenticated && (
                <MenuAvatar username={user?.fullName || 'Kullanıcı'} handleLogOut={handleLogout} />
              )}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-[#71717A] hover:text-secondary focus:outline-none cursor-pointer"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </Container>

      {/* Mobile Menu Panel */}
      {isMobileMenuOpen && (
        <div className="absolute top-[60px] left-0 w-full bg-white shadow-xl border-t border-gray-100 py-6 px-6 z-40 md:hidden">
          <nav className="flex flex-col gap-4 mb-6">
            {links.map((link) => (
              <Link
                key={link}
                className="text-[#71717A] hover:text-secondary text-lg font-medium transition-all py-2 border-b border-gray-50"
                href={'/'}>
                {link}
              </Link>
            ))}
          </nav>

          {isMounted && !isAuthenticated && (
            <div className="flex flex-col gap-3">
              <Link href={'/login'} className="w-full">
                <Button className="w-full bg-foreground h-[40px] rounded-full cursor-pointer">
                  Giriş Yap
                </Button>
              </Link>
              <Link href={'/register'} className="w-full">
                <Button className="w-full bg-transparent text-foreground border-2 border-foreground h-[40px] rounded-full cursor-pointer">
                  Kayıt Ol
                </Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

