import { atom } from "jotai";

import { planlist_atom } from "..";
import { PlanModel } from "@/comman/model/plan";

export const updatePlanList = atom(null, async (_, set, data: PlanModel[]) => {
  set(planlist_atom, () => data);
});
