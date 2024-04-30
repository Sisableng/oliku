import React from 'react';
import { getList } from '../../actions';
import ListForm from '@/components/me/form/ListForm';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export const metadata = {
  title: 'Update',
};

export default async function UpdatePage({
  params,
}: {
  params: { id: string };
}) {
  const data = await getList(String(params.id));

  return (
    <div className='space-y-20'>
      <section className='space-y-6'>
        <Button asChild variant={'ghost'}>
          <Link href={'/me'} className='flex items-center gap-2'>
            <ChevronLeft size={16} />
            <span>Kembali</span>
          </Link>
        </Button>
        <h1 className='text-4xl font-bold'>Update List</h1>
      </section>
      <ListForm data={data} />
    </div>
  );
}
