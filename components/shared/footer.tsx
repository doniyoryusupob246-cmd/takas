import { cn } from '@/lib/utils';
import React from 'react';
import { Container } from './container';
import Image from 'next/image';
import { Mail, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';

interface Props {
  className?: string;
}
const navlink = [
  {
    title: 'Bağlantılar',
    links: [
      { link: '/', text: 'Ana Sayfa', icon: null },
      { link: '/hakkimizda', text: 'Hakkımızda', icon: null },
      { link: '/nasil-calisir', text: 'Nasıl Çalışır?', icon: null },
    ],
  },
  {
    title: 'Yasal',
    links: [
      { link: '/gizlilik-politikasi', text: 'Gizlilik Politikasi', icon: null },
      { link: '/kvkk', text: 'KVKK', icon: null },
    ],
  },
  {
    title: 'İletişim',
    links: [
      { link: '', text: 'Bilecik Türkiye', icon: <MapPin size={18} /> },
      { link: 'tel:+905011337636', text: '+90 (501) 133 76 36', icon: <Phone size={18} /> },
      {
        link: 'mailto:kampustakas@gmail.com',
        text: 'kampustakas@gmail.com',
        icon: <Mail size={18} />,
      },
    ],
  },
];

export const Footer: React.FC<Props> = ({ className }) => {
  return (
    <div className={cn('py-8 bg-foreground px-4', className)}>
      <Container>
        <div className="flex flex-col md:flex-row md:justify-around gap-10 md:gap-0">
          {/* Logo + description */}
          <div className="flex flex-col items-start">
            <Image src="/logo-white.png" width={150} height={100} alt="Logo" />

            <div className="text-white text-[13px] sm:text-[14px] w-full max-w-[300px] mt-5">
              İhtiyacın olmayanı değerlendir, başkalarının ihtiyacını karşıla. Akıllı alışveriş yap,
              gereksiz harcamalardan kaçın ve sürdürülebilir bir yaşam tarzını destekle.
            </div>
          </div>

          {/* Links */}
          {navlink.map((items, i) => (
            <div key={i} className="w-full md:w-auto">
              <h2 className="text-white font-bold text-[18px] sm:text-[20px] mb-3">
                {items.title}
              </h2>

              <ul>
                {items.links?.map((link) => (
                  <li className="text-white mb-3" key={link.link}>
                    <div className="flex items-center gap-2 transition-all hover:text-[#a7a7a7]">
                      {link.icon}
                      <Link className="inline-block text-[14px]" href={link.link}>
                        {link.text}
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};
