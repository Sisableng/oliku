import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function LoadingCard() {
  return (
    <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
      <Skeleton className='h-full w-full rounded-xl bg-card max-sm:max-h-40' />
      <div className='h-40 space-y-6 rounded-xl bg-card p-6 md:col-span-2 md:h-60'>
        <Skeleton className='h-6 max-w-60 bg-accent ' />
        <Skeleton className='h-6 max-w-32 bg-accent ' />
        <Skeleton className='h-6 max-w-48 bg-accent ' />
      </div>
    </div>
  );
}
