import { PlanModel } from "@/comman/model/plan";
import dayjs from "dayjs";

export const filterPlansByDate = (
  date: dayjs.Dayjs,
  planListData: PlanModel[]
) => {
  const calendarDateDay = date.day();

  return planListData.filter((plan) => {
    return (
      date.isSameOrAfter(plan.startDate) &&
      date.isSameOrBefore(plan.endDate) &&
      plan.days.includes(calendarDateDay)
    );
  });
};

export const calculatePlanStatus = (
  plan: any,
  date: string,
  today: dayjs.Dayjs
) => {
  const historyData = plan?.history?.[date];
  const isPastDate = dayjs(date).isBefore(today, "day");

  if (historyData?.isSuccess) {
    return "success";
  } else if (isPastDate) {
    return "fail";
  }

  return "pending";
};
