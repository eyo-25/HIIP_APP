import { useState } from "react";

export function useMouseHandlers() {
  const [mouseDownClientY, setMouseDownClientY] = useState<number>(0);
  const [mouseUpClientY, setMouseUpClientY] = useState<number>(0);

  const handleMouseUp = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setMouseUpClientY(e.clientY);
  };
  const handleMouseDown = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setMouseDownClientY(e.clientY);
  };

  return { handleMouseUp, handleMouseDown, mouseUpClientY, mouseDownClientY };
}
