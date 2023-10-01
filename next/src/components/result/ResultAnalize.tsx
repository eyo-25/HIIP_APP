import { HomePlanModel } from "@/comman/model/plan";
import { usePlanPercent } from "@/comman/utils/planPercent";

type Props = {
  planData: HomePlanModel;
};

function ResultAnalize({ planData }: Props) {
  const planPercentData = usePlanPercent(planData, true);

  console.log(planPercentData);

  //   const planPercentData: {
  //     processPercent: number;
  //     successPercent: number;
  //     averageSet: number;
  //     leftSet: number;
  // }
  return (
    <ul className="flex h-[19%] gap-[6%]">
      <li className="bg-white flex-center flex-col w-full h-full rounded-md shadow-lg">
        <div className="text-sm text-white bg-black px-8pxr rounded-xl">
          +18
        </div>
        <strong className="font-bold text-xl my-[3%]">30%</strong>
        <p className="text-xs">성공률</p>
      </li>
      <li className="bg-white flex-center flex-col w-full h-full rounded-md shadow-lg">
        <div className="text-sm text-white bg-black px-8pxr rounded-xl">
          +18
        </div>
        <strong className="font-bold text-xl my-[3%]">30%</strong>
        <p className="text-xs">평균 세트</p>
      </li>
      <li className="bg-white flex-center flex-col w-full h-full rounded-md shadow-lg">
        <div className="text-sm text-white bg-black px-8pxr rounded-xl">
          +18
        </div>
        <strong className="font-bold text-xl my-[3%]">30%</strong>
        <p className="text-xs">진행률</p>
      </li>
    </ul>
  );
}

export default ResultAnalize;
