import { RiAddFill, RiVisaFill } from "@remixicon/react";

interface CardItem {
  icon: React.ElementType;
  card_number: string;
  expiration_number?: string; // Optional
}

export default function PaymentCardInfo({ list }: { list: CardItem[] }) {
  return (
    <div className="flex flex-row space-x-3 p-3 min-w-max">
      {/* Render all real cards first */}
      {list.map((item, index) => {
        const Icon = item.icon;
        return (
          <button
            key={index}
            className="min-h-[160px] min-w-[240px] grid grid-rows-[auto_1fr_auto] p-4 bg-black-100 rounded-2xl text-white shadow hover:bg-black-200"
          >
            <Icon className="h-10 w-10" />
            <div className="flex justify-center items-center">
              <span className="text-xl tracking-widest">{item.card_number}</span>
            </div>
            <div className="flex justify-end">
              {/* Hide expiration if not provided */}
              {item.expiration_number && (
                <span className="text-md">{item.expiration_number}</span>
              )}
            </div>
          </button>
        );
      })}

      {/* Add Card button (always last) */}
      <button
        className="min-h-[160px] min-w-[240px] grid grid-rows-[auto_1fr_auto] p-4 bg-black-100 rounded-2xl text-white shadow hover:bg-black-200"
      >
        <RiAddFill className="h-10 w-10" />
        <div className="flex justify-center items-center">
          <span className="text-xl tracking-widest">Add Card</span>
        </div>
        <div className="flex justify-end">
          {/* Empty span to preserve layout structure */}
          <span className="text-md invisible">placeholder</span>
        </div>
      </button>
    </div>
  );
}

