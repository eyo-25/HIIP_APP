import { client } from "./sanity";
import { PlanDataModel, PlanHistory } from "../model/plan";
import { today } from "../utils/today";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const getCalendar = (date: string): dayjs.Dayjs[] => {
  const startDate = dayjs(`${date}-01`);
  const startDay = startDate.day();

  const calendarArray = Array.from({ length: 42 }, (_, index) => {
    return startDate.add(index - startDay, "d");
  });

  return calendarArray;
};

export async function getCalendarList(userId: string, date: string) {
  const calendarList = getCalendar(date);
  const startDate = calendarList[0].format("YYYY-MM-DDTHH:mm:ss[Z]");
  const endDate = calendarList[calendarList.length - 1].format(
    "YYYY-MM-DDTHH:mm:ss[Z]"
  );
  const planList: PlanDataModel[] = await client.fetch(
    `*[_type == "plan" && author._ref == $userId && endDate >= $startDate && startDate <= $endDate]`,
    {
      userId,
      startDate,
      endDate,
    }
  );

  const calendarDataList = calendarList.map((date: dayjs.Dayjs) => {
    const formatDate = date.format("YYYY-MM-DD");
    const day = date.day();
    const colors: string[] = [];
    const filteredPlanList = planList.filter((plan) => {
      const { days, startDate, endDate, color } = plan;
      if (
        days.includes(day) &&
        date.isSameOrAfter(startDate, "day") &&
        date.isSameOrBefore(endDate, "day")
      ) {
        colors.push(color);
        return true;
      }
      return false;
    });
    const transformPlanList = filteredPlanList.map((plan) => {
      const transformedObject = plan?.history?.reduce(
        (result: { [key: string]: PlanHistory }, cu) => {
          const formatDate = dayjs(cu.date).format("YYYY-MM-DD");
          result[formatDate] = cu;
          return result;
        },
        {}
      );

      return {
        ...plan,
        history: transformedObject,
      };
    });

    const list = transformPlanList.map((plan) => {
      const { title, memo, interval, color, _id, startDate, endDate } = plan;
      let status = "pending";
      const historyData = plan?.history?.[formatDate];
      const isPastDate = dayjs(date).isBefore(today, "day");

      if (historyData?.isSuccess) {
        status = "success";
      } else if (isPastDate || historyData?.focusSet === 0) {
        status = "fail";
      }

      return {
        title,
        memo,
        interval,
        color,
        _id,
        status,
        startDate,
        endDate,
      };
    });

    return { date: formatDate, list, colors };
  });

  const res = [];
  for (let i = 0; i < calendarDataList.length; i += 7) {
    res.push(calendarDataList.slice(i, i + 7));
  }

  return res;
}
