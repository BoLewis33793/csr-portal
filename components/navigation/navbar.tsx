import NavLinks from "./nav-links";
import { RiArmchairFill } from "@remixicon/react";

export default function NavBar() {
  return (
    <div className="h-screen w-[84px] bg-black-100 pt-8 desktop-large:w-60">
      <NavLinks />
    </div>
  );
}