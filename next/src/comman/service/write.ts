import dayjs from "dayjs";
import { FormModel, PlanDataModel } from "../model/plan";
import { client } from "./sanity";

export async function getPlan(
  planId: string,
  userId: string
): Promise<PlanDataModel> {
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
        history: [],
        memo: res.memo ? res.memo : "",
      };
    });
}

export async function createPlan(userId: string, formData: FormModel) {
  const { startDate, endDate } = formData;
  console.log(`${startDate}T00:00:00Z`, `${endDate}T05:00:00Z`);
  return client.create(
    {
      _type: "plan",
      author: { _ref: userId },
      isStart: false,
      history: [],
      ...formData,
      startDate: `${startDate}T00:00:00Z`,
      endDate: `${endDate}T14:59:00Z`,
    },
    { autoGenerateArrayKeys: true }
  );
}

export async function updatePlan(planId: string, formData: FormModel) {
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
    .set({ startDate: `${startDate}T00:00:00Z` })
    .set({ endDate: `${endDate}T14:59:00Z` })
    .set({ interval: interval })
    .set({ focusTime: focusTime })
    .set({ breakTime: breakTime })
    .set({ color: color })
    .set({ days: days })
    .commit();
}
