import dayjs from "dayjs";
import { PlanModel } from "../model/plan";
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

function mapPlanList(planList: PlanModel[]) {
  return planList.map((plan: PlanModel) => ({
    ...plan,
    startDate: dayjs(plan.startDate).format("YYYY-MM-DD"),
    endDate: dayjs(plan.endDate).format("YYYY-MM-DD"),
  }));
}
