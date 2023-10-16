import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { mutate } from "swr";
import dayjs from "dayjs";
import { PlanTimerData } from "@/comman/model/plan";
import { useCounter } from "@/comman/hooks/counter";
import { updatePlanTimer } from "@/comman/hooks/plan";
import MetaButton from "../ui/MetaButton";
import ProgressBar from "./ProgressBar";
import TimerBoard from "./TimerBoard";
import LoadingSpinner from "../ui/Loading";

type Props = {
  planTimerData: PlanTimerData;
  planId: string;
  isStop: boolean;
  isStopSetter: (isStop: boolean) => void;
  timerDone: () => void;
};

function TimerInfo({
  planTimerData,
  planId,
  isStop,
  isStopSetter,
  timerDone,
}: Props) {
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
  const router = useRouter();
  const [isUpdateLoading, setIsUpdateLoading] = useState<boolean>(false);
  const [isBreakSet, setIsBreakSet] = useState<boolean>();
  const [interval, setInterval] = useState<number>(focusSetData + breakSetData);
  const { count, start, stop, reset, done } = useCounter();
  const [uploadCount, setUploadCount] = useState(0);
  type UpdateType = "finish" | "setend" | "stop";

  const updatePlanHistory = (updateType: UpdateType) => {
    if (count !== 0 && uploadCount === count) return;
    setUploadCount(count);

    setIsUpdateLoading(true);
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
      .catch((err) => alert(err.toString()))
      .finally(() => setIsUpdateLoading(false));
  };

  const handleStop = () => {
    isStopSetter(true);
    stop();
    updatePlanHistory("stop");
  };
  const handleStart = () => {
    isStopSetter(false);
    start();
  };
  const handleEnd = () => {
    router.push("/");
  };

  useEffect(() => {
    if (focusSetData === 0 && breakSetData === 0) {
      timerDone();
      return;
    }

    if (uploadCount === 0) {
      setUploadCount(count);
    }
    if (uploadCount >= 0 && uploadCount >= count + 30) {
      setUploadCount(count);
      updatePlanHistory("stop");
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
        updatePlanHistory("finish");
        timerDone();
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

      setUploadCount(0);
      start();
    }
  }, [count]);

  return (
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
          <MetaButton mode={"end"} onClick={handleEnd} move={-75} />
          <MetaButton mode={"play"} onClick={handleStart} move={75} />
        </div>
      ) : (
        <MetaButton mode={"pause"} onClick={handleStop} />
      )}
      {isUpdateLoading && (
        <div className="absolute bottom-20pxr right-20pxr z-40">
          <LoadingSpinner type="diamond" text="저장 중" />
        </div>
      )}
    </>
  );
}

export default TimerInfo;
