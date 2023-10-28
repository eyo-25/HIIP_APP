import dayjs from "dayjs";
import { PlanDataModel, PlanHistory, PlanModel } from "../model/plan";
import { client } from "./sanity";

export async function getPlanList(userId: string): Promise<PlanModel[]> {
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

export async function deletePlan(planId: string) {
  return client.transaction().delete(planId).commit();
}

export async function getMonthPlanList(userId: string, date: string) {
  const startOfMonth = dayjs(`${date}-01`);
  const startOfDay = startOfMonth.day();
  const start = startOfMonth.subtract(startOfDay, "day");
  const endOfMonth = startOfMonth.endOf("month");
  const end = endOfMonth.add(42 - (startOfDay + endOfMonth.date()), "day");

  const startDate = start.format("YYYY-MM-DDTHH:mm:ss[Z]");
  const endDate = end.format("YYYY-MM-DDTHH:mm:ss[Z]");

  return await client
    .fetch(
      `*[_type == "plan" && author._ref == $userId && endDate >= $startDate && startDate <= $endDate]`,
      {
        userId,
        startDate,
        endDate,
      }
    )
    .then(mapMonthPlanList);
}

function mapMonthPlanList(planList: PlanDataModel[]): PlanModel[] {
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
