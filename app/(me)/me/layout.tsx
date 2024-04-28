import React, { ReactNode } from 'react';

export default function MeLayout({
  children,
  detailModal,
}: {
  children: ReactNode;
  detailModal: ReactNode;
}) {
  return (
    <>
      {children}
      {detailModal}
    </>
  );
}
