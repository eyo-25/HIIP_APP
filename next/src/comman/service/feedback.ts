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
  const homePlanList = planList.map((plan) => {
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
      focusTime,
      startDate: dayjs(startDate).format("YYYY-MM-DD"),
      endDate: dayjs(endDate).format("YYYY-MM-DD"),
      history: transformedObject,
    } as HomePlanModel;
  });

  return homePlanList.map((homePlan: HomePlanModel) => {
    const planPercent = usePlanPercent(homePlan);
    const { title, startDate, endDate, interval, focusTime } = homePlan;
    const { successPercent, processPercent, averageSet, processCount } =
      planPercent;
    const weekSuccessArr = weekSuccessPercent(homePlan, planPercent);
    const today = dayjs();

    const percentDiff =
      weekSuccessArr[today.day() + 1] - weekSuccessArr[today.day()];

    return {
      totalSet: planPercent.totalSet,
      totalDay: planPercent.totalDay,
      successPercent,
      processPercent,
      processCount,
      averageSet,
      focusTime,
      percentDiff,
      weekSuccessArr,
      title,
      startDate,
      endDate,
      interval,
    };
  });
}
