import { PlanType } from "@/comman/types";
import { atom } from "jotai";
import dayjs from "dayjs";
import { PlanModel } from "@/comman/model/plan";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

export const selected_plan_atom = atom<PlanType | null>(null);

export const selected_planId_atom = atom<string>((get) => {
  const selected_planId = get(selected_plan_atom)?.id;
  return selected_planId ? selected_planId : "";
});

export const selected_planTitle_atom = atom<string>((get) => {
  const selected_planTile = get(selected_plan_atom)?.title;
  return selected_planTile ? selected_planTile : "";
});

export const clicked_date_atom = atom<dayjs.Dayjs>(dayjs());

export const planlist_atom = atom<PlanModel[] | null>(null);

export const filtered_planlist_atom = atom<PlanModel[] | null>((get) => {
  const clickedDate = get(clicked_date_atom);
  const clickedDay = get(clicked_date_atom).day();

  const filteredPlanlist = get(planlist_atom)?.filter(
    (plan: PlanModel) =>
      clickedDate.isSameOrAfter(plan.startDate) &&
      clickedDate.isSameOrBefore(plan.endDate) &&
      plan.days.includes(clickedDay)
  );

  return filteredPlanlist ? filteredPlanlist : null;
});
