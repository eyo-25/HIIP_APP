import { HamMenu, Logo } from "@/comman/assets";
import Image from "next/image";

export default function PlanHeader() {
  return (
    <header className="relative flex px-20pxr items-center justify-between w-full h-[8%] bg-white">
      <Image src={Logo} alt="logo" width={53} height={22} />
      <HamMenu />
    </header>
  );
}
