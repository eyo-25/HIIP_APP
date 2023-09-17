import { IoPlaySharp } from "react-icons/io5";
import { DEFAULTMEMO, planColor } from "./PlanCard.data";
import { SelectPlanModel, SimplePlanModel } from "@/comman/model/plan";
import { CheckBox } from "@/comman/assets";
import { SUCCESS } from "@/comman/constants";

type Props = {
  planData: SimplePlanModel;
  selectedPlanId?: string;
  selectPlan: (planData: SelectPlanModel) => void;
};

export default function PlanCard({
  planData,
  selectedPlanId,
  selectPlan,
}: Props) {
  const { title, memo, interval, _id, startDate, endDate, status, color } =
    planData;
  const intervalArray = Array.from({ length: interval }, (_, index) => index);
  const isActive = selectedPlanId === _id;

  return (
    <li
      onClick={() =>
        !isActive && selectPlan({ title, _id, startDate, endDate })
      }
      className={`relative cursor-pointer flex flex-col mt-18pxr px-35pxr rounded-md bg-white ${
        isActive ? "drop-shadow-xl" : "drop-shadow-sm"
      }`}
    >
      <div className="relative py-35pxr">
        <div className="flex justify-between mb-15pxr">
          <div className="flex">
            <h4
              className={
                "ellipsis mr-9pxr font-semibold max-w-[180px] text-gray-900"
              }
            >
              {title.slice(0, 12)}
            </h4>
            {status === SUCCESS && (
              <CheckBox className={`mt-2pxr ${!isActive && "opacity-50"}`} />
            )}
          </div>
          <div className="flex items-center">
            <p className={"mr-12pxr text-lg text-gray-900"}>
              {interval}{" "}
              <span className="text-base text-gray-700 font-normal">SET</span>
            </p>
            <IoPlaySharp className="text-gray-600" />
          </div>
        </div>
        <p className="text-gray-600 font-normal h-48pxr ellipsis-2">
          {memo === "" ? DEFAULTMEMO : memo}
        </p>
        <ul className="absolute flex gap-[1%] bottom-0pxr w-full h-7pxr">
          {intervalArray.map((index) => (
            <li
              className={`w-full ${planColor[color]} ${
                !isActive && "opacity-50"
              }`}
              key={index}
            ></li>
          ))}
        </ul>
      </div>
    </li>
  );
}
