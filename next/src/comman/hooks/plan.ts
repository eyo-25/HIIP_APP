import useSWR from "swr";
import { PlanModel } from "../model/plan";

export const usePlanList = () => {
  const {
    data: planListData,
    error,
    isLoading,
  } = useSWR<PlanModel[]>(`/api/plan`);

  console.log("패치");
  return { planListData, isLoading, error };
};
