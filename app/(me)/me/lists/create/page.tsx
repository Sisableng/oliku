import React from 'react';
import ListForm from '@/components/me/form/ListForm';

export const metadata = {
  title: 'Tambah',
};

export default function CreatePage() {
  return (
    <div className='space-y-10 md:space-y-20'>
      <section>
        <h1 className='text-4xl font-bold'>Buat List</h1>
      </section>
      <ListForm />
    </div>
  );
}
