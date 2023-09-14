import useSWR from "swr";
import { PlanModel } from "../model/plan";

export const usePlanList = () => {
  const { data, error, isLoading } = useSWR<PlanModel[]>(`/api/plan`);

  return { data, isLoading, error };
};
