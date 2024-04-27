import { ReactNode } from 'react';

export interface SidebarMenu {
  uid: string;
  title: string;
  icon: ReactNode;
  href?: string;
  onClick?: () => void;
}
