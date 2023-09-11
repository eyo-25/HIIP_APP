import {
  Feedback,
  My,
  Plan,
  SelectFeedback,
  SelectMy,
  SelectPlan,
  SelectStart,
  Start,
} from "@/comman/assets";

export const LINKS = [
  {
    icon: <Plan />,
    selectIcon: <SelectPlan />,
    href: "/plan",
    title: "계획",
  },
  {
    icon: <Start />,
    selectIcon: <SelectStart />,
    href: "/",
    title: "실행",
  },
  {
    icon: <Feedback />,
    selectIcon: <SelectFeedback />,
    href: "/feedback",
    title: "피드백",
  },
  {
    icon: <My />,
    selectIcon: <SelectMy />,
    href: "/my",
    title: "MY",
  },
];
