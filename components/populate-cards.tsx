type InfoItem = {
    label: string;
    value: string | number;
  };
  
  export default function PopulateCards({ info }: { info: InfoItem[] }) {
    return (
      <div className='flex-1 grid grid-cols-2 grid-rows-3 gap-y-4 gap-x-6'>
        {info.map((item) => (
          <div key={item.label}>
            <p className="text-[14px] text-grey-300">{item.label}</p>
            <p>{item.value}</p>
          </div>
        ))}
      </div>
    );
  }