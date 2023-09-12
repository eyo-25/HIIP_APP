import { Logo } from "@/comman/assets";
import { selected_planTitle_atom } from "@/store";
import { useAtomValue } from "jotai";
import Image from "next/image";

export default function PlanHeader() {
  const selectPlanTitle = useAtomValue(selected_planTitle_atom);

  return (
    <header className="relative flex px-25pxr items-center justify-between w-full h-[8%] bg-white">
      <h4 className="font-bold text-xl">
        {selectPlanTitle === ""
          ? "플랜을 생성해 주세요"
          : selectPlanTitle.slice(0, 12)}
      </h4>
      <Image src={Logo} alt="logo" width={53} height={22} />
    </header>
  );
}
