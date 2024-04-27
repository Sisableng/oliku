import { getUserSession } from '@/app/actions';
import FormSignup from '@/components/main/auth/FormSignup';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function page() {
  const session = await getUserSession();

  if (session) {
    return redirect('/me');
  }
  return (
    <section className='grid h-screen grid-cols-1 md:grid-cols-2 xl:grid-cols-3'>
      <div className='overflow-hidden bg-muted max-md:hidden xl:col-span-2'>
        <Image
          src={
            'https://images.unsplash.com/photo-1637640125496-31852f042a60?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          }
          width={500}
          height={500}
          alt='unsplash image'
          className='h-full w-full object-cover'
        />
      </div>
      <div className='my-20 space-y-10 px-10'>
        <h1 className='text-4xl font-bold'>Buat Akun!</h1>
        <FormSignup />
      </div>
    </section>
  );
}
