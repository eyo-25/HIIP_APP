import useSWR from "swr";
import { PlanModel } from "../model/plan";

export const usePlanList = () => {
  const {
    data: planListData,
    error,
    isLoading,
  } = useSWR<PlanModel[]>(`/api/plan`);

  return { planListData, isLoading, error };
};
