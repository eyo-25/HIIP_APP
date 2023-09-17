type ColorType = "red" | "blue";

export interface PlanDataModel {
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
  history: { [key: string]: PlanHistory };
}

export interface SimplePlanModel {
  title: string;
  memo: string;
  interval: number;
  color: ColorType;
  _id: string;
  status: string;
  startDate: string;
  endDate: string;
}

export interface PlanHistory {
  focusSet: number;
  breakSet: number;
  focusTime: number;
  breakTime: number;
  isSuccess: boolean;
  date: string;
}

export interface FullPlanModel extends PlanDataModel {
  status: "pending" | "success" | "fail";
}

export interface SelectPlanModel {
  title: string;
  _id: string;
  startDate: string;
  endDate: string;
}

export interface CalendarModel {
  date: string;
  list: SimplePlanModel[];
  colors: ColorType[];
}

export interface CalendaMemoModel {
  [key: string]: CalendarModel[][];
}