import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import PlanHeader from "./PlanHeader";
import PlanListBoard from "@/components/plan/PlanListBoard";
import MetaButton from "@/components/ui/MetaButton";
import { SelectPlanModel, SimplePlanModel } from "@/comman/model/plan";
import Link from "next/link";
import { useMouseHandlers } from "@/comman/utils/mouseHandlers";
import { useTouchHandlers } from "@/comman/utils/touchHandlers";
import dayjs from "dayjs";
import { today } from "@/comman/utils/today";
import { useCalendar } from "@/comman/hooks/plan";
import CalendarPicker from "../calendar/CalendarPicker";

const buttonVarients = {
  normal: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.7,
      type: "linear",
    },
  },
};

function PlanSection() {
  const [displayMonth, setDisplayMonth] = useState<string>(
    today.format("YYYY-MM")
  );
  const [displayDate, setDisplayDate] = useState<dayjs.Dayjs>(today);
  const [isWeekly, setIsWeekly] = useState<boolean>(false);
  const [planList, setPlanList] = useState<SimplePlanModel[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<SelectPlanModel | null>(
    null
  );
  const [clickedDate, setClickedDate] = useState<dayjs.Dayjs>(today);

  const { calendarData, isLoading } = useCalendar(displayMonth);
  const { handleTouchStart, handleTouchEnd } = useTouchHandlers(setIsWeekly);
  const { handleMouseUp, handleMouseDown } = useMouseHandlers(
    setIsWeekly,
    isWeekly
  );
  const selectPlan = (data: SelectPlanModel | null) => {
    setSelectedPlan(data);
  };
  const displayMonthSetter = (year: number, month: number) => {
    const [currentYear, currentMonth] = displayMonth.split("-");
    if (+currentYear !== year || +currentMonth !== month) {
      setDisplayMonth(`${year}-${month}`);
    }
  };

  const calendarVariants = {
    normal: {
      height: "0%",
    },
    animate: {
      height: isWeekly ? "20%" : "52%",
      transition: {
        duration: 0.45,
        type: "linear",
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
        duration: 0.45,
        type: "linear",
      },
    },
  };

  return (
    <>
      <PlanHeader
        selectedPlanTitle={selectedPlan ? selectedPlan.title : ""}
        isPlanList={0 < planList.length ? true : false}
      />
      <main className="relative flex flex-col w-full overflow-hidden desktop:[92%] h-[93%] mobile:h-[94%]">
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
          {calendarData && (
            <CalendarPicker
              calendarData={calendarData}
              isWeekly={isWeekly}
              selectedPlan={selectedPlan}
              clickedDate={clickedDate}
              displayDate={displayDate}
              setDisplayDate={setDisplayDate}
              setClickedDate={setClickedDate}
              setPlanList={setPlanList}
              displayMonthSetter={displayMonthSetter}
            />
          )}
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
            clickedDate={clickedDate}
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
