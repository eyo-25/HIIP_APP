import dayjs from "dayjs";
import { HomePlanModel, PlanDataModel, PlanHistory } from "../model/plan";
import { client } from "./sanity";

export async function getDetailPlan(
  planId: string,
  userId: string
): Promise<HomePlanModel> {
  return await client
    .fetch(
      `*[_type == "plan" && _id == $planId && author._ref == $userId][0]`,
      {
        planId,
        userId,
      }
    )
    .then((plan: PlanDataModel) => {
      const { title, days, history, interval, color, _id, endDate, startDate } =
        plan;

      const transformedObject = history?.reduce(
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
        status: "pending",
        startDate: dayjs(startDate).format("YYYY-MM-DD"),
        endDate: dayjs(endDate).format("YYYY-MM-DD"),
        history: transformedObject,
      };
    });
}
