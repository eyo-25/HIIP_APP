import { Dispatch, SetStateAction, useEffect, useState } from "react";

export function useMouseHandlers(
  setIsTrue: Dispatch<SetStateAction<boolean>>,
  isTrue: boolean
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
    if (isTrue && distanceY < -20) {
      setIsTrue(false);
    }
    if (!isTrue && distanceY > 30) {
      setIsTrue(true);
    }
  }, [mouseUpClientY]);

  return { handleMouseUp, handleMouseDown };
}
