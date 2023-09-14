"use client";

import { useState } from "react";

import Calendar from "@/components/calendar/Calendar";
import PlanHeader from "./component/PlanHeader";
import PlanList from "@/components/plan/PlanList";
import { useMouseHandlers } from "./utils/MouseHandlers";
import { useTouchHandlers } from "./utils/TouchHandlers";
import MetaButton from "@/components/ui/MetaButton";

function PlanPage() {
  const [isWeekly, setIsWeekly] = useState<boolean>(false);

  const { handleTouchStart, handleTouchEnd } = useTouchHandlers(setIsWeekly);
  const { handleMouseUp, handleMouseDown } = useMouseHandlers(
    setIsWeekly,
    isWeekly
  );

  return (
    <div className="relative h-[90%] w-full overflow-hidden">
      <PlanHeader />
      <section className="relative flex flex-col w-full overflow-hidden h-[92%]">
        <article
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onTouchEnd={handleTouchEnd}
          onTouchStart={handleTouchStart}
          className={isWeekly ? "h-[17%] z-10" : "h-[50%] z-10"}
        >
          <Calendar isWeekly={isWeekly} />
        </article>
        <article className={isWeekly ? "h-[83%]" : "h-[50%]"}>
          <PlanList />
        </article>
      </section>
      <MetaButton />
    </div>
  );
}

export default PlanPage;
