import dayjs from "dayjs";
import {
  PlanDataModel,
  PlanHistory,
  PlanModel,
  FormDataModel,
  PlanDetailModel,
} from "../model/plan";
import { client } from "./sanity";

export async function getPlan(
  planId: string,
  userId: string
): Promise<PlanDetailModel> {
  return await client
    .fetch(
      `*[_type == "plan" && _id == $planId && author._ref == $userId][0]`,
      {
        planId,
        userId,
      }
    )
    .then((res: PlanDataModel) => {
      const startDate = dayjs(res.startDate).format("YYYY-MM-DD");
      const endDate = dayjs(res.endDate).format("YYYY-MM-DD");

      return {
        ...res,
        startDate: startDate,
        endDate: endDate,
        history: {},
        memo: res.memo ? res.memo : "",
      };
    });
}

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

export async function createPlan(userId: string, formData: FormDataModel) {
  return client.create(
    {
      _type: "plan",
      author: { _ref: userId },
      isStart: false,
      history: [],
      ...formData,
    },
    { autoGenerateArrayKeys: true }
  );
}

export async function updatePlan(planId: string, formData: FormDataModel) {
  const {
    title,
    memo,
    startDate,
    endDate,
    interval,
    focusTime,
    breakTime,
    color,
    days,
  } = formData;

  return client
    .patch(planId)
    .set({ title: title })
    .set({ memo: memo })
    .set({ startDate: startDate })
    .set({ endDate: endDate })
    .set({ interval: interval })
    .set({ focusTime: focusTime })
    .set({ breakTime: breakTime })
    .set({ color: color })
    .set({ days: days })
    .commit();
}

export async function deletePlan(planId: string) {
  return client.transaction().delete(planId).commit();
}
