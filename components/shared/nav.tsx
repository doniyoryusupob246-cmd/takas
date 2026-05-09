import Link from 'next/link';
import React from 'react';
import { Container } from './container';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';

interface Props {
  className?: string;
}

const links = ['Ana Sayfa', 'Kategoriler', 'Nasıl Çalışır'];

export const Nav: React.FC<Props> = ({ className }) => {
  return (
    <div className={cn('h-[60px] flex items-center shadow-xl w-full', className)}>
      <Container>
        <div className="flex items-center justify-between">
          <Link href={'/'}>
            <h1 className="text-[20px] text-secondary font-bold">KampusTakas</h1>
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
          <div>
            <Button className="bg-foreground w-[120px] h-[35px] rounded-full cursor-pointer">
              Kayit ol
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};
