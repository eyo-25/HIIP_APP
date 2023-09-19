import { PlanModel, StatusType } from "@/comman/model/plan";
import dayjs from "dayjs";

export function filterPlansByDate(
  date: dayjs.Dayjs,
  planListData: PlanModel[]
): PlanModel[] {
  const calendarDateDay = date.day();

  return planListData.filter((plan) => {
    return (
      date.isSameOrAfter(plan.startDate) &&
      date.isSameOrBefore(plan.endDate) &&
      plan.days.includes(calendarDateDay)
    );
  });
}

export function calculatePlanStatus(
  plan: PlanModel,
  date: string,
  today: dayjs.Dayjs
): StatusType {
  const historyData = plan?.history?.[date];
  const isPastDate = dayjs(date).isBefore(today, "day");

  if (historyData?.isSuccess) {
    return "success";
  } else if (isPastDate) {
    return "fail";
  }

  return "pending";
}

export function dateMemoKey(date: dayjs.Dayjs): string {
  const displayYear = date.year();
  const displayMonth = date.month();
  return `${displayYear}-${displayMonth}`;
}
