import { useState } from "react";
import PlanHeader from "./PlanHeader";
import PlanListBoard from "@/components/plan/PlanListBoard";
import MetaButton from "@/components/ui/MetaButton";
import { booleanStyle } from "@/comman/utils/booleanStyle";
import Calendar from "@/components/calendar/Calendar";
import {
  CalendaMemoModel,
  PlanModel,
  SelectPlanModel,
  SimplePlanModel,
} from "@/comman/model/plan";
import Link from "next/link";
import { useMouseHandlers } from "@/comman/utils/mouseHandlers";
import { useTouchHandlers } from "@/comman/utils/touchHandlers";

type Props = {
  planListData: PlanModel[];
};

function PlanSection({ planListData }: Props) {
  const [isWeekly, setIsWeekly] = useState<boolean>(false);
  const [planList, setPlanList] = useState<SimplePlanModel[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<SelectPlanModel | null>(
    null
  );
  const [calendarMemo, setCalendarMemo] = useState<CalendaMemoModel>({});

  const { handleTouchStart, handleTouchEnd } = useTouchHandlers(setIsWeekly);
  const { handleMouseUp, handleMouseDown } = useMouseHandlers(
    setIsWeekly,
    isWeekly
  );
  const selectPlan = (data: SelectPlanModel | null) => {
    setSelectedPlan(data);
  };

  return (
    <>
      <PlanHeader
        selectedPlanTitle={selectedPlan ? selectedPlan.title : ""}
        isPlanList={0 < planList.length ? true : false}
      />
      <main className="relative flex flex-col w-full overflow-hidden h-[92%]">
        <section
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onTouchEnd={handleTouchEnd}
          onTouchStart={handleTouchStart}
          className={booleanStyle(isWeekly, "h-[17%] z-10", "h-[50%] z-10")}
        >
          <Calendar
            planListData={planListData}
            isWeekly={isWeekly}
            selectedPlan={selectedPlan}
            setPlanList={setPlanList}
            calendarMemo={calendarMemo}
            setCalendarMemo={setCalendarMemo}
          />
        </section>
        <section className={booleanStyle(isWeekly, "h-[83%]", "h-[50%]")}>
          <PlanListBoard
            selectedPlanId={selectedPlan?._id}
            selectPlan={selectPlan}
            planList={planList}
          />
        </section>
      </main>
      <Link href={"/write/creat"}>
        <MetaButton mode={"creat"} />
      </Link>
    </>
  );
}

export default PlanSection;
