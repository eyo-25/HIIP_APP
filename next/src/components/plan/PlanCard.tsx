import { PlanType } from "@/comman/types";
import { IoPlaySharp } from "react-icons/io5";
import { FAIL, PENDING, SUCCESS, ACTIVE } from "@/comman/constants";
import { DEFAULTMEMO, PlanModeClass } from "./PlanCard.data";
import { useAtomValue, useSetAtom } from "jotai";
import { selectPlanAtom, selected_planId_atom } from "@/store";

type Props = {
  data: PlanType;
};

export default function PlanCard({ data }: Props) {
  const { title, memo, interval, status, id } = data;
  const selectPlanId = useAtomValue(selected_planId_atom);
  const setSelectedPlan = useSetAtom(selectPlanAtom);
  const intervalArray = Array.from({ length: interval }, (_, index) => index);
  const isActive = selectPlanId === id;

  const getPlanMode = () => {
    if (status === SUCCESS) return SUCCESS;
    if (status === FAIL) return FAIL;
    if (isActive) return ACTIVE;
    return PENDING;
  };
  const mode = getPlanMode();

  const handleCardClick = () => {
    if (!isActive) {
      setSelectedPlan(data);
    }
  };

  return (
    <li
      onClick={handleCardClick}
      className={`relative flex flex-col mt-18pxr px-35pxr rounded-md ${
        isActive ? PlanModeClass[ACTIVE].shadow : PlanModeClass[mode].shadow
      } ${isActive || mode === PENDING ? "bg-white" : "bg-gray-400"}`}
    >
      <div className="relative py-35pxr">
        <div className="flex justify-between mb-15pxr">
          <h4 className={`ellipsis font-semibold max-w-[190px] text-gray-800`}>
            {title}
          </h4>
          <div className="flex items-center">
            <p className={`mr-12pxr text-lg ${PlanModeClass[mode].text}`}>
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
              className={`w-full ${PlanModeClass[mode].accent}`}
              key={index}
            ></li>
          ))}
        </ul>
      </div>
    </li>
  );
}
