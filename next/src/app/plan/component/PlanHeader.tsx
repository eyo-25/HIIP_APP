import { Logo } from "@/comman/assets";
import Image from "next/image";

type Props = {
  selectedPlanTitle: string;
};

export default function PlanHeader({ selectedPlanTitle }: Props) {
  return (
    <header className="relative flex px-25pxr items-center justify-between w-full h-[8%] bg-white">
      <h4 className="font-bold text-xl">
        {selectedPlanTitle === ""
          ? "플랜을 생성해 주세요"
          : selectedPlanTitle.slice(0, 12)}
      </h4>
      <Image src={Logo} alt="logo" width={53} height={22} />
    </header>
  );
}
