import { MetaButtonIconType } from "@/comman/types/type";
import { AiOutlinePlus } from "react-icons/ai";
import { IoPlaySharp } from "react-icons/io5";
import { AiOutlinePause } from "react-icons/ai";
import { motion } from "framer-motion";

type Props = {
  mode: MetaButtonIconType;
  move?: number;
  onClick?: () => void;
};

export default function MetaButton({ mode, move, onClick }: Props) {
  const buttonVarients = {
    click: { scale: 0.9 },
    normal: {
      opacity: 0,
      x: 0,
    },
    animate: {
      opacity: 1,
      x: move ? move : 0,
      transition: {
        duration: 0.7,
        type: "linear",
      },
    },
  };

  return (
    <div
      className={`fixed flex mx-auto left-0pxr right-0pxr bottom-[16%] z-20 w-86pxr h-86pxr`}
    >
      <motion.button
        initial="normal"
        animate="animate"
        onClick={onClick}
        variants={buttonVarients}
        whileTap="click"
        className={`rounded-full flex-center w-full h-full ${
          mode === "end" ? "bg-white" : "bg-black"
        }`}
      >
        {mode === "creat" && (
          <AiOutlinePlus className="text-white w-[50%] h-[50%]" />
        )}
        {mode === "play" && (
          <IoPlaySharp className="text-white ml-5pxr w-[50%] h-[50%]" />
        )}
        {mode === "pause" && (
          <AiOutlinePause className="text-white w-[50%] h-[50%]" />
        )}
        {mode === "end" && <div className="bg-black w-[27%] h-[27%]"></div>}
      </motion.button>
    </div>
  );
}
