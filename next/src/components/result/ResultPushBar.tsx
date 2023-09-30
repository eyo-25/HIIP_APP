import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  isSuccess: boolean;
};

function ResultPushBar({ isSuccess }: Props) {
  const [startX, setStartX] = useState(0);
  const [distanceX, setDistanceX] = useState(0);
  const [isPushed, setIsPushed] = useState(false);
  const router = useRouter();

  const handleMouseDown = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setIsPushed(true);
    setDistanceX(0);
    setStartX(e.clientX);
  };
  const handleMouseUp = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (170 < e.clientX - startX) {
      console.log("많이 밈");
      router.push("/");
    }
    setIsPushed(false);
    setDistanceX(0);
    setStartX(0);
  };
  const handleMouseMove = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (isPushed) {
      setDistanceX(e.clientX - startX);
    }
  };
  const handleMouseLeave = () => {
    if (isPushed) {
      if (170 < distanceX - startX) {
        console.log("많이 밈!");
        router.push("/");
      }
      setDistanceX(0);
      setIsPushed(false);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPushed(true);
    setStartX(e.changedTouches[0].pageX);
  };
  const handleTouchEnd = () => {
    if (180 < distanceX) {
      console.log("모바일 많이밈");
      router.push("/");
    }
    setIsPushed(false);
    setStartX(0);
    setDistanceX(0);
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    if (isPushed) {
      if (300 < distanceX) {
        console.log("모바일 많이밈!");
        router.push("/");
      } else {
        setDistanceX(e.changedTouches[0].pageX - startX);
      }
    }
  };

  return (
    <div
      className={`relative overflow-hidden flex-center h-[12%] w-full rounded-md shadow-lg bg-gradient-to-r from-black from-10% via-black via-55% ${
        isSuccess ? "to-blue" : "to-red"
      } to-90%`}
    >
      <div
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchEnd={handleTouchEnd}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        className={`absolute cursor-grab mx-10pxr flex-center top-[13%] bottom-[13% w-[18%] h-[74%] border rounded-md ${
          isPushed ? "text-black bg-white" : "text-white"
        }`}
        style={{ left: `${distanceX}px` }}
      >
        홈
      </div>
      {!isPushed && <p className="text-gray-800">밀어서 인터벌 결과적용</p>}
    </div>
  );
}

export default ResultPushBar;
