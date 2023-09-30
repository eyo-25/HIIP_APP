import dayjs from "dayjs";
import { FormDataModel, PlanDataModel, PlanDetailModel } from "../model/plan";
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
        history: res.history,
        memo: res.memo ? res.memo : "",
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
