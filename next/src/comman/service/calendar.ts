import { client } from "./sanity";
import { PlanDataModel, PlanHistory, PlanModel } from "../model/plan";
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

  return await client
    .fetch(
      `*[_type == "plan" && author._ref == $userId && endDate >= $startDate && startDate <= $endDate]`,
      {
        userId,
        startDate,
        endDate,
      }
    )
    .then(mapPlanList);
}

function mapPlanList(planList: PlanDataModel[]): PlanModel[] {
  return planList.map((plan) => {
    const transformedObject = plan?.history?.reduce(
      (result: { [key: string]: PlanHistory }, item) => {
        const formatDate = dayjs(item.date).format("YYYY-MM-DD");
        result[formatDate] = item;
        return result;
      },
      {}
    );

    return {
      ...plan,
      startDate: dayjs(plan.startDate).format("YYYY-MM-DD"),
      endDate: dayjs(plan.endDate).format("YYYY-MM-DD"),
      history: transformedObject,
      memo: plan.memo ? plan.memo : "",
    };
  });
}
