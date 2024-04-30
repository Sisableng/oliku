'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { MonitorDown } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function InstallPWAButton() {
  const [showInstall, setShowInstall] = useState<boolean>(false);
  const [prompt, setPrompt] = useState<any>(null);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      // Register the service worker
      navigator.serviceWorker.register('/sw.js');
    }

    const handleBeforeInstallPrompt = (event: any) => {
      // Prevent the default browser prompt
      event.preventDefault();
      // Store the event for later use
      setPrompt(event);

      if (!window.matchMedia('(display-mode: standalone)').matches) {
        // Show your custom install button
        setShowInstall(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstallButtonClick = () => {
    if (prompt) {
      // Trigger the installation prompt
      prompt.prompt();
      // Wait for the user to respond to the prompt
      prompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        } else {
          console.log('User dismissed the install prompt');
        }
        // Reset the prompt variable
        setPrompt(null);
      });
    }
  };
  return (
    <div>
      {showInstall && (
        <Button
          size={'lg'}
          className='mx-auto w-max gap-2'
          onClick={handleInstallButtonClick}
        >
          <MonitorDown size={20} />
          <span>Install App</span>
        </Button>
      )}
    </div>
  );
}
