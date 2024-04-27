'use client';

import { List } from '@prisma/client';
import React, { useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
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

import dynamic from 'next/dynamic';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import DatePicker from '../ui/date-picker';
import { Button } from '../ui/button';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
const ListCard = dynamic(() => import('@/components/me/card/ListCard'), {
  ssr: false,
  loading: () => (
    <div>
      <p>Loading...</p>
    </div>
  ),
});

interface ListsProps {
  data: List[] | undefined;
}

export default function Lists({ data }: ListsProps) {
  const [modal, setModal] = useState<'UPDATE' | 'DELETE' | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <>
      <div className='space-y-6'>
        {data && data.length > 0 ? (
          data.map((list) => {
            return (
              <ListCard
                key={list.id}
                data={list}
                onUpdate={(id) => {
                  setSelectedId(id);
                  setModal('UPDATE');
                }}
                onDelete={(id) => {
                  setSelectedId(id);
                  setModal('DELETE');
                }}
              />
            );
          })
        ) : (
          <div>
            <p>Tidak ada lists yang ditemukan</p>
          </div>
        )}
      </div>

      <Dialog
        open={modal === 'UPDATE'}
        onOpenChange={(open) => setModal(open ? 'UPDATE' : null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Item</DialogTitle>
          </DialogHeader>

          <div className='space-y-4'>
            <div className='space-y-2'>
              <Label>Km terakhir ganti</Label>
              <div className='flex items-center gap-2'>
                <Input type='number' placeholder='0km' />
                <p className='text-muted-foreground'>Km</p>
              </div>
            </div>

            <div className='space-y-2'>
              <Label>Waktu</Label>
              <DatePicker
                className='w-full bg-transparent'
                value={new Date()}
                onChange={(value: Date) => {
                  console.log(value);
                }}
              />
            </div>

            <Button asChild variant={'ghost'} className='text-primary'>
              <Link
                href={`/me/lists/update/${selectedId}`}
                className='flex items-center gap-2'
              >
                <span>Selengkapnya</span>
                <ChevronRight size={16} />
              </Link>
            </Button>

            <DialogFooter>
              <Button variant={'secondary'} onClick={() => setModal(null)}>
                Batal
              </Button>
              <Button>Simpan</Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={modal === 'DELETE'}
        onOpenChange={(open) => setModal(open ? 'DELETE' : null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
