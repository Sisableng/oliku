'use client';
import { Toaster } from '@/components/ui/sonner';
import { useTheme } from 'next-themes';

import React from 'react';

export default function ToastProvider() {
  const { resolvedTheme } = useTheme();
  return (
    <Toaster
      richColors
      closeButton
      pauseWhenPageIsHidden
      theme={resolvedTheme === 'light' ? 'light' : 'dark'}
    />
  );
}
