'use client';
import Link from 'next/link';
import { 
    RiUser3Fill,
    RiArrowLeftLongLine,
 } from "@remixicon/react";

export default function UserNav() {
  return (
    <div className="flex h-[48px] pl-4">
      <div className="flex items-center text-[24px] text-black-100">
        <Link 
            href={'/dashboard/users'}
            className='bg-yellow-100 mr-2 py-[3px] px-[5px] border border-grey-200 rounded shadow'>
            <RiArrowLeftLongLine className='h-4 w-6 text-grey-300'/>
        </Link>
        <RiUser3Fill className="h-[24px] w-[24px]" />
        <span className='pl-[4px]'>Users</span>
      </div>
    </div>
  );
}