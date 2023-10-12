import dayjs from "dayjs";
import { HomePlanModel, planPercent } from "../model/plan";

export const weekSuccessPercent = (
  planData: HomePlanModel,
  planPercent: planPercent
) => {
  const today = dayjs();
  const { history, days, startDate, title } = planData;
  const { successCount, totalDays, successPercent } = planPercent;

  const weekSuccessArr = [0, 0, 0, 0, 0, 0, 0, 0];
  let currentDate = dayjs().endOf("week").add(1, "day");
  let successCnt = 0;
  let cntDays = totalDays - 1;

  for (let i = 7; 0 <= i; i--) {
    currentDate = currentDate.subtract(1, "day");
    if (dayjs(startDate).isAfter(currentDate, "day")) continue;
    if (today.isBefore(currentDate, "day")) continue;
    if (today.isSame(currentDate, "day")) {
      weekSuccessArr[i] = successPercent;
      continue;
    }

    if (cntDays !== 0) {
      weekSuccessArr[i] = Math.floor(
        ((successCount - successCnt) / cntDays) * 100
      );
    }

    const currentKey = currentDate.format("YYYY-MM-DD");
    if (days.includes(currentDate.day())) cntDays--;
    if (history?.[currentKey]?.isSuccess === true) successCnt++;
  }

  return weekSuccessArr;
};
