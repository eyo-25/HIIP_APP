import { MetaButtonIconType } from "@/comman/types/type";
import { AiOutlinePlus } from "react-icons/ai";
import { IoPlaySharp } from "react-icons/io5";
import { AiOutlinePause } from "react-icons/ai";
import { motion } from "framer-motion";

const buttonData = {
  creat: {
    label: "생성",
    icon: <AiOutlinePlus className="text-white w-[50%] h-[50%]" />,
  },
  play: {
    label: "재생",
    icon: <IoPlaySharp className="text-white ml-5pxr w-[50%] h-[50%]" />,
  },
  pause: {
    label: "일시 정지",
    icon: <AiOutlinePause className="text-white w-[50%] h-[50%]" />,
  },
  end: {
    label: "종료",
    icon: <div className="bg-black w-[27%] h-[27%]"></div>,
  },
};

type Props = {
  mode: MetaButtonIconType;
  move?: number;
  onClick?: () => void;
};

function MetaButton({ mode, move, onClick }: Props) {
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
        duration: 0.8,
        type: "linear",
      },
    },
  };

  return (
    <div
      className={`fixed flex mx-auto left-0pxr right-0pxr bottom-[14%] desktop:bottom-[15%] z-20 w-80pxr h-80pxr desktop:w-88pxr desktop:h-88pxr`}
    >
      <motion.button
        title={buttonData[mode].label}
        initial="normal"
        animate="animate"
        onClick={onClick}
        variants={buttonVarients}
        whileTap="click"
        className={`rounded-full flex-center w-full h-full ${
          mode === "end" ? "bg-white" : "bg-black"
        }`}
      >
        {buttonData[mode].icon}
      </motion.button>
    </div>
  );
}

export default MetaButton;
