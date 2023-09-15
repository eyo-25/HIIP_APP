import { atom } from "jotai";
import { PlanModel } from "@/comman/model/plan";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import dayjs from "dayjs";

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

export const clicked_date_atom = atom<dayjs.Dayjs>(dayjs());

export const planlist_atom = atom<PlanModel[] | null>(null);
