export const wiseSaying = [
  ["중요한건 ", "꺾이지 않는 마음"],
  ["이대론 ", "가망이 없다"],
  ["그런식으로 했는데 ", "뭘 기대한거야?"],
  ["대충할거면 ", "기대도 대충해"],
  ["지금 핸드폰이 ", "눈에 들어오냐?"],
  ["실력 없는 자존심 만큼 ", "비참한 것은 없다"],
  ["여전할 것인가 ", "역전할 것인가"],
  ["너 가치를 네가 정하지마 ", "원하는걸 다 이루면서 살아"],
  ["꿈을 꾸기에 ", "인생은 빛난다"],
  ["꿈꾸며 ", "살자"],
  ["최선을 다하지 않고 ", "좋은 결과를 바라지 마라"],
  ["쉬운 선택, 어려운 삶", "어려운 선택, 쉬운 삶"],
  ["10분 뒤와 10년 후를 ", "동시에 생각하라"],
  ["의지력은 ", "고갈되지 않는다"],
  ["시간 관리는 ", "고통 관리다"],
  ["본질이 잊혀지면 ", "형식이 중요해진다"],
];

export type PlanPercentKeyType =
  | "processPercent"
  | "successPercent"
  | "averageSet"
  | "leftSet";

export type DetailInfoListType = {
  title: string;
  key: PlanPercentKeyType;
  unit: string;
};

export const detailInfoList: DetailInfoListType[] = [
  {
    title: "평균 세트",
    key: "averageSet",
    unit: " SET",
  },
  {
    title: "남은 세트",
    key: "leftSet",
    unit: " SET",
  },
  {
    title: "성공률",
    key: "successPercent",
    unit: "%",
  },
  {
    title: "진행률",
    key: "processPercent",
    unit: "%",
  },
];
