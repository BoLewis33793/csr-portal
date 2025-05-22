'use client';
import {
  RiFunctionFill,
  RiUser3Fill,
  RiShoppingBasketFill,
  RiRoadsterFill,
} from "@remixicon/react";

import Link from 'next/link';
import clsx from 'clsx';
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { name: 'Dashboard', href: '/dashboard', icon: RiFunctionFill },
  { name: 'Users', href: '/dashboard/users', icon: RiUser3Fill },
  { name: 'Sales', href: '/dashboard/sales', icon: RiShoppingBasketFill },
  { name: 'Vehicles', href:'/dashboard/vehicles', icon: RiRoadsterFill },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col ml-4 space-y-2">
      {links.map((link) => {
        const LinkIcon = link.icon;
        const isActive =
          link.href === '/dashboard'
          ? pathname === '/dashboard'
          : pathname.startsWith(link.href);

        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'h-[56px] flex items-center gap-4 px-4 text-white rounded-l-md hover:bg-blue-100',
              {
                'bg-blue-100': isActive,
              }
            )}
          >
            <LinkIcon className="w-5 h-5" />
            <span className="hidden desktop-large:inline">{link.name}</span>
          </Link>
        );
      })}
    </div>
  );
}