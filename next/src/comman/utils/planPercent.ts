import { HomePlanModel, PlanHistory } from "../model/plan";
import dayjs from "dayjs";

export const usePlanPercent = (
  selectedPlan: HomePlanModel,
  isResult: boolean = false
) => {
  const { history, interval, startDate } = selectedPlan;
  const today = dayjs();
  const todayHistory: PlanHistory | undefined =
    history?.[today.format("YYYY-MM-DD")];
  const isHistory = 0 < Object.keys(history).length;

  const currentDate = dayjs(startDate);
  const endDate = today.isBefore(selectedPlan.endDate)
    ? today
    : selectedPlan.endDate;
  const dateRange = dayjs(endDate).diff(currentDate, "day") + 1;

  const processCount = Object.values(history).filter(
    (item) =>
      selectedPlan.days.includes(dayjs(item.date).day()) && item.focusSet === 0
  ).length;

  const successCount = Object.values(history).filter(
    (item) =>
      selectedPlan.days.includes(dayjs(item.date).day()) && item.isSuccess
  ).length;

  const totalSet = Object.values(history)
    .filter((item) => selectedPlan.days.includes(dayjs(item.date).day()))
    .reduce((total, item) => total + (interval - item.focusSet), 0);

  if (isResult) {
    const processPercent = Math.floor(((processCount + 1) / dateRange) * 100);
    const successPercent = Math.floor(((successCount + 1) / dateRange) * 100);
    const averageSet = Math.floor((totalSet + interval) / dateRange);
    const leftSet = 0;

    return { processPercent, successPercent, averageSet, leftSet };
  } else {
    const processPercent = Math.floor((processCount / dateRange) * 100);
    const successPercent = Math.floor((successCount / dateRange) * 100);
    const averageSet = isHistory ? Math.floor(totalSet / dateRange) : 0;
    const leftSet = todayHistory
      ? interval - (interval - todayHistory.focusSet)
      : interval;

    return { processPercent, successPercent, averageSet, leftSet };
  }
};
