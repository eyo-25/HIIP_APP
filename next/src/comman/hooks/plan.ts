import useSWR from "swr";
import {
  PlanModel,
  PlanDetailModel,
  FormDataModel,
  HomePlanModel,
  PlanTimerData,
} from "../model/plan";

export const usePlanList = () => {
  const {
    data: planListData,
    error,
    isLoading,
  } = useSWR<PlanModel[]>(`/api/plan`);
  return { planListData, isLoading, error };
};

export const useDatePlanList = (date: string) => {
  const {
    data: planListData,
    error,
    isLoading,
  } = useSWR<HomePlanModel[]>(`/api/plan?date=${date}`);

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

export const usePlanTimer = (planId: string) => {
  const {
    data: planTimerData,
    error,
    isLoading,
  } = useSWR<PlanTimerData>(`/api/plan/${planId}/timer`);

  // console.log(planTimerData);

  return { planTimerData, isLoading, error };
};

export async function createPlan(formData: FormDataModel) {
  const response = await fetch("/api/plan/", {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  return response;
}

export async function updatePlan(planId: string, formData: FormDataModel) {
  const response = await fetch(`/api/plan/${planId}`, {
    method: "PUT",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  return response;
}

export async function removePlan(planId: string) {
  const response = await fetch(`/api/plan/${planId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  return response;
}
