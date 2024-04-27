'use client';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import React, { FC, ReactNode } from 'react';

interface ModalProps {
  children: ReactNode;
}

const Modal = ({ children }: ModalProps) => {
  const router = useRouter();
  const handleClose = () => {
    router.back();
  };
  return (
    <div className='fixed inset-0 z-[99] flex flex-col bg-black/30'>
      <div
        className='relative flex h-20 items-center justify-end px-10'
        onClick={handleClose}
      >
        <Button
          size={'icon'}
          variant={'ghost'}
          className='rounded-full'
          onClick={(e) => {
            e.stopPropagation();
            handleClose();
          }}
        >
          X
        </Button>
      </div>
      <div className='wfull h-full flex-1 bg-background'>{children}</div>
    </div>
  );
};

export default Modal;
