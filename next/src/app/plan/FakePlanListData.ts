import { FAIL, PENDING, SUCCESS } from "@/comman/constants";

export const fakePlanList = [
  {
    id: "QXKJ7LuA7l",
    title: "영어",
    memo: "",
    days: [1, 3, 5],
    startDate: "2023-09-10",
    endDate: "2023-09-20",
    interval: 4,
    status: SUCCESS,
  },
  {
    id: "iGfti58QZg",
    title: "깃허브 커밋깃허브 커밋깃허브 커밋깃허브 커밋깃허브 커밋깃허브 커밋",
    memo: "1일 1커밋을 습관화 1일 1커밋을 습관화 1일 1커밋을 습관화 1일 1커밋을 습관화 1일 1커밋을 습관화 1일 1커밋을 습관화 1일 1커밋을 습관화 1일 1커밋을 습관화",
    days: [0, 1, 2, 3, 4, 5, 6],
    startDate: "2023-09-10",
    endDate: "2023-10-20",
    interval: 3,
    status: FAIL,
  },
  {
    id: "QUVj9Zu8v6",
    title: "블로그 글정리",
    memo: "언제해 ㅠㅠ",
    days: [0, 6],
    startDate: "2023-09-11",
    endDate: "2023-09-11",
    interval: 5,
    status: PENDING,
  },
];
