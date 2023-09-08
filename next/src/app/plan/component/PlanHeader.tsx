import { HamMenu, Logo } from "@/assets";
import Image from "next/image";

export default function PlanHeader() {
  return (
    <header className="relative flex px-20pxr items-center justify-between w-full h-[8%]">
      <Image src={Logo} alt="logo" width={53} height={22} />
      <HamMenu />
    </header>
  );
}
