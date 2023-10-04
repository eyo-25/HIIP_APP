import { HomePlanModel } from "@/comman/model/plan";
import HomePlanCard from "./HomePlanCard";

type Props = {
  planList: HomePlanModel[] | undefined;
  planListSort: (planList: string) => void;
};

function HomePlanListBoard({ planList, planListSort }: Props) {
  return (
    <div>
      <div className="absolute top-[5px] w-full">
        <div className="mx-auto w-90pxr h-3pxr bg-gray-400 rounded-md"></div>
      </div>
      <ul className="sroll h-full pt-26pxr w-full px-24pxr mx-auto overflow-hidden">
        {planList && (
          <>
            {planList.map((data, idx) => (
              <HomePlanCard
                key={data._id}
                data={data}
                idx={idx}
                planListSort={planListSort}
              />
            ))}
          </>
        )}
      </ul>
    </div>
  );
}

export default HomePlanListBoard;
