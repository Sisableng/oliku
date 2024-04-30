import { getUserData, getUserSession } from '@/app/actions';
import ProfileForm from '@/components/me/form/ProfileForm';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react';

export const metadata = {
  title: 'Profil',
};

export default async function ProfilePage() {
  const session = await getUserSession();

  if (!session) {
    notFound();
  }

  const user = await getUserData(session.user.id as string);

  if (!user) {
    notFound();
  }

  return (
    <div className='space-y-10'>
      <Button asChild variant={'ghost'}>
        <Link href={'/me'} className='flex items-center gap-2'>
          <ChevronLeft size={16} />
          <span>Kembali</span>
        </Link>
      </Button>
      <ProfileForm data={user} />
    </div>
  );
}
