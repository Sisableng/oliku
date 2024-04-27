import React from 'react';

export default function ListDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className='card'>
      <p>{params.id}</p>
    </div>
  );
}
