import { useState } from "react";
import { motion } from "framer-motion";
import PlanHeader from "./PlanHeader";
import PlanListBoard from "@/components/plan/PlanListBoard";
import MetaButton from "@/components/ui/MetaButton";
import Calendar from "@/components/calendar/Calendar";
import {
  CalendaMemoModel,
  PlanModel,
  SelectPlanModel,
  SimplePlanModel,
} from "@/comman/model/plan";
import Link from "next/link";
import { useMouseHandlers } from "@/comman/utils/mouseHandlers";
import { useTouchHandlers } from "@/comman/utils/touchHandlers";

const buttonVarients = {
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
  planListData: PlanModel[];
};

function PlanSection({ planListData }: Props) {
  const [isWeekly, setIsWeekly] = useState<boolean>(false);
  const [planList, setPlanList] = useState<SimplePlanModel[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<SelectPlanModel | null>(
    null
  );
  const [calendarMemo, setCalendarMemo] = useState<CalendaMemoModel>({});

  const { handleTouchStart, handleTouchEnd } = useTouchHandlers(setIsWeekly);
  const { handleMouseUp, handleMouseDown } = useMouseHandlers(
    setIsWeekly,
    isWeekly
  );
  const selectPlan = (data: SelectPlanModel | null) => {
    setSelectedPlan(data);
  };

  const calendarVariants = {
    normal: {
      height: "0%",
    },
    animate: {
      height: isWeekly ? "20%" : "52%",
      transition: {
        duration: 0.5,
        type: "tween",
      },
    },
  };

  const planBoardVariants = {
    normal: {
      height: "80%",
    },
    animate: {
      height: isWeekly ? "80%" : "48%",
      transition: {
        duration: 0.5,
        type: "tween",
      },
    },
  };

  return (
    <>
      <PlanHeader
        selectedPlanTitle={selectedPlan ? selectedPlan.title : ""}
        isPlanList={0 < planList.length ? true : false}
      />
      <main className="relative flex flex-col w-full overflow-hidden h-[92%]">
        <motion.section
          variants={calendarVariants}
          initial="normal"
          animate="animate"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onTouchEnd={handleTouchEnd}
          onTouchStart={handleTouchStart}
          className="bg-white drop-shadow-sm"
        >
          <Calendar
            planListData={planListData}
            isWeekly={isWeekly}
            selectedPlan={selectedPlan}
            setPlanList={setPlanList}
            calendarMemo={calendarMemo}
            setCalendarMemo={setCalendarMemo}
          />
        </motion.section>
        <motion.section
          variants={planBoardVariants}
          initial="normal"
          animate="animate"
        >
          <PlanListBoard
            selectedPlanId={selectedPlan?._id}
            selectPlan={selectPlan}
            planList={planList}
          />
        </motion.section>
      </main>
      <motion.div variants={buttonVarients} initial="normal" animate="animate">
        <Link href={"/write/creat"}>
          <MetaButton mode={"creat"} />
        </Link>
      </motion.div>
    </>
  );
}

export default PlanSection;
