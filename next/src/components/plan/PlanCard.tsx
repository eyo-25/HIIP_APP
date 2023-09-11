import React, { Dispatch, SetStateAction } from "react";
import { PlanType } from "@/comman/types";
import { IoPlaySharp } from "react-icons/io5";
import { FAIL, PENDING, SUCCESS, ACTIVE } from "@/comman/constants";
import { DEFAULTMEMO, PlanModeClass } from "./PlanCard.data";

type Props = {
  data: PlanType;
  selectPlanId: string;
  setSelectPlanId: Dispatch<SetStateAction<string>>;
};

export default function PlanCard({
  data,
  selectPlanId,
  setSelectPlanId,
}: Props) {
  const { title, memo, interval, status, id } = data;
  const intervalArray = Array.from({ length: interval }, (_, index) => index);
  const getPlanMode = () => {
    if (status === SUCCESS) return SUCCESS;
    if (status === FAIL) return FAIL;
    if (selectPlanId === id) return ACTIVE;
    return PENDING;
  };
  const mode = getPlanMode();

  const handleCardClick = () => {
    if (mode === PENDING) {
      setSelectPlanId(id);
    }
  };

  return (
    <li
      onClick={handleCardClick}
      className={`relative flex flex-col mt-18pxr px-35pxr bg-white rounded-md ${PlanModeClass[mode].shadow}`}
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
