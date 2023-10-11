import dayjs from "dayjs";
import {
  FeedbackDataModel,
  HomePlanModel,
  PlanDataModel,
  PlanHistory,
} from "../model/plan";
import { client } from "./sanity";
import { usePlanPercent } from "../utils/planPercent";
import { weekSuccessPercent } from "../utils/weekSuccessPercent";

export async function getFeedBackList(
  userId: string
): Promise<FeedbackDataModel[]> {
  return await client
    .fetch(
      `*[_type == "plan" && author._ref == $userId] | order(_createdAt desc)`,
      {
        userId,
      }
    )
    .then((res) => mapHomePlanList(res));
}

function mapHomePlanList(planList: PlanDataModel[]): FeedbackDataModel[] {
  return planList
    .map((plan) => {
      const { title, days, history, interval, color, _id, endDate, startDate } =
        plan;

      const transformedObject = history.reduce(
        (result: { [key: string]: PlanHistory }, item) => {
          const formatDate = dayjs(item.date).format("YYYY-MM-DD");
          result[formatDate] = item;
          return result;
        },
        {}
      );

      return {
        _id,
        title,
        interval,
        color,
        status: "pending",
        days,
        startDate: dayjs(startDate).format("YYYY-MM-DD"),
        endDate: dayjs(endDate).format("YYYY-MM-DD"),
        history: transformedObject,
      } as HomePlanModel;
    })
    .map((homePlan: HomePlanModel) => {
      const planPercent = usePlanPercent(homePlan);
      const { title, startDate, endDate, interval } = homePlan;
      const { successPercent, processPercent, averageSet } = planPercent;
      const weekSuccessArr = weekSuccessPercent(homePlan, planPercent);

      return {
        successPercent,
        processPercent,
        averageSet,
        weekSuccessArr,
        title,
        startDate,
        endDate,
        interval,
      };
    });
}
