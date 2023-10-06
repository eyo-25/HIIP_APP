import { Logo } from "@/comman/assets";
import Image from "next/image";

type Props = {
  selectedPlanTitle: string;
  isPlanList: boolean;
};

export default function PlanHeader({ selectedPlanTitle, isPlanList }: Props) {
  return (
    <header className="relative flex px-25pxr items-center justify-between w-full desktop:h-[8%] h-[7%] bg-white">
      <h4 className="font-bold desktop:text-xl text-base">
        {selectedPlanTitle === ""
          ? isPlanList
            ? "플랜을 선택해 주세요"
            : "플랜을 추가해 주세요"
          : selectedPlanTitle.slice(0, 12)}
      </h4>
      <div className="relative desktop:w-53pxr desktop:h-22pxr w-45pxr h-18pxr">
        <Image src={Logo} alt="logo" fill />
      </div>
    </header>
  );
}
