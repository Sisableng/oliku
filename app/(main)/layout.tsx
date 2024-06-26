import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import NextTopLoader from '@/components/progressbar-provider';
import Navbar from '@/components/main/navigation/Navbar';
import ToastProvider from '@/components/toast-provider';
import AuthProvider from '@/components/auth-provider';
import { auth } from '@/auth';

const inter = Inter({ subsets: ['latin'] });

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8fafc' },
    { media: '(prefers-color-scheme: dark)', color: '#020617' },
  ],
};

export const metadata: Metadata = {
  title: {
    template: '%s | Oliku',
    default: 'Oliku', // a default is required when creating a template
  },
  description: 'Generated by create next app',
  icons: {
    icon: '/assets/favicon.ico',
    shortcut: '/assets/shortcut-icon.png',
    apple: '/assets/apple-icon.png',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/assets/apple-touch-icon-precomposed.png',
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider session={session}>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
          >
            <NextTopLoader />
            <ToastProvider />
            <Navbar />
            <main>{children}</main>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
