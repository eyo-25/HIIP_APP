import { MetaButtonType } from "@/comman/types/type";
import { AiOutlinePlus } from "react-icons/ai";

type Props = {
  mode: MetaButtonType;
};

export default function MetaButton({ mode }: Props) {
  return (
    <div className="fixed flex mx-auto left-0pxr right-0pxr bottom-[14%] z-20 w-86pxr h-86pxr">
      <button className="bg-black rounded-full flex-center w-full h-full">
        {mode === "creat" && (
          <AiOutlinePlus className="text-white w-[50%] h-[50%]" />
        )}
      </button>
    </div>
  );
}
