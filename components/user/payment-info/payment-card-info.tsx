import { Payment_Card } from "@/lib/definitions";
import { RiAddFill, RiVisaFill } from "@remixicon/react";

export default function PaymentCardInfo({
  list,
  setCard,
  setIsCardSelected,
  setShowPaymentInfo
}: {
  list: Payment_Card[];
  setCard: (card: Payment_Card) => void;
  setIsCardSelected: (value: boolean) => void;
  setShowPaymentInfo: (value: boolean) => void;
}) {

  const handleClick = (id: number) => {
    const selectedCard = list.find(card => card.id === id);

    if (selectedCard) {
      setCard(selectedCard);
      setIsCardSelected(true);
      setShowPaymentInfo(false);
    }
  }

  return (
    <div className="flex flex-row space-x-3 p-3 min-w-max">
      {/* Render all real cards first */}
      {list.map((item, index) => {
        return (
          <button
            key={index}
            className="min-h-[160px] w-[240px] grid grid-rows-[auto_1fr_auto] p-4 bg-black-100 rounded-2xl text-white shadow hover:bg-black-200"
            onClick={() => handleClick(item.id)}
          >
            <RiVisaFill className="h-10 w-10" />
            <div className="flex justify-center items-center">
              <span className="text-lg tracking-widest">
                {item && item.card_number ? `**** **** **** ${item.card_number.slice(-4)}` : '----'}
              </span>
            </div>
            <div className="flex justify-end">
              {/* Hide expiration if not provided */}
              {item.card_expiration && (
                <span className="text-md">exp {item.card_expiration}</span>
              )}
            </div>
          </button>
        );
      })}

      {/* Add Card button (always last) */}
      <button
        className="min-h-[160px] w-[240px] grid grid-rows-[auto_1fr_auto] p-4 bg-black-100 rounded-2xl text-white shadow hover:bg-black-200"
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