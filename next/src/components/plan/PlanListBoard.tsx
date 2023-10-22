import React, { useState } from "react";
import { SelectPlanModel, SimplePlanModel } from "@/comman/model/plan";
import { motion } from "framer-motion";
import PlanCardSkeleton from "./PlanCardSkeleton";
import PlanCard from "./PlanCard";
import dayjs from "dayjs";
import { planListBoardVariants } from "./PlanVariants";

type Props = {
  clickedDate: dayjs.Dayjs;
  planList: SimplePlanModel[];
  selectedPlanId?: string;
  selectPlan: (planData: SelectPlanModel | null) => void;
};

function PlanListBoard({
  planList,
  selectedPlanId,
  clickedDate,
  selectPlan,
}: Props) {
  const [isBoardLoading, setIsBoardLoading] = useState<boolean>(false);
  const loadingSetter = (isBoardLoading: boolean) => {
    setIsBoardLoading(isBoardLoading);
  };

  return (
    <motion.ul
      variants={planListBoardVariants}
      initial="normal"
      animate="animate"
      className={`pb-[40%] h-full pt-5pxr w-full px-[5%] mx-auto overflow-hidden ${
        !isBoardLoading && "sroll"
      }`}
    >
      {isBoardLoading ? (
        <>
          {Array.from({ length: 4 }).map((_, idx) => (
            <li className="w-full bg-gray-200" key={idx}>
              <PlanCardSkeleton />
            </li>
          ))}
        </>
      ) : (
        <>
          {planList.length < 1 && (
            <p className="mt-[7%] font-bold text-3xl text-gray-500">
              플랜을 추가해 주세요
            </p>
          )}
          {planList.map((planData: SimplePlanModel) => (
            <PlanCard
              key={planData._id}
              clickedDate={clickedDate}
              planData={planData}
              selectedPlanId={selectedPlanId}
              selectPlan={selectPlan}
              loadingSetter={loadingSetter}
            />
          ))}
        </>
      )}
    </motion.ul>
  );
}

export default React.memo(PlanListBoard);
