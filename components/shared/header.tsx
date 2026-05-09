import { cn } from '@/lib/utils';
import React from 'react';

interface Props {
  className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {
  return (
    <div className={cn('mt-[20px]', className)}>
      <h1 className="text-black text-3xl font-bold text-center">
        İhtiyacın olmayanı ver, <span className="text-secondary">istediğini al.</span>
      </h1>
    </div>
  );
};
