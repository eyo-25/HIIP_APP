import useSWR from "swr";
import { PlanModel } from "../model/plan";
import dayjs from "dayjs";
import { PlanType } from "../types";
import { PENDING } from "../constants";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const usePlanList = (date: string) => {
  const { data, error, isLoading } = useSWR(
    `/api/plan?date={${date}}`,
    fetcher
  );

  const planListData =
    data &&
    data.map((plan: any) => {
      const { _id, title, memo, startdate, enddate, interval, days } = plan;

      const newPlan: PlanType = {
        title,
        memo,
        interval,
        days,
        id: _id,
        startDate: dayjs(startdate).format("YYYY-MM-DD"),
        endDate: dayjs(enddate).format("YYYY-MM-DD"),
        status: PENDING,
      };

      return newPlan;
    });

  return { planListData, isLoading, error };
};
