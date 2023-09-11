import { FAIL, PENDING, SUCCESS, ACTIVE } from "@/comman/constants";

export const PlanModeClass = {
  [ACTIVE]: {
    accent: "bg-black",
    text: "text-gray-800 font-medium",
    shadow: "drop-shadow-xl",
  },
  [SUCCESS]: {
    accent: "bg-blue",
    text: "text-blue",
    shadow: "drop-shadow-sm",
  },
  [FAIL]: {
    accent: "bg-red",
    text: "text-red",
    shadow: "drop-shadow-sm",
  },
  [PENDING]: {
    accent: "bg-gray-500",
    text: "text-gray-700",
    shadow: "drop-shadow-sm",
  },
};

export const DEFAULTMEMO = (
  <>
    계획 실천 후 피드백이나 <br />
    실천 중 메모를 적어주세요
  </>
);
