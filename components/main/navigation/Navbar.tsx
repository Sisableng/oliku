'use client';
import React, { useEffect, useState } from 'react';
import { menus } from './menus';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { useNRouter } from '@/lib/progressbar/useNRouter';
import { ChevronLeft } from 'lucide-react';
import { useSession } from 'next-auth/react';

const ToggleDarkMode = dynamic(() => import('@/components/ToggleDarkMode'), {
  ssr: false,
});

export default function Navbar() {
  const [activeNav, setActiveNav] = useState(false);
  const pathname = usePathname();
  const router = useNRouter();
  const { data: session } = useSession();

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

  if (pathname.includes('auth')) {
    return (
      <nav className='container fixed inset-x-0 top-0 flex h-20 items-center justify-between'>
        <button
          className='group flex items-center gap-3 transition-colors ease-in-out hover:text-primary md:text-white'
          onClick={() => router.push('/')}
        >
          <span className='grid h-8 w-8 place-content-center rounded-lg text-slate-800 transition-colors ease-in-out group-hover:bg-primary group-hover:text-white md:bg-white'>
            <ChevronLeft />
          </span>
          <span>Kembali</span>
        </button>
        {/* <ToggleDarkMode /> */}
      </nav>
    );
  }

  return (
    <div className='fixed inset-x-0 top-0 z-40'>
      <nav
        className={clsx(
          'transition-all ease-in-out',
          activeNav && 'bg-background/50 backdrop-blur'
        )}
      >
        <div className='container flex h-20 items-center justify-between'>
          <div className='flex items-center gap-8'>
            <Link
              href={'/'}
              className='flex items-center gap-2 transition-colors ease-out hover:text-primary'
            >
              <Image
                src={'/assets/favicon.ico'}
                width={28}
                height={28}
                alt='icon'
              />
              <h3 className='text-2xl font-bold'>Oliku</h3>
            </Link>
            {/* <div>
              <ul className='flex items-center gap-4'>
                {menus.map((menu) => (
                  <li key={menu.uid}>
                    {menu.href ? (
                      <Button variant={'ghost'} asChild>
                        <Link href={menu.href}>{menu.title}</Link>
                      </Button>
                    ) : (
                      <Button variant={'ghost'} onClick={menu.onClick}>
                        {menu.title}
                      </Button>
                    )}
                  </li>
                ))}
              </ul>
            </div> */}
          </div>
          <div className='flex items-center gap-4'>
            <ToggleDarkMode />
            {session ? (
              <Button asChild variant={'secondary'}>
                <Link href={'/me'}>Dashboard</Link>
              </Button>
            ) : (
              <>
                <Button variant={'outline'} asChild>
                  <Link href={'/auth/signin'}>Masuk</Link>
                </Button>
                <Button asChild>
                  <Link href={'/auth/signup'}>Mulai!</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
