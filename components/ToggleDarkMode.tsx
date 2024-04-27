'use client';
import { useTheme } from 'next-themes';
import React, { useState } from 'react';
import { Button } from './ui/button';
import { MoonStar, SunMedium } from 'lucide-react';

interface ToggleDarkModeProps {
  className?: string;
}

export default function ToggleDarkMode({ className }: ToggleDarkModeProps) {
  const { resolvedTheme, setTheme } = useTheme();

  const handleTheme = () => {
    if (resolvedTheme === 'dark') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  };
  return (
    <Button
      variant={'ghost'}
      size={'icon'}
      onClick={handleTheme}
      className={className}
    >
      {resolvedTheme === 'dark' ? (
        <SunMedium size={20} />
      ) : (
        <MoonStar size={20} />
      )}
    </Button>
  );
}
