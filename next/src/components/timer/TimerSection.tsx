import { PlanTimerData } from "@/comman/model/plan";
import MetaButton from "../ui/MetaButton";
import { useEffect, useLayoutEffect, useState } from "react";
import { useCounter } from "@/comman/hooks/counter";
import { useRouter } from "next/navigation";
import ProgressBar from "./ProgressBar";
import TimerBoard from "./TimerBoard";

type Props = { planTimerData: PlanTimerData };

function TimerSection({ planTimerData }: Props) {
  const {
    focusSet: focusSetData,
    breakSet: breakSetData,
    setBreakTime,
    setFocusTime,
    focusTime,
    breakTime,
  } = planTimerData;
  const [isBreakSet, setIsBreakSet] = useState<boolean>();
  const [isStop, setIsStop] = useState<boolean>(false);
  const [isDone, setIsDone] = useState<boolean>(false);
  const [interval, setInterval] = useState<number>(focusSetData + breakSetData);
  const router = useRouter();

  const { count, start, stop, reset, done } = useCounter();

  console.log(count);

  useEffect(() => {
    // 브레이크세트인지가 안정해져 있다면 초기화
    if (isBreakSet === undefined) {
      const isBreak = (focusSetData + breakSetData) % 2 === 0;
      reset(isBreak ? breakTime : focusTime);
      setIsBreakSet(isBreak);
      start();
      console.log("출항~");
    }

    if (isBreakSet !== undefined && count === 0) {
      if (interval === 1) {
        done();
        setIsDone(true);
        return;
      }

      setInterval((prev) => prev - 1);
      if (isBreakSet) {
        setIsBreakSet(false);
        // reset(setFocusTime * 10);
        reset(10);
      } else {
        setIsBreakSet(true);
        // reset(setBreakTime * 10);
        reset(10);
      }

      start();
    }
  }, [count]);

  const handleStop = () => {
    setIsStop(true);
    stop();
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
