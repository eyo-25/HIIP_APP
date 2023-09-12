import { PlanType } from "@/comman/types";
import { atom } from "jotai";
import dayjs from "dayjs";

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
