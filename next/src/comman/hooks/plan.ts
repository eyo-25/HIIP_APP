import useSWR from "swr";
import { PlanDataModel } from "../model/plan";

export const usePlanList = () => {
  const { data, error, isLoading } = useSWR<PlanDataModel[]>(`/api/plan`);

  return { data, isLoading, error };
};
