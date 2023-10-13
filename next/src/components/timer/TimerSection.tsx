import { PlanTimerData } from "@/comman/model/plan";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import TimerInfo from "./TimerInfo";
import LoadingSpinner from "../ui/Loading";

type Props = {
  planTimerData: PlanTimerData | undefined;
  planId: string;
  isLoading: boolean;
};

function TimerSection({ planTimerData, planId, isLoading }: Props) {
  const [isDone, setIsDone] = useState<boolean>(false);
  const [isStop, setIsStop] = useState<boolean>(false);
  const router = useRouter();

  const handleFinishClick = (isSuccess: boolean) => {
    router.push(`/result/${planId}?type=${isSuccess ? "success" : "fail"}`);
  };
  const timerDone = () => {
    setIsDone(true);
  };
  const isStopSetter = (isStop: boolean) => setIsStop(isStop);

  const gradiantVariants = {
    normal: {
      opacity: 0,
      height: "0",
    },
    animate: {
      opacity: 1,
      height: "70%",
      transition: {
        delat: 0.1,
        duration: 1,
        type: "tween",
      },
    },
  };

  const gradiantClass = () => {
    const base = "absolute z-10 bottom-0pxr w-full h-[70%] bg-gradient-to-t";

    if (isStop) {
      return `${base} from-red from-10% via-red/50 via-30% to-red/0 to-90%`;
    }

    return `${base} from-blue from-10% via-blue/50 via-30% to-blue/0 to-90%`;
  };

  return (
    <div className="relative flex flex-col z-20 w-full h-full text-white">
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
      ) : !isLoading && planTimerData ? (
        <TimerInfo
          planTimerData={planTimerData}
          planId={planId}
          timerDone={timerDone}
          isStop={isStop}
          isStopSetter={isStopSetter}
        />
      ) : (
        <LoadingSpinner text="타이머 불러오는 중" />
      )}
      <motion.div
        variants={gradiantVariants}
        initial="normal"
        animate="animate"
        className={gradiantClass()}
      ></motion.div>
    </div>
  );
}

export default TimerSection;
