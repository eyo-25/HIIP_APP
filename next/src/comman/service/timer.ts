import dayjs from "dayjs";
import { client } from "./sanity";
import { PlanDataModel, PlanHistory, PlanTimerData } from "../model/plan";

export async function updatePlanTimer(planId: string, timerData: PlanHistory) {
  const currentPlan: PlanDataModel = await client.fetch(
    `*[_type == "plan" && _id == $planId][0]`,
    {
      planId,
    }
  );

  const updateHistory = [...currentPlan.history];
  const findIndex = updateHistory.findIndex((record) =>
    dayjs(record.date).isSame(dayjs(timerData.date), "day")
  );
  updateHistory[findIndex] = timerData;

  return await client
    .patch(planId)
    .set({ history: updateHistory })
    .commit({ autoGenerateArrayKeys: true });
}

export async function getPlanTimer(
  planId: string,
  userId: string
): Promise<PlanTimerData> {
  try {
    const res: PlanDataModel = await client.fetch(
      `*[_type == "plan" && _id == $planId && author._ref == $userId][0]`,
      {
        planId,
        userId,
      }
    );
    const { history, interval, focusTime, breakTime, _id } = res;

    const todayHistory = history?.find((record) =>
      dayjs().isSame(dayjs(record.date), "day")
    );

    if (todayHistory) {
      return {
        ...todayHistory,
        setFocusTime: focusTime,
        setBreakTime: breakTime,
        intervalSet: interval,
        date: `${dayjs().format("YYYY-MM-DD")}T00:00:00Z`,
      };
    } else {
      const newHistory: PlanHistory = {
        focusSet: interval,
        breakSet: interval - 1,
        focusTime: focusTime * 60,
        breakTime: 0,
        isSuccess: false,
        date: `${dayjs().format("YYYY-MM-DD")}T00:00:00Z`,
      };

      await updatePlanHistory(_id, newHistory);

      return {
        ...newHistory,
        intervalSet: interval,
        setFocusTime: focusTime,
        setBreakTime: breakTime,
      };
    }
  } catch (error) {
    throw error;
  }
}

async function updatePlanHistory(planId: string, newHistory: PlanHistory) {
  return await client
    .transaction()
    .patch(planId, (plan) => {
      return plan.append("history", [newHistory]).set({ isStart: true });
    })
    .commit({ autoGenerateArrayKeys: true });
}
