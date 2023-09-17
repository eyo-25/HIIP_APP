"use client";

import { useEffect, useState } from "react";

import Calendar from "@/components/calendar/Calendar";
import PlanHeader from "./component/PlanHeader";
import PlanListBoard from "@/components/plan/PlanList";
import MetaButton from "@/components/ui/MetaButton";
import {
  CalendarModel,
  SelectPlanModel,
  SimplePlanModel,
} from "@/comman/model/plan";
import { useMouseHandlers } from "./utils/MouseHandlers";
import { useTouchHandlers } from "./utils/TouchHandlers";
import dayjs from "dayjs";
import { getCalendar } from "@/comman/utils/calendar";
import { useAtomValue } from "jotai";
import { planlist_atom } from "@/store";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

function PlanPage() {
  const planListData = useAtomValue(planlist_atom);
  const [isWeekly, setIsWeekly] = useState<boolean>(false);
  const [selectedPlan, setSelectedPlan] = useState<SelectPlanModel | null>(
    null
  );
  const [displayDate, setDisplayDate] = useState<dayjs.Dayjs>(dayjs());
  const [clickedDate, setClickedDate] = useState<dayjs.Dayjs>(dayjs());
  const [calendarArray, setCalendarArray] = useState<CalendarModel[][]>([]);
  const [planList, setPlanList] = useState<SimplePlanModel[]>([]);
  const [displayMonth, setDisplayMonth] = useState<number>(dayjs().month());
  const [calendarMemo, setCalendarMemo] = useState<{
    [key: string]: CalendarModel[][];
  }>({});

  useEffect(() => {
    if (!planListData) return;

    const calendarMonth = (displayDate.month() + 1).toString();
    if (calendarMemo[calendarMonth]) {
      setCalendarArray(calendarMemo[calendarMonth]);
      return;
    }

    const calendarDates = getCalendar(displayDate);
    const today = dayjs();

    const updateCalendarArray = calendarDates.map((date: string) => {
      const calendarDate = dayjs(date);
      const calendarDateDay = calendarDate.day();
      const isPastDate = calendarDate.isBefore(today, "day");

      const filteredPlanList = planListData.filter((plan) => {
        return (
          calendarDate.isSameOrAfter(plan.startDate) &&
          calendarDate.isSameOrBefore(plan.endDate) &&
          plan.days.includes(calendarDateDay)
        );
      });

      const colors = filteredPlanList.map((plan) => plan.color);

      const updatedPlans = filteredPlanList.map((plan) => {
        let planStatus = "pending";
        const history = plan?.history?.date;

        if (history?.isSuccess) {
          planStatus = "success";
        } else if (isPastDate) {
          planStatus = "fail";
        }

        const { title, memo, interval, color, _id, startDate, endDate } = plan;
        return {
          title,
          memo,
          interval,
          color,
          _id,
          status: planStatus,
          startDate,
          endDate,
        };
      });

      if (calendarDate.isSame(clickedDate, "day") && 0 < updatedPlans.length) {
        setPlanList(updatedPlans);
      }
      return { date, list: updatedPlans, colors };
    });

    const doubleArray: CalendarModel[][] = [];
    for (let i = 0; i < updateCalendarArray.length; i += 7) {
      doubleArray.push(updateCalendarArray.slice(i, i + 7));
    }
    setCalendarArray(doubleArray);

    setCalendarMemo((memo) => {
      const newArray = { ...memo };
      newArray[calendarMonth] = doubleArray;
      return newArray;
    });
  }, [planListData, displayMonth]);

  const { handleTouchStart, handleTouchEnd } = useTouchHandlers(setIsWeekly);
  const { handleMouseUp, handleMouseDown } = useMouseHandlers(
    setIsWeekly,
    isWeekly
  );
  const selectPlan = (data: SelectPlanModel) => {
    setSelectedPlan(data);
  };

  return (
    <div className="relative h-[90%] w-full overflow-hidden">
      <PlanHeader
        selectedPlanTitle={selectedPlan ? selectedPlan.title : ""}
        isPlanList={0 < planList.length ? true : false}
      />
      <section className="relative flex flex-col w-full overflow-hidden h-[92%]">
        <article
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onTouchEnd={handleTouchEnd}
          onTouchStart={handleTouchStart}
          className={isWeekly ? "h-[17%] z-10" : "h-[50%] z-10"}
        >
          <Calendar
            isWeekly={isWeekly}
            selectedPlan={selectedPlan}
            calendarArray={calendarArray}
            displayDate={displayDate}
            clickedDate={clickedDate}
            setDisplayDate={setDisplayDate}
            setClickedDate={setClickedDate}
            setPlanList={setPlanList}
            setDisplayMonth={setDisplayMonth}
          />
        </article>
        <article className={isWeekly ? "h-[83%]" : "h-[50%]"}>
          <PlanListBoard
            selectedPlanId={selectedPlan?._id}
            selectPlan={selectPlan}
            planList={planList}
          />
        </article>
      </section>
      <MetaButton />
    </div>
  );
}

export default PlanPage;
