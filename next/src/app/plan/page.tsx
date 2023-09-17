"use client";

import { usePlanList } from "@/comman/hooks/plan";
import PlanContents from "./component/PlanSection";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

function PlanPage() {
  const { planListData, isLoading, error } = usePlanList();

  return (
    <div className="relative h-[90%] w-full overflow-hidden">
      {planListData && <PlanContents planListData={planListData} />}
    </div>
  );
}

export default PlanPage;
