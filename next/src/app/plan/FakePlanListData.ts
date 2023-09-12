import { FAIL, PENDING, SUCCESS } from "@/comman/constants";
import { PlanType } from "@/comman/types";

export const fakePlanList: PlanType[] = [
  {
    id: "QXKJ7LuA7l",
    title: "영어",
    memo: "",
    days: [1, 3, 5],
    startDate: "2023-09-10",
    endDate: "2023-09-20",
    interval: 4,
    status: PENDING,
  },
  {
    id: "iGfti58QZg",
    title: "깃허브 커밋깃허브 커밋깃허브 커밋깃허브 커밋깃허브 커밋깃허브 커밋",
    memo: "1일 1커밋을 습관화 1일 1커밋을 습관화 1일 1커밋을 습관화 1일 1커밋을 습관화 1일 1커밋을 습관화 1일 1커밋을 습관화 1일 1커밋을 습관화 1일 1커밋을 습관화",
    days: [0, 2, 4, 6],
    startDate: "2023-09-10",
    endDate: "2023-10-20",
    interval: 3,
    status: PENDING,
  },
  {
    id: "QUVj9Zu8v6",
    title: "블로그 글정리",
    memo: "언제해 ㅠㅠ",
    days: [1],
    startDate: "2023-09-11",
    endDate: "2023-09-11",
    interval: 5,
    status: PENDING,
  },
  {
    id: "D1SDDWDS24",
    title: "새로운 계획 1",
    memo: "새로운 메모 1",
    days: [1, 3, 5],
    startDate: "2023-09-22",
    endDate: "2023-09-28",
    interval: 6,
    status: SUCCESS,
  },
  {
    id: "newId3",
    title: "새로운 계획 2",
    memo: "새로운 메모 2",
    days: [0, 1, 2, 3, 4, 5, 6],
    startDate: "2023-09-23",
    endDate: "2023-09-30",
    interval: 3,
    status: FAIL,
  },
];
