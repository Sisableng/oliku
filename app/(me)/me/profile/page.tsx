import { getUserData, getUserSession } from '@/app/actions';
import ProfileForm from '@/components/me/form/ProfileForm';
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
    <div>
      <ProfileForm data={user} />
    </div>
  );
}
