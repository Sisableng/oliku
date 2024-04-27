'use client';
import { SidebarMenu } from '@/types/sidebar-menus';
import { LayoutDashboard } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

const iconSize = 20;
const sidebarMenus: SidebarMenu[] = [
  {
    uid: 'dashboard',
    title: 'Dashboard',
    icon: <LayoutDashboard size={iconSize} />,
  },
];

export default function Sidebar() {
  return (
    <aside className='fixed inset-y-0 left-0 w-60 border-r px-6 py-6'>
      <div className='space-y-8'>
        <div className='flex items-center gap-2'>
          <Image
            src={'/assets/favicon.ico'}
            width={32}
            height={32}
            alt='icon'
          />
          <h4 className='text-2xl font-bold'>Oliku</h4>
        </div>
        <div>
          <ul className='space-y-4'>
            {sidebarMenus.map((item) => {
              return (
                <li key={item.uid} className='flex items-center gap-4'>
                  <span>{item.icon}</span>
                  <span>{item.title}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </aside>
  );
}
