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

  // console.log(count);

  const updatePlanHistory = (
    isFinish: boolean,
    setTime: number | undefined
  ) => {
    const focusTime = 0;

    const timerData = {
      focusSet: isBreakSet
        ? Math.floor(interval / 2)
        : Math.floor(interval / 2) + 1,
      breakSet: Math.floor(interval / 2),
      focusTime: isBreakSet ? 0 : count,
      breakTime: isBreakSet ? count : 0,
      isSuccess: isFinish ? true : false,
      date: date,
    };

    console.log(timerData);

    updatePlanTimer(planId, timerData)
      .then(() => {
        mutate(`/api/plan/${planId}/timer`);
        mutate(`/api/plan?date=${dayjs().format("YYYY-MM-DD")}`);
      })
      .catch((err) => alert(err.toString()));
  };

  useEffect(() => {
    if (isBreakSet === undefined) {
      const isBreak = focusSetData <= breakSetData;
      reset(isBreak ? breakTime : focusTime);
      setIsBreakSet(isBreak);
      start();
      console.log("출항~");
    }

    if (isBreakSet !== undefined && count === 0) {
      if (interval === 1) {
        done();
        setIsDone(true);
        updatePlanHistory(true);
        router.push("/");
        return;
      }

      setInterval((prev) => prev - 1);
      if (isBreakSet) {
        setIsBreakSet(false);
        // reset(setFocusTime * 10);
        reset(10);
        updatePlanHistory(false);
      } else {
        setIsBreakSet(true);
        // reset(setBreakTime * 10);
        reset(10);
        updatePlanHistory(false);
      }

      start();
    }
  }, [count]);

  const handleStop = () => {
    setIsStop(true);
    stop();
    updatePlanHistory(false);
  };

  const handleStart = () => {
    setIsStop(false);
    start();
  };

  const handleEnd = () => {
    router.push("/");
  };

  return (
    <div className="flex flex-col z-20 w-full h-full text-white">
      {isDone ? (
        <>
          <section>{interval}끝났다리</section>
        </>
      ) : (
        <>
          <ProgressBar />
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
