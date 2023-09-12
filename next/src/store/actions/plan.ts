import { atom } from "jotai";
import { clicked_date_atom, selected_plan_atom } from "..";
import { PlanType } from "@/comman/types";
import dayjs from "dayjs";

export const selectPlanAtom = atom(
  null,
  async (_, set, data: PlanType | null) => {
    set(selected_plan_atom, () => data);
  }
);

export const clickDateAtom = atom(null, async (_, set, data: dayjs.Dayjs) => {
  set(clicked_date_atom, () => data);
});
