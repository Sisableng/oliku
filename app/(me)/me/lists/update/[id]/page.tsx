import React from 'react';
import { getList } from '../../actions';
import ListForm from '@/components/me/form/ListForm';

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
      <section>
        <h1 className='text-4xl font-bold'>Update List</h1>
      </section>
      <ListForm data={data} />
    </div>
  );
}
