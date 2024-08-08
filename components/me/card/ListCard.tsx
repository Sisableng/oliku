'use client';
import { List } from '@prisma/client';
import React, { FC, ReactNode } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';
import {
  ChevronRight,
  Dot,
  EllipsisVertical,
  Gauge,
  Wrench,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DropdownMenuArrow } from '@radix-ui/react-dropdown-menu';
import { optimized } from '@/utils/optimized';
import Link from 'next/link';
import clsx from 'clsx';

interface ListCardProps {
  data: List;
  onUpdate: (id: string) => void;
  onDelete: (id: string) => void;
}

const ListCard = ({ data, onUpdate, onDelete }: ListCardProps) => {
  const date = new Date(data.lastTime).toLocaleDateString('id', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  return (
    <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
      <div className='group h-full max-h-52 w-full overflow-hidden rounded-xl bg-muted dark:bg-card md:max-h-60'>
        <Link href={`/me/lists/${data.id}`}>
          <Image
            src={optimized(data.cover ?? '', 250)}
            width={500}
            height={500}
            alt='cover image'
            className='h-full w-full object-contain transition-transform ease-in-out group-hover:scale-110'
          />
        </Link>
      </div>
      <Card className='relative md:col-span-2'>
        <CardHeader className='relative'>
          <CardTitle className='line-clamp-2 max-w-[16rem] md:max-w-xl'>
            {data.vehicleName}
          </CardTitle>
          <div className='flex items-center gap-2 text-sm text-muted-foreground'>
            <Badge>{data.vehicle === 'CAR' ? 'Mobil' : 'Motor'}</Badge>
            <Dot size={16} />
            <span>{`Terakhir - ${date}`}</span>
          </div>

          <div className='absolute right-2 top-0'>
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant={'ghost'}
                  size={'icon'}
                  className='rounded-full'
                >
                  <EllipsisVertical size={20} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side='bottom'
                align='end'
                className='flex flex-col gap-1 bg-border'
              >
                <DropdownMenuItem asChild className='cursor-pointer'>
                  <Link href={`/me/lists/${data.id}`} passHref>
                    Detail
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className='cursor-pointer'
                  onClick={() => onUpdate(data.id)}
                >
                  Update
                </DropdownMenuItem>
                <DropdownMenuItem
                  className='cursor-pointer bg-destructive focus:text-destructive-foreground'
                  onClick={() => onDelete(data.id)}
                >
                  Hapus
                </DropdownMenuItem>
                <DropdownMenuArrow className='fill-border' />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent className='grid grid-cols-2 gap-8'>
          <ItemCard title='Merek Oli' className='max-sm:col-span-2'>
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
        </CardContent>
        {/* <CardFooter className='justify-end'>
          <div>
            <Button asChild variant={'secondary'} className=''>
              <Link
                href={`/me/lists/${data.id}`}
                className='flex items-center gap-2 text-primary'
              >
                <span>Selengkapnya</span>
                <ChevronRight size={16} />
              </Link>
            </Button>
          </div>
        </CardFooter> */}
      </Card>
    </div>
  );
};

interface ItemCardProps {
  title: string;
  children: ReactNode;
  className?: string;
}
const ItemCard = ({ title, children, className }: ItemCardProps) => {
  return (
    <div className={clsx('space-y-1', className)}>
      <p className='text-sm text-muted-foreground'>{title}</p>
      <div className='text-sm'>{children}</div>
    </div>
  );
};

export default ListCard;
