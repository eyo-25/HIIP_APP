import useSWR from "swr";
import {
  PlanModel,
  PlanDataModel,
  FormModel,
  HomePlanModel,
  PlanTimerData,
  PlanHistory,
  FeedbackDataModel,
  CalendarModel,
} from "../model/plan";

export const usePlan = (planId: string) => {
  const {
    data: planData,
    error,
    isLoading,
  } = useSWR<PlanDataModel>(`/api/plan/${planId}`);

  return { planData, isLoading, error };
};

export const useFeedback = () => {
  const {
    data: feedBackList,
    error,
    isLoading,
  } = useSWR<FeedbackDataModel[]>(`/api/feedback`);

  return { feedBackList, isLoading, error };
};

export const usePlanDetail = (planId: string) => {
  const {
    data: planData,
    error,
    isLoading,
  } = useSWR<HomePlanModel>(`/api/plan/${planId}/detail`);

  return { planData, isLoading, error };
};

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

export const usePlanTimer = (planId: string) => {
  const {
    data: planTimerData,
    error,
    isLoading,
  } = useSWR<PlanTimerData>(`/api/plan/${planId}/timer`);

  return { planTimerData, isLoading, error };
};

export async function updatePlanResult(planId: string, isSuccess: boolean) {
  const response = await fetch(`/api/result/${planId}`, {
    method: "PUT",
    body: JSON.stringify({ isSuccess: isSuccess }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  return response;
}

export async function updatePlanTimer(planId: string, timerData: PlanHistory) {
  const response = await fetch(`/api/plan/${planId}/timer`, {
    method: "PUT",
    body: JSON.stringify(timerData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  return response;
}

export async function createPlan(formData: FormModel) {
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

export async function updatePlan(planId: string, formData: FormModel) {
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

export const useCalendar = (initialDate: string) => {
  const { data, error, isLoading } = useSWR(
    `/api/calendar?date=${initialDate}`
  );

  return { calendarData: data, isLoading, error };
};
