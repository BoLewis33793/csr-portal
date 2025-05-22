import Search from "../search";

export default function SalesNav() {
  return (
    <div className="relative flex mx-[24px] items-center">
      <div className="hidden desktop-large:flex mr-4 items-center">
        <h1 className="text-white text-[28px] font-bold">Sales</h1>
        <div className="flex flex-row border-2 border-dark-300 rounded-xl ml-[24px] p-[2px] px-[6px] items-center">
          <p className="text-white text-sm mr-[4px]">375</p>
          <p className="text-grey-100 text-sm">total sales</p>
        </div>
      </div>
      <div className="flex flex-row items-center flex-grow justify-center">
        <Search placeholder="Search sales..." />
      </div>
    </div>
  );
}