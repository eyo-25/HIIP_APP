import { Logo } from "@/comman/assets";
import Image from "next/image";
import { motion } from "framer-motion";

const calendarHeaderVariants = {
  normal: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duration: 1,
      type: "linear",
    },
  },
};

type Props = {
  selectedPlanTitle: string;
  isPlanList: boolean;
};

export default function PlanHeader({ selectedPlanTitle, isPlanList }: Props) {
  return (
    <header className="px-25pxr w-full desktop:h-[8%] h-[7%] bg-white">
      <motion.div
        className="relative flex items-center justify-between w-full h-full"
        variants={calendarHeaderVariants}
        initial="normal"
        animate="animate"
      >
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
      </motion.div>
    </header>
  );
}
