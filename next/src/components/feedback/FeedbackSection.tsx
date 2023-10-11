"use client";

import { FeedbackDataModel } from "@/comman/model/plan";

type Props = {
  feedBackList: FeedbackDataModel[];
};

export default function FeedbackSection({ feedBackList }: Props) {
  const totalArr = feedBackList.reduce(
    (acc, cu) => {
      const { successPercent, processPercent, averageSet, interval } = cu;
      const copy = [...acc];
      copy[0] += successPercent;
      copy[1] += processPercent;
      copy[2] += Math.floor((averageSet / interval) * 100);

      return copy;
    },
    [0, 0, 0]
  );

  let totalScore = Math.floor(totalArr.reduce((acc, cu) => acc + cu, 0) / 3);

  return (
    <>
      <h5 className="font-black italic text-7xl">{totalScore}</h5>
    </>
  );
}
