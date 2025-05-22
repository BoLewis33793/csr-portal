import Link from 'next/link';

export default function AmpLogo() {
  return (
    <Link 
      className="h-[120px]"
      href="/"
    >
      <img className="h-[65px]" src="/Stackee-Logo.png" alt="Stackee Logo" />
    </Link>
  );
}