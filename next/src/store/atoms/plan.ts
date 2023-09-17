import { atom } from "jotai";
import { PlanModel } from "@/comman/model/plan";

export const planlist_atom = atom<PlanModel[] | null>(null);
