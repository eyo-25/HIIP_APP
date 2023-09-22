import { CheckBox, EmptyBox, XBox } from "@/comman/assets";

export const planColor = {
  red: "bg-red",
  orange: "bg-orange",
  yellow: "bg-yellow",
  green: "bg-green",
  blue: "bg-blue",
  purple: "bg-purple",
};

export const StatusImg = {
  fail: <XBox />,
  success: <CheckBox />,
  pending: <EmptyBox />,
};

export const DEFAULTMEMO = (
  <>
    계획 실천 후 피드백이나 <br />
    실천 중 메모를 적어주세요
  </>
);
