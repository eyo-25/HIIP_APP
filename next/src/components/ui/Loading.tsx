import { LoadingBlack, LoadingWhite } from "@/comman/assets";
import Image from "next/image";

type Props = {
  size?: number;
  color?: "white" | "black";
};

function LoadingSpinner({ size = 50, color = "white" }: Props) {
  return (
    <div className="z-30 flex-center w-full h-full">
      <Image
        width={size}
        src={color === "white" ? LoadingWhite : LoadingBlack}
        alt="로딩 이미지"
      />
    </div>
  );
}

export default LoadingSpinner;
