import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import React from 'react';
import { getLists } from './actions';
import Lists from '@/components/me/Lists';
import FilterLists from '@/components/me/FilterLists';

interface Props {
  searchParams: { filter: string; search: string };
}

export default async function MeHomePage({ searchParams }: Props) {
  const session = await auth();

  if (session && session.user && !session?.user?.name) {
    return redirect(`/me/who/${session?.user?.id}`);
  }

  const lists = await getLists(
    String(session?.user.id),
    searchParams.filter,
    searchParams.search
  );

  return (
    <section className='space-y-8'>
      {/* <h1 className='text-2xl font-bold'>Kendaraan</h1> */}
      <div className='space-y-10'>
        <div>
          <FilterLists />
        </div>
        <Lists data={lists} />
      </div>
    </section>
  );
}
