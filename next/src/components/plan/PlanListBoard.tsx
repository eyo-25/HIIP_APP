import React from "react";
import PlanCard from "./PlanCard";
import { SelectPlanModel, SimplePlanModel } from "@/comman/model/plan";
import { motion } from "framer-motion";

type Props = {
  planList: SimplePlanModel[];
  selectedPlanId?: string;
  selectPlan: (planData: SelectPlanModel | null) => void;
};

const boardVariants = {
  normal: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duration: 0.7,
      type: "linear",
    },
  },
};

function PlanListBoard({ planList, selectedPlanId, selectPlan }: Props) {
  return (
    <motion.ul
      variants={boardVariants}
      initial="normal"
      animate="animate"
      className="pb-[40%] sroll h-full pt-5pxr w-full px-[5%] mx-auto overflow-hidden"
    >
      {planList.length < 1 && (
        <p className="mt-[7%] font-bold text-3xl text-gray-500">
          플랜을 추가해 주세요
        </p>
      )}
      {planList.map((planData: SimplePlanModel) => (
        <PlanCard
          key={planData._id}
          planData={planData}
          selectedPlanId={selectedPlanId}
          selectPlan={selectPlan}
        />
      ))}
    </motion.ul>
  );
}

export default React.memo(PlanListBoard);
