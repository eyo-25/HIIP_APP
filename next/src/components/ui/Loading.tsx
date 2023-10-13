import { LoadingDiamond, LoadingWhite } from "@/comman/assets";
import Image from "next/image";

type Props = {
  color?: "white" | "black";
  text?: string;
  type?: "normal" | "diamond";
};

function LoadingSpinner({ color = "white", text, type = "normal" }: Props) {
  return (
    <div className="flex flex-col z-30 flex-center w-full h-full">
      <div
        className={`flex-center w-53pxr h-53pxr rounded-lg ${
          type === "normal" && "bg-black"
        }`}
      >
        <Image
          width={45}
          src={type === "normal" ? LoadingWhite : LoadingDiamond}
          alt="로딩 이미지"
        />
      </div>
      {text && (
        <p className="font-medium mt-3pxr text-sm" style={{ color: color }}>
          {text}
        </p>
      )}
    </div>
  );
}

export default LoadingSpinner;
