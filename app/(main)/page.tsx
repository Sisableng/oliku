import InstallPWAButton from '@/components/main/InstallPWAButton';
import { Button } from '@/components/ui/button';
import { Github, Instagram, Linkedin } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className='space-y-20'>
      <section
        className='relative h-screen bg-cover bg-fixed bg-center bg-no-repeat'
        style={{
          backgroundImage: "url('/assets/bg.svg')",
        }}
      >
        <div className='absolute inset-0 z-10 mx-auto grid max-w-4xl place-content-center space-y-8 text-center'>
          <h1 className='text-4xl font-bold lg:text-6xl'>
            Selamat datang di <span className='text-primary'>Oliku</span>!
          </h1>
          <p className='mx-auto text-muted-foreground max-sm:px-10 max-sm:text-sm md:max-w-lg md:font-semibold'>
            Oliku adalah aplikasi pengingat ganti oli buat kamu yang sering
            lupa, Oliku dibuat dengan Next.js dan Tailwind CSS.
          </p>
          <InstallPWAButton />

          <div className='flex items-center justify-center gap-4 px-10'>
            <Button asChild size={'icon'} variant={'ghost'}>
              <Link href='https://github.com/Sisableng' target='_blank'>
                <Github size={18} />
              </Link>
            </Button>
            <Button asChild size={'icon'} variant={'ghost'}>
              <Link
                href='https://www.linkedin.com/in/wildanm2/'
                target='_blank'
              >
                <Linkedin size={18} />
              </Link>
            </Button>
            <Button asChild size={'icon'} variant={'ghost'}>
              <Link href='https://instagram.com/wldnm2' target='_blank'>
                <Instagram size={18} />
              </Link>
            </Button>
          </div>
        </div>

        <div className='pointer-events-none absolute inset-x-0 top-0 h-52 bg-gradient-to-b from-background to-transparent' />
        <div className='pointer-events-none absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-background to-transparent' />
      </section>
    </div>
  );
}
