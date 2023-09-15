import { atom } from "jotai";
import dayjs from "dayjs";

import { clicked_date_atom, planlist_atom } from "..";
import { PlanModel } from "@/comman/model/plan";

export const clickDateAtom = atom(null, async (_, set, data: dayjs.Dayjs) => {
  set(clicked_date_atom, () => data);
});

export const updatePlanList = atom(null, async (_, set, data: PlanModel[]) => {
  set(planlist_atom, () => data);
});
