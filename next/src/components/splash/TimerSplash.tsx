import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { StartBackgound } from "@/comman/assets";

const imgVariants = {
  normal: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.5,
      type: "linear",
    },
  },
};
const textVariants = {
  normal: {
    opacity: 0,
    scale: 0,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spling",
      duration: 0.4,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.5,
    transition: {
      type: "spling",
      duration: 0.2,
    },
  },
};

type Props = {
  splashDone: () => void;
};

function TimerSplash({ splashDone }: Props) {
  const [count, setCount] = useState(3);
  const intervalRef = useRef<any>(null);
  const countRef = useRef<number>(3);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      countRef.current -= 1;
      if (0 < countRef.current) {
        setCount(countRef.current);
      } else {
        clearInterval(intervalRef.current);
        splashDone();
      }
    }, 1000);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="flex-center w-full h-full">
      <div className="flex">
        <motion.h4
          key={count}
          variants={textVariants}
          initial="normal"
          animate="animate"
          exit="exit"
          className="z-30 h-full w-full text-white font-black text-8xl italic leading-tight tracking-wide"
        >
          {count}
        </motion.h4>
      </div>
      <motion.div variants={imgVariants} initial="normal" animate="animate">
        <Image
          className="absolute opacity-70"
          fill
          src={StartBackgound}
          alt="start 배경"
        />
      </motion.div>
    </div>
  );
}

export default TimerSplash;
