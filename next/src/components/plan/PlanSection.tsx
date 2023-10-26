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
import { getCalendar } from "@/comman/utils/calendar";

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
  const [weekIndex, setWeekIndex] = useState(
    Math.ceil((today.startOf("month").day() + today.date()) / 7) - 1
  );
  const [calendarArray, setCalendarArray] = useState<any>([]);

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
    if (calendarData) {
      setCalendarArray;
      const calendarList = getCalendar(displayDate);
      const calendarDataList = calendarList.map((date: dayjs.Dayjs) => {
        const formatDate = date.format("YYYY-MM-DD");
        const day = date.day();
        const colors: string[] = [];
        console.log("데이터 체크", calendarData);
        const filteredPlanList = calendarData.filter((plan: any) => {
          const { days, startDate, endDate, color } = plan;
          if (
            days.includes(day) &&
            date.isSameOrAfter(startDate, "day") &&
            date.isSameOrBefore(endDate, "day")
          ) {
            colors.push(color);
            return true;
          }
          return false;
        });

        const list = filteredPlanList.map((plan: any) => {
          const { title, memo, interval, color, _id, startDate, endDate } =
            plan;
          let status = "pending";
          const historyData = plan?.history?.[formatDate];
          const isPastDate = dayjs(date).isBefore(today, "day");

          if (historyData?.isSuccess) {
            status = "success";
          } else if (isPastDate || historyData?.focusSet === 0) {
            status = "fail";
          }

          return {
            title,
            memo,
            interval,
            color,
            _id,
            status,
            startDate,
            endDate,
          };
        });

        return { date: formatDate, list, colors };
      });

      const res = [];
      for (let i = 0; i < calendarDataList.length; i += 7) {
        res.push(calendarDataList.slice(i, i + 7));
      }

      setCalendarArray(res);
    }
  }, [calendarData]);

  useEffect(() => {
    if (0 >= calendarArray.length) return;

    const clickedIndex =
      Math.ceil((clickedDate.startOf("month").day() + clickedDate.date()) / 7) -
      1;
    if (
      dayjs(calendarArray[clickedIndex][clickedDate.day()].date).isSame(
        clickedDate,
        "day"
      )
    ) {
      setPlanList(calendarArray[clickedIndex][clickedDate.day()].list);
    }
  }, [calendarArray]);

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
              calendarData={calendarArray}
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
            calendarData={calendarData}
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
