
import WhoForm from '@/components/me/form/WhoForm';
import React from 'react';

export default function WhoPage() {
  return (
    <div className='space-y-20'>
      <section className='space-y-10'>
        <h1 className='text-4xl font-bold'>Kenalan dulu yuk!</h1>
        <WhoForm />
      </section>
      <section></section>
    </div>
  );
}
