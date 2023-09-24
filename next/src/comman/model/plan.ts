export type ColorType =
  | "red"
  | "orange"
  | "yellow"
  | "green"
  | "blue"
  | "purple";
export type StatusType = "success" | "fail" | "pending";

export interface PlanDataModel {
  _id: string;
  title: string;
  memo: string;
  startDate: string;
  endDate: string;
  interval: number;
  isStart: boolean;
  focusTime: number;
  breakTime: number;
  days: number[];
  color: ColorType;
  history: PlanHistory[];
}

export interface FormDataModel {
  title: string;
  memo: string;
  startDate: string;
  endDate: string;
  interval: number;
  focusTime: number;
  breakTime: number;
  color: ColorType;
  days: number[];
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

export interface PlanDetailModel {
  _id: string;
  title: string;
  memo: string;
  startDate: string;
  focusTime: number;
  breakTime: number;
  endDate: string;
  interval: number;
  isStart: boolean;
  days: number[];
  color: ColorType;
  history: { [key: string]: PlanHistory };
}

export interface HomePlanModel {
  title: string;
  interval: number;
  color: ColorType;
  _id: string;
  status: StatusType;
}

export interface SimplePlanModel {
  title: string;
  memo: string;
  interval: number;
  color: ColorType;
  _id: string;
  status: StatusType;
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
