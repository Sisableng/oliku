import { optimized } from '@/utils/optimized';
import Image from 'next/image';
import React from 'react';
import { getList } from '../actions';
import { ChevronLeft, Dot, Gauge, Wrench } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import DeleteButton from './components/DeleteButton';

export const metadata = {
  title: 'Detail',
};

export default async function ListDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const data = await getList(String(params.id));

  if (!data) {
    return (
      <div>
        <p>Data tidak ditemukan.</p>
      </div>
    );
  }

  const date = new Date(data.lastTime).toLocaleDateString('id', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className='space-y-10'>
      {/* <Button asChild variant={'ghost'}>
        <Link href='/me' className='flex items-center gap-2'>
          <ChevronLeft size={16} />
          <span>Kembali</span>
        </Link>
      </Button> */}
      <div className='grid grid-cols-1 gap-10 md:grid-cols-3'>
        <div>
          <div className='h-60 w-full overflow-hidden rounded-xl bg-card md:max-h-96'>
            <Image
              src={optimized(data.cover ?? '', 250)}
              width={500}
              height={500}
              alt='cover image'
              className='h-full w-full object-contain'
            />
          </div>
        </div>
        <div className='md:col-span-2'>
          <div className='relative space-y-6 md:col-span-2'>
            <div className='space-y-2'>
              <h4 className='line-clamp-2 text-2xl font-semibold'>
                {data.vehicleName}
              </h4>
              <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                <Badge>{data.vehicle === 'CAR' ? 'Mobil' : 'Motor'}</Badge>
                <Dot size={16} />
                <span>{`Terakhir - ${date}`}</span>
              </div>

              {/* <div className='absolute right-2 top-0'>
          </div> */}
            </div>
            <div className='grid-cols-2 gap-6 max-sm:space-y-6 md:grid'>
              <ItemCard title='Merek Oli'>
                <div className='flex items-center gap-2'>
                  <Wrench size={16} className='text-muted-foreground' />
                  <p>{data.oilType}</p>
                </div>
              </ItemCard>
              <ItemCard title='Jumlah Oli'>
                <div className='flex items-center gap-2'>
                  <Wrench size={16} className='text-muted-foreground' />
                  <p>{data.oilCount}</p>
                </div>
              </ItemCard>
              <ItemCard title='Km terakhir ganti'>
                <div className='flex items-center gap-2'>
                  <Gauge size={16} className='text-muted-foreground' />
                  <p className='ordinal'>{data.lastKm}Km</p>
                </div>
              </ItemCard>
              <ItemCard title='Km Maksimal'>
                <div className='flex items-center gap-2'>
                  <Gauge size={16} className='text-muted-foreground' />
                  <p className='ordinal'>{data.maxKm}Km</p>
                </div>
              </ItemCard>
            </div>

            <Separator />

            <div className='flex items-center gap-2'>
              <Button asChild variant={'secondary'}>
                <Link href={`/me/lists/update/${data.id}`}>Update</Link>
              </Button>
              <DeleteButton data={data} />
            </div>

            {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
          </div>
        </div>
      </div>
    </div>
  );
}

interface ItemCardProps {
  title: string;
  children: React.ReactNode;
}
const ItemCard = ({ title, children }: ItemCardProps) => {
  return (
    <div className='space-y-1'>
      <p className='text-sm text-muted-foreground'>{title}</p>
      <div className='max-sm:text-sm'>{children}</div>
    </div>
  );
};
