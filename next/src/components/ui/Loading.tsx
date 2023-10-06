import { LoadingBlack, LoadingWhite } from "@/comman/assets";
import Image from "next/image";

type Props = {
  size?: number;
  color?: "white" | "black";
  text?: string;
};

function LoadingSpinner({ size = 50, color = "white", text }: Props) {
  return (
    <div className="flex flex-col z-30 flex-center w-full h-full">
      <Image
        width={size}
        src={color === "white" ? LoadingWhite : LoadingBlack}
        alt="로딩 이미지"
      />
      {text && <p className="text-white font-medium">{text}</p>}
    </div>
  );
}

export default LoadingSpinner;
