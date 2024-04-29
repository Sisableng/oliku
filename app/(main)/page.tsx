'use client';
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function Home() {
  const { data: session } = useSession();
  return (
    <div className='space-y-20'>
      <section
        className='relative h-screen bg-cover bg-fixed bg-center bg-no-repeat'
        style={{
          backgroundImage: "url('/assets/bg.svg')",
        }}
      >
        <div className='absolute inset-0 z-10 mx-auto grid max-w-4xl place-content-center space-y-8 text-center'>
          <h1 className='text-4xl font-bold lg:text-6xl'>
            Selamat datang di <span className='text-primary'>Oliku</span>!
          </h1>
          <p className='mx-auto max-w-lg font-semibold'>
            Oliku adalah aplikasi pengingat ganti oli buat kamu yang sering
            lupa, Oliku dibuat dengan Next.js dan Tailwind CSS.
          </p>
          <Button size={'lg'} className='mx-auto w-max' asChild>
            {session ? (
              <Link href={'/me'}>Dashboard</Link>
            ) : (
              <Link href={'/auth/signup'}>Mulai Sekarang!</Link>
            )}
          </Button>
        </div>

        <div className='pointer-events-none absolute inset-x-0 top-0 h-52 bg-gradient-to-b from-background to-transparent' />
        <div className='pointer-events-none absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-background to-transparent' />
      </section>
    </div>
  );
}
