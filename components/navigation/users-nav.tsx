import { RiUser3Fill } from "@remixicon/react";

export default function UsersNav() {
  return (
    <div className="flex h-[48px] pl-4">
      <div className="flex items-center text-[24px] text-black-100">
        <RiUser3Fill className="h-[24px] w-[24px]" />
        <span className='pl-[4px]'>Users</span>
      </div>
    </div>
  );
}