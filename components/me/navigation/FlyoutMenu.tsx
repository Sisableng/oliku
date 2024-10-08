'use client';
import { Button } from '@/components/ui/button';
import { Home, Plus, UserRound } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export default function FlyoutMenu() {
  return (
    <div className='fixed inset-x-0 bottom-3 z-50 mx-auto w-max'>
      <div className='flex items-center rounded-l-full rounded-r-full bg-slate-100 p-2 shadow-lg backdrop-blur dark:bg-slate-900/50'>
        <Button
          variant={'ghost'}
          size={'icon'}
          className='rounded-full'
          asChild
        >
          <Link href={'/me'}>
            <Home size={20} />
          </Link>
        </Button>
        <div className='relative mx-10 h-8 w-8'>
          <Button
            size={'icon'}
            className='absolute inset-x-1/2 bottom-0 mx-auto h-14 w-14 -translate-x-1/2 rounded-full drop-shadow-lg'
            asChild
          >
            <Link href={'/me/lists/create'}>
              <Plus size={28} />
            </Link>
          </Button>
        </div>
        <Button
          variant={'ghost'}
          size={'icon'}
          className='rounded-full'
          asChild
        >
          <Link href={'/me/profile'}>
            <UserRound size={20} />
          </Link>
        </Button>
      </div>
    </div>
  );
}
