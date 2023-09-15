type ColorType = "red" | "blue";

export interface PlanModel {
  _id: string;
  title: string;
  memo: string;
  startDate: string;
  endDate: string;
  interval: number;
  isStart: boolean;
  days: number[];
  color: ColorType;
  history: PlanHistory[];
}

export interface PlanHistory {
  focusSet: number;
  breakSet: number;
  focusTime: number;
  breakTime: number;
  isSuccess: boolean;
  date: string;
}

export interface FullPlanModel extends PlanModel {
  status: "pending" | "success" | "fail";
}

export interface SimplePlanModel {
  title: string;
  memo: string;
  interval: number;
  color: ColorType;
  _id: string;
  status: string;
}

export interface CalendarModel {
  date: string;
  list: SimplePlanModel[];
  colors: ColorType[];
}
