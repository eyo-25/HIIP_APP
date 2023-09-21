import { Dispatch, SetStateAction, useState } from "react";

export function useTouchHandlers(
  setIsWeekly: Dispatch<SetStateAction<boolean>>
) {
  const [tochedY, setTochedY] = useState<number>(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTochedY(e.changedTouches[0].pageY);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const distanceY = tochedY - e.changedTouches[0].pageY;

    if (distanceY < -30) {
      setIsWeekly(false);
    }
    if (distanceY > 30) {
      setIsWeekly(true);
    }
  };

  return { handleTouchStart, handleTouchEnd };
}
