'use client';
import { List } from '@prisma/client';
import React, { FC, useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import { deleteLists } from '../../actions';
import { removeImages } from '@/helper/cloudinaryHelper';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

interface DeleteButtonProps {
  data: List;
}

const DeleteButton = ({ data }: DeleteButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  async function handleDelete(ids: string[]) {
    const toastId = toast.loading('Menghapus...');
    try {
      const req = await deleteLists(ids);
      if (req) {
        if (data.coverId) {
          await removeImages(Array(data.coverId));
        }

        toast.success('Berhasil dihapus', {
          id: toastId,
        });

        router.refresh();
      }
    } catch (error) {
      console.log(error);
      toast.error('Sepertinya ada masalah internal', {
        id: toastId,
      });
    }
  }

  return (
    <div>
      <Button variant={'destructive'} onClick={() => setIsOpen(true)}>
        Hapus
      </Button>

      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Kamu yakin mau hapus ini?</AlertDialogTitle>
            <AlertDialogDescription>
              Tindakan ini tidak bisa dibatalkan. Ini akan menghapus list ini
              secara permanen dari server kami.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleDelete(Array(data.id))}>
              Ok
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DeleteButton;
