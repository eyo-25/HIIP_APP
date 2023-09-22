import { useEffect } from "react";

const useOnClickOutside = (
  ref: React.RefObject<HTMLElement>,
  handler: () => void
) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      } else {
        handler();
      }
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
  }, [ref, handler]);
};

export default useOnClickOutside;
