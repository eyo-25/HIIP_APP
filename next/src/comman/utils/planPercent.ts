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
  const { history, interval, startDate, focusTime } = selectedPlan;
  const today = type === "prev" ? dayjs().subtract(1, "day") : dayjs();
  const todayHistory = history?.[today.format("YYYY-MM-DD")];
  const isHistory = 0 < Object.keys(history).length;
  let currentDate = dayjs(startDate);
  let totalDay = 0;
  let totalSet = 0;
  let processCount = 0;
  let successCount = 0;
  let wasteTime = 0;
  let todayFocus = 0;

  while (currentDate.isSameOrBefore(today, "day")) {
    const currentHistory = history?.[currentDate.format("YYYY-MM-DD")];
    if (selectedPlan.days.includes(currentDate.day())) {
      totalDay++;

      if (currentHistory) {
        if (currentHistory.isSuccess) {
          successCount++;
        }
        if (currentHistory.focusSet === 0) {
          processCount++;
          if (currentDate.isSame(today, "day")) {
            todayFocus += interval * focusTime;
          }
        } else {
          if (currentHistory.focusSet === currentHistory.breakSet) {
            wasteTime +=
              currentHistory.focusSet * focusTime +
              Math.floor(currentHistory.focusTime / 60);

            if (currentDate.isSame(today, "day")) {
              const todayFocusSet = interval - currentHistory.focusSet;
              const todayFocusTime = todayFocusSet * focusTime;
              todayFocus += todayFocusTime;
            }
          } else {
            wasteTime +=
              (currentHistory.focusSet - 1) * focusTime +
              Math.floor(currentHistory.focusTime / 60);

            if (currentDate.isSame(today, "day")) {
              const todayFocusSet = interval - currentHistory.focusSet;
              const todayFocusTime =
                todayFocusSet * focusTime +
                Math.floor((focusTime * 60 - currentHistory.focusTime) / 60);
              todayFocus += todayFocusTime;
            }
          }
        }
        totalSet = totalSet + (interval - currentHistory.focusSet);
      } else {
        wasteTime += interval * focusTime;
      }
    }
    currentDate = currentDate.add(1, "day");
  }

  let processPercent =
    type === "prev"
      ? Math.floor(((processCount - 1) / totalDay) * 100)
      : Math.floor((processCount / totalDay) * 100);
  let successPercent =
    type === "success"
      ? Math.floor(((successCount + 1) / totalDay) * 100)
      : Math.floor((successCount / totalDay) * 100);
  let averageSet = isHistory
    ? type === "prev"
      ? Math.round((totalSet - interval) / totalDay)
      : Math.round(totalSet / totalDay)
    : 0;
  const leftSet = todayHistory
    ? interval - (interval - todayHistory.focusSet)
    : interval;

  if (type === "prev") {
    if (totalDay === 0) {
      processPercent = 0;
      averageSet = 0;
    }
  }

  if (!processPercent) processPercent = 0;
  if (!successPercent) successPercent = 0;

  return {
    processPercent,
    processCount,
    successPercent,
    averageSet,
    leftSet,
    successCount,
    totalDay,
    totalSet,
    focusTime,
    wasteTime,
    todayFocus,
  };
};
