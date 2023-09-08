"use client";

import React, { useEffect, useState } from "react";

import Calendar from "@/components/calendar/Calendar";
import PlanList from "@/components/plan/PlanList";

function ContentSection() {
  const [isWeekly, setIsWeekly] = useState(false);
  const [mouseDownClientY, setMouseDownClientY] = useState(0);
  const [mouseUpClientY, setMouseUpClientY] = useState(0);

  const onMouseUp = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setMouseUpClientY(e.clientY);
  };
  const onMouseDown = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setMouseDownClientY(e.clientY);
  };

  useEffect(() => {
    const distanceY = mouseDownClientY - mouseUpClientY;
    if (isWeekly && distanceY < -20) {
      setIsWeekly(false);
    }
    if (!isWeekly && distanceY > 40) {
      setIsWeekly(true);
    }
  }, [mouseUpClientY]);

  return (
    <section className="relative flex flex-col w-full overflow-hidden h-[92%]">
      <article
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        className={isWeekly ? "h-[19%]" : "h-full"}
      >
        <Calendar isWeekly={isWeekly} />
      </article>
      <article className="h-full">
        <PlanList />
      </article>
    </section>
  );
}

export default ContentSection;
