import { getUserData, getUserSession } from '@/app/actions';
import { notFound } from 'next/navigation';
import PasswordForm from '@/components/me/form/PasswordForm';
import React from 'react';

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
    <div>
      <PasswordForm data={user} />
    </div>
  );
}
