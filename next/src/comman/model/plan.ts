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

export interface PlanModel {
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
  history: { [key: string]: PlanHistory };
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

export interface FormModel {
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

export interface HomePlanModel {
  _id: string;
  title: string;
  interval: number;
  color: ColorType;
  status: StatusType;
  days: number[];
  startDate: string;
  focusTime: number;
  endDate: string;
  history: { [key: string]: PlanHistory };
}

export interface PlanTimerData {
  focusSet: number;
  breakSet: number;
  intervalSet: number;
  setFocusTime: number;
  setBreakTime: number;
  focusTime: number;
  breakTime: number;
  isSuccess: boolean;
  date: string;
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

export interface FeedbackDataModel {
  successPercent: number;
  processPercent: number;
  processCount: number;
  averageSet: number;
  title: string;
  percentDiff: number;
  weekSuccessArr: number[];
  totalDay: number;
  totalSet: number;
  startDate: string;
  endDate: string;
  interval: number;
  focusTime: number;
  wasteTime: number;
  todayFocus: number;
}

export interface planPercent {
  processPercent: number;
  successPercent: number;
  totalSet: number;
  averageSet: number;
  leftSet: number;
  successCount: number;
  totalDay: number;
}
