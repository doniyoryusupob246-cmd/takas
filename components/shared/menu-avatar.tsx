import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
  BadgeCheckIcon,
  BellIcon,
  CreditCardIcon,
  Handshake,
  LogOutIcon,
  Settings,
  User,
} from 'lucide-react';
import Link from 'next/link';
import { getInitials } from '@/lib/getInitials';

interface Props {
  className?: string;
  handleLogOut: () => void;
  username: string;
}

export const MenuAvatar: React.FC<Props> = ({ username, handleLogOut, className }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full cursor-pointer">
          <Avatar>
            {/* <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" /> */}
            <AvatarFallback>{getInitials(username)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <Link href={'/profile'}>
            <DropdownMenuItem className="text-black ">
              <User />
              Profil
            </DropdownMenuItem>
          </Link>
          <Link href={'/settings'}>
            <DropdownMenuItem className="text-black">
              <Settings />
              Ayarlar
            </DropdownMenuItem>
          </Link>
          <Link href={'/offers'}>
            <DropdownMenuItem className="text-black">
              <Handshake />
              Teklifkerim
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-red-800 " onClick={handleLogOut}>
          <LogOutIcon />
          Çıkış Yap
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
