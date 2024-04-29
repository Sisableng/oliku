'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Bike, Car, Filter, Search } from 'lucide-react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { Input } from '../ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useDebounce } from 'use-debounce';

export default function FilterLists() {
  const [query, setQuery] = useState('');
  const [debouncedValue] = useDebounce(query, 1000);

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  function updateSorting(sortOrder: string) {
    const params = new URLSearchParams(searchParams.toString());

    // Remove the sorting parameter if it matches the provided sortOrder
    if (params.get('filter') === sortOrder) {
      //   params.delete('filter');
      //   window.history.pushState(null, '', `?${params.toString()}`);
      router.push(`/me`);
    } else {
      // Update or add the sorting parameter
      //   params.set('filter', sortOrder);
      //   window.history.pushState(null, '', `?${params.toString()}`);
      router.push(pathname + '?' + createQueryString('filter', sortOrder));
    }
  }

  useEffect(() => {
    if (debouncedValue.length > 0) {
      router.push(pathname + '?' + createQueryString('search', debouncedValue));
    } else if (searchParams.get('filter')) {
      router.push(`/me?filter=${searchParams.get('filter')}`);
    } else {
      router.push(`/me`);
    }
  }, [debouncedValue, searchParams]);

  return (
    <div className='flex items-center gap-4 md:justify-between'>
      <div className='relative flex-1'>
        <div className='absolute left-2.5 top-2.5 text-muted-foreground'>
          <Search size={16} />
        </div>
        <Input
          type='text'
          defaultValue={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          placeholder='Cari...'
          className='rounded-l-full rounded-r-full pl-8 md:max-w-lg'
        />
      </div>

      {/* Desktop */}
      <div className='flex items-center gap-4 max-sm:hidden'>
        <p className='text-sm text-muted-foreground'>Filter</p>
        <div className='flex items-center gap-1'>
          <Button
            size={'icon'}
            variant={
              searchParams.get('filter') === 'car' ? 'default' : 'outline'
            }
            onClick={() => updateSorting('car')}
          >
            <Car size={20} />
          </Button>
          <Button
            size={'icon'}
            variant={
              searchParams.get('filter') === 'motorcycle'
                ? 'default'
                : 'outline'
            }
            onClick={() => updateSorting('motorcycle')}
          >
            <Bike size={20} />
          </Button>
        </div>
      </div>

      {/* Mobile */}
      <div className='md:hidden'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={'secondary'} size={'icon'}>
              <Filter size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent sideOffset={10} align='end'>
            <DropdownMenuLabel>Filter</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Button
                variant={
                  searchParams.get('filter') === 'car' ? 'default' : 'ghost'
                }
                onClick={() => updateSorting('car')}
                className='flex w-full items-center justify-start gap-3'
              >
                <Car size={20} className='text-white/50' />
                Mobil
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Button
                variant={
                  searchParams.get('filter') === 'motorcycle'
                    ? 'default'
                    : 'ghost'
                }
                onClick={() => updateSorting('motorcycle')}
                className='flex w-full items-center justify-start gap-3'
              >
                <Bike size={20} className='text-white/50' />
                Motor
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
