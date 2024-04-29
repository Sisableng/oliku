'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Input } from '@/components/ui/input';
import { getInitialName } from '@/utils/getInitialName';
import { DropdownMenuArrow } from '@radix-ui/react-dropdown-menu';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { Lock, LogOut, UserRound } from 'lucide-react';
const ToggleDarkMode = dynamic(() => import('@/components/ToggleDarkMode'), {
  ssr: false,
});

export default function Navbar() {
  const [activeNav, setActiveNav] = useState(false);
  const { data: session } = useSession();
  const name = getInitialName(session?.user?.name ?? 'USER');

  // console.log(session);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setActiveNav(true);
      } else {
        setActiveNav(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <div
      className={clsx(
        'fixed inset-x-0 top-0 z-40 transition-all ease-out',
        activeNav && 'bg-background/50 backdrop-blur'
      )}
    >
      <nav className='container flex h-20 items-center justify-between gap-8'>
        <Link href={'/me'} className='flex items-center gap-2'>
          <Image
            src={'/assets/favicon.ico'}
            width={32}
            height={32}
            alt='icon'
          />
          <h4 className='text-2xl font-bold'>Oliku</h4>
        </Link>
        <div className='flex items-center gap-4 rounded-l-full rounded-r-full bg-card p-2 shadow-lg'>
          <p className='pl-3 text-sm text-muted-foreground max-sm:hidden'>
            {new Date().toLocaleDateString('id', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })}
          </p>
          {/* <Input
            type='text'
            placeholder='Search...'
            className='h-auto max-w-40 rounded-l-full rounded-r-full bg-slate-100 p-1 px-3 dark:bg-slate-800'
          /> */}
          <ToggleDarkMode className='h-8 w-8 rounded-full' />
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger>
              <Avatar className='h-8 w-8'>
                <AvatarImage src={session?.user?.image ?? ''} />
                <AvatarFallback>{name}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuLabel>Akun</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild className='cursor-pointer'>
                <Link href={'/me/profile'} className='flex items-center gap-3'>
                  <UserRound size={14} className='text-white/50' />
                  <span>Profil</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className='cursor-pointer'>
                <Link
                  href={'/me/profile/security'}
                  className='flex items-center gap-3'
                >
                  <Lock size={14} className='text-white/50' />
                  <span>Keamanan</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                asChild
                className='cursor-pointer text-destructive focus:text-destructive'
                onClick={() => signOut()}
              >
                <div className='flex items-center gap-3'>
                  <LogOut size={14} className='text-white/50' />
                  <span>Keluar</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuArrow className='fill-border' />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </div>
  );
}
