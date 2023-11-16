export type ColorType =
  | "red"
  | "orange"
  | "yellow"
  | "green"
  | "blue"
  | "purple";

export type StatusType = "success" | "fail" | "pending";

interface PlanBase {
  _id: string;
  title: string;
  memo: string;
  startDate: string;
  endDate: string;
  interval: number;
  color: ColorType;
}

export interface SimplePlanModel extends PlanBase {
  status: StatusType;
}

export interface PlanDataModel extends PlanBase {
  isStart: boolean;
  focusTime: number;
  breakTime: number;
  days: number[];
  history: PlanHistory[];
}

export interface HomePlanModel extends Omit<PlanBase, "memo"> {
  status: StatusType;
  days: number[];
  focusTime: number;
  history: { [key: string]: PlanHistory };
}

export interface PlanModel extends PlanBase {
  isStart: boolean;
  focusTime: number;
  breakTime: number;
  days: number[];
  history: { [key: string]: PlanHistory };
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
