import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import PlanHeader from "./PlanHeader";
import PlanListBoard from "@/components/plan/PlanListBoard";
import MetaButton from "@/components/ui/MetaButton";
import { SelectPlanModel, SimplePlanModel } from "@/comman/model/plan";
import { useMouseHandlers } from "@/comman/utils/mouseHandlers";
import { useTouchHandlers } from "@/comman/utils/touchHandlers";
import { today } from "@/comman/utils/today";
import { useCalendar } from "@/comman/hooks/plan";
import CalendarPicker from "../calendar/CalendarPicker";
import {
  buttonVarients,
  getCalendarVariants,
  getPlanBoardVariants,
} from "./PlanVariants";

function PlanSection() {
  const index = useMemo(
    () => Math.ceil((today.startOf("month").day() + today.date()) / 7) - 1,
    []
  );
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
  const [weekIndex, setWeekIndex] = useState(index);

  const { calendarData, isLoading } = useCalendar(displayMonth);
  const { handleTouchStart, handleTouchEnd } = useTouchHandlers(setIsWeekly);
  const { handleMouseUp, handleMouseDown } = useMouseHandlers(
    setIsWeekly,
    isWeekly
  );
  const calendarVariants = getCalendarVariants(isWeekly);
  const planBoardVariants = getPlanBoardVariants(isWeekly);

  const selectPlan = (data: SelectPlanModel | null) => {
    setSelectedPlan(data);
  };
  const displayMonthSetter = (year: number, month: number) => {
    const [currentYear, currentMonth] = displayMonth.split("-");
    if (+currentYear !== year || +currentMonth !== month) {
      setDisplayMonth(`${year}-${month}`);
    }
  };

  useEffect(() => {
    if (
      calendarData &&
      clickedDate.isSame(today, "day") &&
      dayjs(calendarData[index][today.day()].date).isSame(today, "day")
    ) {
      setPlanList(calendarData[index][today.day()].list);
    }
  }, [calendarData, clickedDate]);

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
              weekIndex={weekIndex}
              setWeekIndex={setWeekIndex}
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
            planList={planList}
            clickedDate={clickedDate}
            selectPlan={selectPlan}
          />
        </motion.section>
      </main>
      <motion.div variants={buttonVarients} initial="normal" animate="animate">
        <Link href={"/write/creat"} aria-label="플랜 작성 페이지로 이동">
          <MetaButton mode={"creat"} />
        </Link>
      </motion.div>
    </>
  );
}

export default PlanSection;
