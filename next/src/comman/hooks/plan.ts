import useSWR from "swr";
import { PlanModel, PlanDetailModel } from "../model/plan";

export const usePlanList = () => {
  const {
    data: planListData,
    error,
    isLoading,
  } = useSWR<PlanModel[]>(`/api/plan`);
  return { planListData, isLoading, error };
};

export const usePlan = (planId: string) => {
  const {
    data: planData,
    error,
    isLoading,
  } = useSWR<PlanDetailModel>(`/api/plan/${planId}`);
  return { planData, isLoading, error };
};
