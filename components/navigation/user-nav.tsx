'use client';
import Link from 'next/link';
import { 
    RiUser3Fill,
    RiArrowLeftLongLine,
    RiMenuLine
 } from "@remixicon/react";

interface UserNavProps {
  name: string;
  onMenuClick: () => void;    // callback to open sidebar
}

export default function UserNav({ name, onMenuClick }: UserNavProps) {
  return (
    <div className="flex h-[48px] pl-4 items-center justify-between">
      
      <div className="flex items-center text-[24px] text-black-100">
        <Link 
            href={'/dashboard/users'}
            className='bg-yellow-100 mr-2 py-[3px] px-[5px] border border-grey-200 rounded shadow'>
            <RiArrowLeftLongLine className='h-4 w-6 text-grey-300'/>
        </Link>
        <span className='pl-[4px] text-[22px]'>{name}</span>
      </div>

      {/* Hamburger button - show only on small screens */}
      <button
        onClick={onMenuClick}
        aria-label="Open menu"
        className="desktop-large:hidden mr-4 text-yellow-100 bg-blue-100 p-1 font-bold hover:bg-blue-600 text-3xl select-none rounded"
      >
        <RiMenuLine />
      </button>
    </div>
  );
}
