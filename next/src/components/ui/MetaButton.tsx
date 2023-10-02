import { MetaButtonType } from "@/comman/types/type";
import { AiOutlinePlus } from "react-icons/ai";
import { IoPlaySharp } from "react-icons/io5";
import { AiOutlinePause } from "react-icons/ai";

type Props = {
  mode: MetaButtonType;
  style?: string;
  onClick?: () => void;
};

export default function MetaButton({ mode, style, onClick }: Props) {
  return (
    <div
      className={`fixed flex mx-auto left-0pxr right-0pxr bottom-[16%] z-20 w-86pxr h-86pxr ${style}`}
    >
      <button
        onClick={onClick}
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
      </button>
    </div>
  );
}
