import { AiOutlinePlus } from "react-icons/ai";

export default function MetaButton() {
  return (
    <div className="fixed flex mx-auto left-0pxr right-0pxr bottom-[14%] z-20 w-86pxr h-86pxr">
      <button className="bg-black rounded-full flex-center w-full h-full">
        <AiOutlinePlus className="text-white w-[50%] h-[50%]" />
      </button>
    </div>
  );
}
