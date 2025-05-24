export default function Vehicle({ id }: { id: number }) {
  const status = [
    "Active", "Overdue", "Cancelled", "Trialing", "Expired", "Refunded"
  ];

  return (
    <div className="flex flex-col space-y-2 h-full overflow-hidden">
      <span className="font-semibold text-black text-[20px]">Vehicle</span>
    </div>
  );
}