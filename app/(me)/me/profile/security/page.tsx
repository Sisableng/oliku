import { getUserData, getUserSession } from '@/app/actions';
import { notFound } from 'next/navigation';
import PasswordForm from '@/components/me/form/PasswordForm';
import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export default async function SecurityPage() {
  const session = await getUserSession();

  if (!session) {
    notFound();
  }

  const user = await getUserData(session.user.id as string);

  if (!user) {
    notFound();
  }
  return (
    <div className='space-y-6'>
      <Button asChild variant={'ghost'}>
        <Link href={'/me'} className='flex items-center gap-2'>
          <ChevronLeft size={16} />
          <span>Kembali</span>
        </Link>
      </Button>
      <PasswordForm data={user} />
    </div>
  );
}
