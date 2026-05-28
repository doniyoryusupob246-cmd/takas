import { cn } from '@/lib/utils';
import React from 'react';

interface Props {
  className?: string;
  children?: React.ReactNode;
}

export const Container: React.FC<Props> = ({ className, children }) => {
  return <div className={cn('mx-auto w-full max-w-[1400px]', className)}>{children}</div>;
};
