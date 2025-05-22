
export default function Search({ placeholder }: { placeholder: string }) {
  return (
    <input
      className="px-4 text-grey-400 py-2 w-full max-w-[720px] border-grey-400 bg-yellow-100 rounded-lg text-white focus:outline-none"
      placeholder={placeholder}
    />
  );
}