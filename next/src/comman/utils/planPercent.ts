import { HomePlanModel } from "../model/plan";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

type percentType = "success" | "prev" | "home";

export const usePlanPercent = (
  selectedPlan: HomePlanModel,
  type: percentType = "home"
) => {
  const { history, interval, startDate } = selectedPlan;
  const today = type === "prev" ? dayjs().subtract(1, "day") : dayjs();
  const todayHistory = history?.[today.format("YYYY-MM-DD")];
  const isHistory = 0 < Object.keys(history).length;
  let currentDate = dayjs(startDate);
  let totalDays = 0;
  let totalSet = 0;
  let processCount = 0;
  let successCount = 0;

  while (currentDate.isSameOrBefore(today)) {
    const currentHistory = history?.[currentDate.format("YYYY-MM-DD")];
    if (selectedPlan.days.includes(currentDate.day())) {
      totalDays++;

      if (currentHistory) {
        if (currentHistory.isSuccess) {
          successCount++;
        }
        if (currentHistory.focusSet === 0) {
          processCount++;
        }
        totalSet = totalSet + (interval - currentHistory.focusSet);
      }
    }
    currentDate = currentDate.add(1, "day");
  }

  let processPercent =
    type === "prev"
      ? Math.floor(((processCount - 1) / totalDays) * 100)
      : Math.floor((processCount / totalDays) * 100);
  let successPercent =
    type === "success"
      ? Math.floor(((successCount + 1) / totalDays) * 100)
      : Math.floor((successCount / totalDays) * 100);
  let averageSet = isHistory
    ? type === "prev"
      ? Math.round((totalSet - interval) / totalDays)
      : Math.round(totalSet / totalDays)
    : 0;
  const leftSet = todayHistory
    ? interval - (interval - todayHistory.focusSet)
    : interval;

  if (type === "prev") {
    if (totalDays === 0) {
      processPercent = 0;
      averageSet = 0;
    }
  }

  if (!processPercent) processPercent = 0;
  if (!successPercent) successPercent = 0;

  return {
    processPercent,
    successPercent,
    averageSet,
    leftSet,
    successCount,
    totalDays,
  };
};
