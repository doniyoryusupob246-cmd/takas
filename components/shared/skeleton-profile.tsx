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
        <div className="flex items-center justify-around">
          <div className="mt-[40px]">
            <Skeleton className="w-[320px] h-[320px] rounded-2xl border" />
          </div>
          <div>
            <div className="flex gap-2">
              <Skeleton className="w-[100px] h-[18px] rounded-full" />
              <Skeleton className="w-[60px] h-[18px] rounded-full" />
            </div>
            <Skeleton className="w-[250px] h-[40px] rounded-sm mt-[10px]" />

            <div className="mt-[20px]">
              <Skeleton className="text-[15px] text-gray-500 w-[450px] h-[20px] mt-[5px]" />
              <Skeleton className="text-[15px] text-gray-500 w-[450px] h-[20px] mt-[5px]" />
              <Skeleton className="text-[15px] text-gray-500 w-[450px] h-[20px] mt-[5px]" />
              <Skeleton className="text-[15px] text-gray-500 w-[450px] h-[20px] mt-[5px]" />
              <Skeleton className="text-[15px] text-gray-500 w-[450px] h-[20px] mt-[5px]" />
            </div>

            <div className="flex gap-3 items-center mt-[30px]">
              <Skeleton className="w-[150px] h-[30px] text flex items-center gap-3" />
              <Skeleton className="w-[150px] h-[30px] text flex items-center gap-3" />
              <Skeleton className="w-[150px] h-[30px] text flex items-center gap-3" />
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-[30px]">
          <Skeleton className="w-[200px] h-[100px] rounded-xl" />

          <Skeleton className="w-[200px] h-[100px] rounded-xl" />

          <Skeleton className="w-[200px] h-[100px] rounded-xl" />

          <Skeleton className="w-[200px] h-[100px] rounded-xl" />
        </div>
      </Container>
    </div>
  );
};
