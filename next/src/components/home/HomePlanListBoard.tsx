import { HomePlanModel } from "@/comman/model/plan";
import HomePlanCard from "./HomePlanCard";

type Props = {
  planList: HomePlanModel[] | undefined;
  planListSetter: (planList: string) => void;
};

function HomePlanListBoard({ planList, planListSetter }: Props) {
  return (
    <div>
      <div className="absolute top-[5px] w-full">
        <div className="mx-auto w-90pxr h-3pxr bg-gray-400 rounded-md"></div>
      </div>
      {planList && (
        <ul className="sroll h-full pt-26pxr w-full px-24pxr mx-auto overflow-hidden">
          {planList.map((data, idx) => (
            <HomePlanCard
              key={data._id}
              data={data}
              idx={idx}
              planListSetter={planListSetter}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default HomePlanListBoard;
