import { Dispatch, SetStateAction, useEffect, useState } from "react";

export function useMouseHandlers(
  setIsWeekly: Dispatch<SetStateAction<boolean>>,
  isWeekly: boolean
) {
  const [mouseDownClientY, setMouseDownClientY] = useState<number>(0);
  const [mouseUpClientY, setMouseUpClientY] = useState<number>(0);

  const handleMouseUp = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setMouseUpClientY(e.clientY);
  };
  const handleMouseDown = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setMouseDownClientY(e.clientY);
  };
  useEffect(() => {
    const distanceY = mouseDownClientY - mouseUpClientY;
    if (isWeekly && distanceY < -20) {
      setIsWeekly(false);
    }
    if (!isWeekly && distanceY > 30) {
      setIsWeekly(true);
    }
  }, [mouseUpClientY]);

  return { handleMouseUp, handleMouseDown };
}
