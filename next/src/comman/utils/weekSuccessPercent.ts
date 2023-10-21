import dayjs from "dayjs";
import { HomePlanModel, planPercent } from "../model/plan";
import { today } from "./today";

export const weekSuccessPercent = (
  planData: HomePlanModel,
  planPercent: planPercent
) => {
  const { history, days, startDate, endDate } = planData;
  const { successCount, totalDay, successPercent } = planPercent;

  const weekSuccessArr = [0, 0, 0, 0, 0, 0, 0, 0];
  let currentDate = dayjs().endOf("week").add(1, "day");
  let successCnt = 0;
  let cntDays = totalDay;

  for (let i = 7; 0 <= i; i--) {
    currentDate = currentDate.subtract(1, "day");
    const currentKey = currentDate.format("YYYY-MM-DD");

    if (dayjs(currentDate).isAfter(endDate, "day")) continue;
    if (dayjs(startDate).isAfter(currentDate, "day")) continue;
    if (today.isBefore(currentDate, "day")) continue;
    if (today.isSame(currentDate, "day")) {
      weekSuccessArr[i] = successPercent;
      if (days.includes(today.day())) cntDays--;
      if (history?.[currentKey]?.isSuccess === true) successCnt++;
      continue;
    }

    if (cntDays !== 0) {
      weekSuccessArr[i] = Math.floor(
        ((successCount - successCnt) / cntDays) * 100
      );
    }
    if (days.includes(currentDate.day())) cntDays--;
    if (history?.[currentKey]?.isSuccess === true) successCnt++;
  }

  return weekSuccessArr;
};
