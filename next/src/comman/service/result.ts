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
        focusTime,
        color,
        _id,
        status: "pending",
        startDate: dayjs(startDate).format("YYYY-MM-DD"),
        endDate: dayjs(endDate).format("YYYY-MM-DD"),
        history: transformedObject,
      };
    });
}

export async function updatePlanResult(planId: string, isSuccess: boolean) {
  const currentPlan: PlanDataModel = await client.fetch(
    `*[_type == "plan" && _id == $planId][0]`,
    {
      planId,
    }
  );

  const updateHistory = [...currentPlan.history];
  const findIndex = updateHistory.findIndex((record) =>
    dayjs(record.date).isSame(dayjs(), "day")
  );
  updateHistory[findIndex] = { ...updateHistory[findIndex], isSuccess };

  return await client
    .patch(planId)
    .set({ history: updateHistory })
    .commit({ autoGenerateArrayKeys: true });
}
