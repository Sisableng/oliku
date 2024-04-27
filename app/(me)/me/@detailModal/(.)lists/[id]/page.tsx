import React from 'react';
import Modal from './modal';

export default function ListModal({ params }: { params: { id: string } }) {
  return (
    <Modal>
      <div>
        <p>Modal</p>
        <p>{params.id}</p>
      </div>
    </Modal>
  );
}
