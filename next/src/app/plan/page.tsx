"use client";

import { useState } from "react";

import Calendar from "@/components/calendar/Calendar";
import PlanHeader from "./component/PlanHeader";
import PlanList from "@/components/plan/PlanList";
import { useMouseHandlers } from "./utils/MouseHandlers";
import { useTouchHandlers } from "./utils/TouchHandlers";
import { fakePlanList } from "./FakePlanListData";

function PlanPage() {
  const data = fakePlanList;
  const [isWeekly, setIsWeekly] = useState<boolean>(false);
  const [selectPlanId, setSelectPlanId] = useState<string>(
    0 < fakePlanList.length ? fakePlanList[0].id : ""
  );

  const { handleTouchStart, handleTouchEnd } = useTouchHandlers(setIsWeekly);
  const { handleMouseUp, handleMouseDown } = useMouseHandlers(
    setIsWeekly,
    isWeekly
  );

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
          <PlanList
            data={data}
            selectPlanId={selectPlanId}
            setSelectPlanId={setSelectPlanId}
          />
        </article>
      </section>
    </div>
  );
}

export default PlanPage;
