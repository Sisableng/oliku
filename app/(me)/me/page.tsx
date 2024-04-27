import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import React from 'react';
import { getLists } from './actions';
import Lists from '@/components/me/Lists';

export default async function MeHomePage() {
  const session = await auth();

  if (session && session.user && !session?.user?.name) {
    return redirect(`/me/who/${session?.user?.id}`);
  }

  const lists = await getLists(String(session?.user.id));

  return (
    <section className='space-y-20'>
      <h1 className='text-4xl font-bold'>List Kamu</h1>
      <div className='space-y-10'>
        <div>
          <p>Filter list</p>
        </div>
        <Lists data={lists} />
      </div>
    </section>
  );
}
