import React from 'react';
import ListForm from '@/components/me/form/ListForm';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export const metadata = {
  title: 'Tambah',
};

export default function CreatePage() {
  return (
    <div className='space-y-10 md:space-y-20'>
      <section className='space-y-6'>
        {/* <Button asChild variant={'ghost'}>
          <Link href={'/me'} className='flex items-center gap-2'>
            <ChevronLeft size={16} />
            <span>Kembali</span>
          </Link>
        </Button> */}
        <h1 className='text-3xl font-bold'>Tambah Kendaraan</h1>
      </section>
      <ListForm />
    </div>
  );
}
