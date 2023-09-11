"use client";

import { useEffect, useLayoutEffect, useState } from "react";

import Calendar from "@/components/calendar/Calendar";
import PlanHeader from "./component/PlanHeader";
import PlanList from "@/components/plan/PlanList";
import { useMouseHandlers } from "./utils/MouseHandlers";
import { useTouchHandlers } from "./utils/TouchHandlers";
import { fakePlanList } from "./FakePlanListData";

export default function PlanPage() {
  const [isWeekly, setIsWeekly] = useState<boolean>(false);
  const [selectPlanId, setSelectPlanId] = useState<string>("");
  const data = fakePlanList;

  const { handleTouchStart, handleTouchEnd, tochedY } =
    useTouchHandlers(setIsWeekly);
  const { handleMouseUp, handleMouseDown, mouseUpClientY, mouseDownClientY } =
    useMouseHandlers();

  useLayoutEffect(() => {}, []);

  useEffect(() => {
    const distanceY = mouseDownClientY - mouseUpClientY;
    if (isWeekly && distanceY < -20) {
      setIsWeekly(false);
    }
    if (!isWeekly && distanceY > 30) {
      setIsWeekly(true);
    }
  }, [mouseUpClientY]);

  return (
    <div className="h-[90%] overflow-hidden">
      <PlanHeader />
      <section className="relative flex flex-col w-full overflow-hidden h-[92%]">
        <article
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onTouchEnd={handleTouchEnd}
          onTouchStart={handleTouchStart}
          className={isWeekly ? "h-[17%]" : "h-[50%]"}
        >
          <Calendar isWeekly={isWeekly} />
        </article>
        <article className={isWeekly ? "h-[83%]" : "h-[50%]"}>
          <PlanList data={data} />
        </article>
      </section>
    </div>
  );
}
