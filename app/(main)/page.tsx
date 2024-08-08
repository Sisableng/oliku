import InstallPWAButton from '@/components/main/InstallPWAButton';
import { Button } from '@/components/ui/button';
import { Github, Instagram, Linkedin } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className='space-y-20'>
      <section className='relative h-screen overflow-hidden bg-background'>
        <div className='container absolute inset-0 z-10 mx-auto grid place-content-center space-y-8 md:max-w-4xl md:text-center'>
          <h1 className='text-5xl font-bold leading-snug lg:text-6xl'>
            Selamat datang di <span className='text-primary'>Oliku</span>!
          </h1>
          <p className='text-muted-foreground max-sm:text-sm md:mx-auto md:max-w-lg'>
            Oliku adalah aplikasi pengingat ganti oli buat kamu yang sering
            lupa, Oliku dibuat dengan Next.js dan Tailwind CSS.
          </p>

          <InstallPWAButton />

          <div className='flex items-center gap-4 md:justify-center md:px-10'>
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

        {/* <div className='pointer-events-none absolute inset-x-0 top-0 h-52 bg-gradient-to-b from-background to-transparent' />
        <div className='pointer-events-none absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-background to-transparent' /> */}

        <div className='absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]'></div>
      </section>
    </div>
  );
}
