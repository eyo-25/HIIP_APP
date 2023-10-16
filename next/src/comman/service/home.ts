import dayjs from "dayjs";
import {
  HomePlanModel,
  PlanDataModel,
  PlanHistory,
  StatusType,
} from "../model/plan";
import { client } from "./sanity";

export async function getDatePlanList(
  userId: string,
  date: string
): Promise<HomePlanModel[]> {
  const day = dayjs(date).day();
  const convertDate = `${date}T00:00:00Z`;

  return await client
    .fetch(
      `*[_type == "plan" && author._ref == $userId && startDate <= $date && endDate >= $date && $day in days[]] | order(_createdAt desc)`,
      {
        userId,
        date: convertDate,
        day,
      }
    )
    .then((res) => mapHomePlanList(res, date));
}

function mapHomePlanList(
  planList: PlanDataModel[],
  date: string
): HomePlanModel[] {
  const today = dayjs();

  return planList
    .map((plan) => {
      const {
        title,
        days,
        history,
        interval,
        color,
        _id,
        endDate,
        startDate,
        focusTime,
      } = plan;

      const filteredHistory = history.find(({ date: recordDate }) =>
        dayjs(recordDate).isSame(date, "day")
      );

      let status: StatusType = "pending";
      const isPastDate = dayjs(date).isBefore(today, "day");

      if (filteredHistory && filteredHistory.isSuccess) {
        status = "success";
      } else if (isPastDate || filteredHistory?.focusSet === 0) {
        status = "fail";
      }

      const transformedObject = plan?.history?.reduce(
        (result: { [key: string]: PlanHistory }, item) => {
          const formatDate = dayjs(item.date).format("YYYY-MM-DD");
          result[formatDate] = item;
          return result;
        },
        {}
      );

      return {
        title,
        days,
        interval,
        color,
        _id,
        status,
        focusTime,
        startDate: dayjs(startDate).format("YYYY-MM-DD"),
        endDate: dayjs(endDate).format("YYYY-MM-DD"),
        history: transformedObject,
      };
    })
    .filter((data) => data.status === "pending");
}
