type PlanPercentKeyType = "processPercent" | "successPercent" | "averageSet";

type DetailInfoListType = {
  title: string;
  key: PlanPercentKeyType;
  unit: string;
};

export const analizeInfoList: DetailInfoListType[] = [
  {
    title: "평균 세트",
    key: "averageSet",
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

export const resultWord = {
  success: (
    <p>
      성공을 맛 봤으니
      <br />
      꾸준함을 맛볼 차례다.
    </p>
  ),
  fail: (
    <p>
      오늘보다 더나은
      <br />
      내일이 되도록 노력하자.
    </p>
  ),
};
