"use client";

import { useEffect, useState } from "react";

import Calendar from "@/components/calendar/Calendar";
import PlanHeader from "./component/PlanHeader";
import PlanListBoard from "@/components/plan/PlanList";
import MetaButton from "@/components/ui/MetaButton";
import { CalendarModel, SimplePlanModel } from "@/comman/model/plan";
import { useMouseHandlers } from "./utils/MouseHandlers";
import { useTouchHandlers } from "./utils/TouchHandlers";
import dayjs from "dayjs";
import { getCalendar } from "@/comman/utils/calendar";
import { useAtomValue } from "jotai";
import { planlist_atom } from "@/store";

function PlanPage() {
  const [isWeekly, setIsWeekly] = useState<boolean>(false);
  const [selectedPlan, setSelectedPlan] = useState<
    SimplePlanModel | undefined
  >();
  const [displayMonth, setDisplayMonth] = useState<number>(dayjs().month() + 1);
  const [clickedDate, setClickedDate] = useState<dayjs.Dayjs>(dayjs());
  const [calendarArray, setCalendarArray] = useState<CalendarModel[]>([]);
  const planListData = useAtomValue(planlist_atom);
  const [planList, setPlanList] = useState<SimplePlanModel[]>([]); // 초기값으로 빈 배열 설정

  useEffect(() => {
    if (!planListData) return;

    const calendarDates = getCalendar(displayMonth);
    const today = dayjs();

    const updateCalendarArray = calendarDates.map((date: string) => {
      const calendarDate = dayjs(date);
      const calendarDateDay = calendarDate.day();
      const isPastDate = calendarDate.isBefore(today, "day");

      const filteredPlanList = planListData.filter((plan) => {
        return (
          clickedDate.isSameOrAfter(plan.startDate) &&
          clickedDate.isSameOrBefore(plan.endDate) &&
          plan.days.includes(calendarDateDay)
        );
      });

      const colors = filteredPlanList.map((plan) => plan.color);

      const updatedPlans = filteredPlanList.map((plan) => {
        const historyEntry = plan.history?.find((entry) =>
          clickedDate.isSame(dayjs(entry.date), "day")
        );
        let planStatus = "pending";

        if (historyEntry?.isSuccess) {
          planStatus = "success";
        } else if (isPastDate) {
          planStatus = "fail";
        }

        const { title, memo, interval, color, _id } = plan;
        return { title, memo, interval, color, _id, status: planStatus };
      });

      return { date, list: updatedPlans, colors };
    });
    setCalendarArray(updateCalendarArray);

    console.log(updateCalendarArray);
  }, [planListData, displayMonth]);

  const { handleTouchStart, handleTouchEnd } = useTouchHandlers(setIsWeekly);
  const { handleMouseUp, handleMouseDown } = useMouseHandlers(
    setIsWeekly,
    isWeekly
  );
  const selectPlan = (data: SimplePlanModel) => {
    setSelectedPlan(data);
  };

  return (
    <div className="relative h-[90%] w-full overflow-hidden">
      <PlanHeader selectedPlanTitle={selectedPlan ? selectedPlan.title : ""} />
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
          />
        </article>
        <article className={isWeekly ? "h-[83%]" : "h-[50%]"}>
          <PlanListBoard
            selectedPlanId={selectedPlan?._id}
            selectPlan={selectPlan}
          />
        </article>
      </section>
      <MetaButton />
    </div>
  );
}

export default PlanPage;
