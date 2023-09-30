import { PlanTimerData } from "@/comman/model/plan";
import MetaButton from "../ui/MetaButton";
import { useEffect, useState } from "react";
import { useCounter } from "@/comman/hooks/counter";
import { useRouter } from "next/navigation";
import ProgressBar from "./ProgressBar";
import TimerBoard from "./TimerBoard";
import { updatePlanTimer } from "@/comman/hooks/plan";
import { mutate } from "swr";
import dayjs from "dayjs";

type Props = { planTimerData: PlanTimerData; planId: string };

function TimerSection({ planTimerData, planId }: Props) {
  const {
    focusSet: focusSetData,
    breakSet: breakSetData,
    setBreakTime,
    setFocusTime,
    focusTime,
    breakTime,
    intervalSet,
    date,
  } = planTimerData;
  const [isBreakSet, setIsBreakSet] = useState<boolean>();
  const [isStop, setIsStop] = useState<boolean>(false);
  const [isDone, setIsDone] = useState<boolean>(false);
  const [interval, setInterval] = useState<number>(focusSetData + breakSetData);
  const router = useRouter();

  const { count, start, stop, reset, done } = useCounter();

  type UpdateType = "finish" | "setend" | "stop";

  const updatePlanHistory = (updateType: UpdateType) => {
    let focusTime = 0;
    let breakTime = 0;
    let isSuccess = false;
    let focusSet = isBreakSet
      ? Math.floor(interval / 2)
      : Math.floor(interval / 2) + 1;
    let breakSet = Math.floor(interval / 2);

    if (updateType === "finish") {
      focusSet = 0;
      breakSet = 0;
    }

    if (updateType === "setend") {
      if (isBreakSet) {
        focusTime = setFocusTime * 60;
        breakSet--;
      } else {
        breakTime = setBreakTime * 60;
        focusSet--;
      }
    } else if (updateType === "stop") {
      if (isBreakSet) {
        breakTime = count;
      } else {
        focusTime = count;
      }
    }

    const timerData = {
      focusSet,
      breakSet,
      focusTime,
      breakTime,
      isSuccess,
      date,
    };

    updatePlanTimer(planId, timerData)
      .then(() => {
        mutate(`/api/plan/${planId}/timer`);
        mutate(`/api/plan?date=${dayjs().format("YYYY-MM-DD")}`);
      })
      .catch((err) => alert(err.toString()));
  };

  useEffect(() => {
    if (focusSetData === 0 && breakSetData === 0) {
      setIsDone(true);
      return;
    }

    if (isBreakSet === undefined) {
      const isBreak = focusSetData <= breakSetData;
      reset(isBreak ? breakTime : focusTime);
      setIsBreakSet(isBreak);
      start();
      return;
    }

    if (count === 0) {
      if (interval === 1) {
        done();
        setIsDone(true);
        updatePlanHistory("finish");
        return;
      }

      setInterval((prev) => prev - 1);
      if (isBreakSet) {
        setIsBreakSet(false);
        reset(setFocusTime * 60);
        updatePlanHistory("setend");
      } else {
        setIsBreakSet(true);
        reset(setBreakTime * 60);
        updatePlanHistory("setend");
      }

      start();
    }
  }, [count]);

  const handleStop = () => {
    setIsStop(true);
    stop();
    updatePlanHistory("stop");
  };

  const handleStart = () => {
    setIsStop(false);
    start();
  };

  const handleEnd = () => {
    router.push("/");
  };

  const handleFinishClick = (isSuccess: boolean) => {
    router.push(`/result/${planId}?type=${isSuccess ? "success" : "fail"}`);
  };

  return (
    <div className="flex flex-col z-20 w-full h-full text-white">
      {isDone ? (
        <section className="z-30 w-full h-full flex-center flex-col">
          <h5 className="black-italic text-6xl mb-15pxr">FINISH</h5>
          <p>계획한일을 시간내에 완료 하셨나요?</p>
          <div className="flex items-center px-10pxr w-full h-50pxr bg-gradient-to-l from-white/20 from-0% via-white via-50% to-white/20 to-100% mt-30pxr">
            <button
              onClick={() => handleFinishClick(false)}
              className="flex-center w-[50%] h-full font-semibold text-black"
            >
              실패
            </button>
            <div className="w-1pxr h-[60%] bg-black"></div>
            <button
              onClick={() => handleFinishClick(true)}
              className="flex-center w-[50%] h-full font-semibold text-black"
            >
              성공
            </button>
          </div>
        </section>
      ) : (
        <>
          <ProgressBar
            interval={interval}
            intervalSet={intervalSet}
            count={count}
            setBreakTime={setBreakTime}
            setFocusTime={setFocusTime}
            isBreakSet={isBreakSet}
          />
          {isBreakSet !== undefined && (
            <TimerBoard
              count={count}
              intervalSet={intervalSet}
              interval={interval}
              isBreakSet={isBreakSet}
              isStop={isStop}
            />
          )}
          {isStop ? (
            <div>
              <MetaButton
                mode={"end"}
                onClick={handleEnd}
                style="right-150pxr"
              />
              <MetaButton
                mode={"play"}
                onClick={handleStart}
                style="left-150pxr"
              />
            </div>
          ) : (
            <MetaButton mode={"pause"} onClick={handleStop} />
          )}
        </>
      )}
      <div className="absolute z-10 bottom-0pxr w-full h-[70%] bg-gradient-to-t from-blue from-10% via-blue/50 via-30% to-blue/0 to-90%"></div>
    </div>
  );
}

export default TimerSection;
