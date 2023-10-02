import { LoadingWhite } from "@/comman/assets";
import { updatePlanResult } from "@/comman/hooks/plan";
import { HomePlanModel } from "@/comman/model/plan";
import dayjs from "dayjs";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { mutate } from "swr";
import LoadingSpinner from "../ui/Loading";

type Props = {
  isSuccess: boolean;
  planData: HomePlanModel;
};

function ResultPushBar({ isSuccess, planData }: Props) {
  const [startX, setStartX] = useState(0);
  const [distanceX, setDistanceX] = useState(0);
  const [isPushed, setIsPushed] = useState(false);
  const [isLoarding, setIsLoarding] = useState(false);
  const router = useRouter();
  const reset = () => {
    setIsPushed(false);
    setDistanceX(0);
    setStartX(0);
  };

  const updateHistory = async () => {
    if (!isSuccess) return router.push("/");
    setIsLoarding(true);
    await updatePlanResult(planData._id, isSuccess)
      .then(() => {
        mutate(`/api/plan/${planData._id}/timer`);
        mutate(`/api/plan?date=${dayjs().format("YYYY-MM-DD")}`);
      })
      .catch((err) => alert(err.toString()))
      .finally(() => {
        setIsLoarding(false);
        router.push("/");
      });
  };
  const handleMouseDown = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setIsPushed(true);
    setDistanceX(0);
    setStartX(e.clientX);
  };
  const handleMouseUp = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    reset();
    if (170 < e.clientX - startX) {
      updateHistory();
    }
  };
  const handleMouseMove = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (isPushed) {
      setDistanceX(e.clientX - startX);
    }
  };
  const handleMouseLeave = () => {
    if (isPushed) {
      reset();
      if (170 < distanceX - startX) {
        updateHistory();
      }
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPushed(true);
    setStartX(e.changedTouches[0].pageX);
  };
  const handleTouchEnd = () => {
    reset();
    if (180 < distanceX) {
      updateHistory();
    }
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    if (isPushed) {
      if (300 < distanceX) {
        reset();
        updateHistory();
      } else {
        setDistanceX(e.changedTouches[0].pageX - startX);
      }
    }
  };

  return (
    <div
      className={`relative overflow-hidden flex-center h-[12%] w-full rounded-md shadow-lg bg-gradient-to-r from-black from-10% via-black via-55% ${
        isSuccess ? "to-blue" : "to-red"
      } to-90%`}
    >
      {isLoarding ? (
        <div className="z-40 flex">
          <LoadingSpinner />
        </div>
      ) : (
        <>
          <div
            onMouseMove={handleMouseMove}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onTouchEnd={handleTouchEnd}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            className={`absolute cursor-grab mx-10pxr flex-center top-[13%] bottom-[13% w-[18%] h-[74%] border rounded-md ${
              isPushed ? "text-black bg-white" : "text-white"
            }`}
            style={{ left: `${distanceX}px` }}
          >
            홈
          </div>
          {!isPushed && <p className="text-gray-800">밀어서 인터벌 결과적용</p>}
        </>
      )}
    </div>
  );
}

export default ResultPushBar;
