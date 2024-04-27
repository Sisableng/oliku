import { ReactNode } from "react";

interface M extends Menu {
  icon?: ReactNode;
}

export const menus: M[] = [
  {
    uid: "about",
    title: "Tentang",
    href: "/about",
  },
  {
    uid: "faq",
    title: "FAQ",
    href: "/faq",
  },
];
