import dayjs from "dayjs";
import { PlanDataModel, PlanHistory, PlanModel } from "../model/plan";
import { client } from "./sanity";

export async function getPlanList(userId: string) {
  return await client
    .fetch(
      `*[_type == "plan" && author._ref == $userId] | order(_createdAt desc)`,
      {
        userId,
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
