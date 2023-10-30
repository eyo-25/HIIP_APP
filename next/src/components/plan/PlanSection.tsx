import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import PlanHeader from "./PlanHeader";
import PlanListBoard from "@/components/plan/PlanListBoard";
import {
  CalendarModel,
  ColorType,
  PlanModel,
  SelectPlanModel,
  SimplePlanModel,
  StatusType,
} from "@/comman/model/plan";
import { useMouseHandlers } from "@/comman/utils/mouseHandlers";
import { useTouchHandlers } from "@/comman/utils/touchHandlers";
import { today } from "@/comman/utils/today";
import { useMonthPlanList } from "@/comman/hooks/plan";
import CalendarPicker from "../calendar/CalendarPicker";
import { getCalendarVariants, getPlanBoardVariants } from "./PlanVariants";
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
  const [calendarArray, setCalendarArray] = useState<CalendarModel[][]>([]);

  const { monthPlanListData, isValidating } = useMonthPlanList(displayMonth);
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
    if (monthPlanListData) {
      const calendarList = getCalendar(displayDate);
      let calendarDataList: CalendarModel[] = [];

      if (0 < monthPlanListData.length) {
        calendarDataList = calendarList.map((date: dayjs.Dayjs) => {
          const formatDate = date.format("YYYY-MM-DD");
          const day = date.day();
          const colors: ColorType[] = [];

          const filteredPlanList = monthPlanListData.filter(
            (plan: PlanModel) => {
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
            }
          );

          const list: SimplePlanModel[] = filteredPlanList.map(
            (plan: PlanModel) => {
              const { title, memo, interval, color, _id, startDate, endDate } =
                plan;
              let status: StatusType = "pending";
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
            }
          );

          return { date: formatDate, list, colors };
        });
      } else {
        calendarDataList = calendarList.map((date) => {
          return { date: date.format("YYYY-MM-DD"), list: [], colors: [] };
        });
      }

      const res = [];
      for (let i = 0; i < calendarDataList.length; i += 7) {
        res.push(calendarDataList.slice(i, i + 7));
      }

      setCalendarArray(res);
    }
  }, [monthPlanListData]);

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
          {monthPlanListData && (
            <CalendarPicker
              calendarData={calendarArray}
              isWeekly={isWeekly}
              selectedPlan={selectedPlan}
              clickedDate={clickedDate}
              displayDate={displayDate}
              weekIndex={weekIndex}
              setDisplayDate={setDisplayDate}
              setClickedDate={setClickedDate}
              setPlanList={setPlanList}
              displayMonthSetter={displayMonthSetter}
              setWeekIndex={setWeekIndex}
            />
          )}
        </motion.section>
        <motion.section
          variants={planBoardVariants}
          initial="normal"
          animate="animate"
        >
          {monthPlanListData && (
            <PlanListBoard
              selectedPlanId={selectedPlan?._id}
              planList={planList}
              clickedDate={clickedDate}
              isValidating={isValidating}
              monthPlanListData={monthPlanListData}
              selectPlan={selectPlan}
            />
          )}
        </motion.section>
      </main>
    </>
  );
}

export default PlanSection;
