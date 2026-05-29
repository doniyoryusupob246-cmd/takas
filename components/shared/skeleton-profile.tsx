import React from 'react';
import { Container } from './container';
import { Skeleton } from '../ui/skeleton';

interface Props {
  className?: string;
}

export const SkeletonProfile: React.FC<Props> = ({ className }) => {
  return (
    <div className="mb-[100px]">
      <Container className="max-w-[1140px]">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-around gap-8 md:gap-10">
          <div className="mt-6 md:mt-[40px] flex justify-center w-full md:w-auto">
            <Skeleton className="w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] rounded-2xl border" />
          </div>
          <div className="flex flex-col items-center md:items-start mt-6 md:mt-[40px] w-full max-w-[500px]">
            <div className="flex gap-2">
              <Skeleton className="w-[100px] h-[18px] rounded-full" />
              <Skeleton className="w-[60px] h-[18px] rounded-full" />
            </div>
            <Skeleton className="w-[250px] h-[40px] rounded-sm mt-3" />

            <div className="mt-4 w-full flex flex-col items-center md:items-start gap-2">
              <Skeleton className="w-full max-w-[450px] h-[20px]" />
              <Skeleton className="w-full max-w-[450px] h-[20px]" />
              <Skeleton className="w-full max-w-[450px] h-[20px]" />
            </div>

            <div className="flex flex-wrap justify-center md:justify-start gap-4 items-center mt-5 w-full">
              <Skeleton className="w-[120px] h-[20px]" />
              <Skeleton className="w-[120px] h-[20px]" />
              <Skeleton className="w-[120px] h-[20px]" />
            </div>
            <Skeleton className="w-[160px] h-[40px] rounded-md mt-5" />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-[40px]">
          <Skeleton className="h-[100px] rounded-xl w-full" />
          <Skeleton className="h-[100px] rounded-xl w-full" />
          <Skeleton className="h-[100px] rounded-xl w-full" />
          <Skeleton className="h-[100px] rounded-xl w-full" />
        </div>
      </Container>
    </div>
  );
};
