import { useState, useRef, useCallback } from "react";

export const useCounter = () => {
  const [count, setCount] = useState(0);
  const countRef = useRef<number>(0);
  const intervalRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const start = useCallback(() => {
    intervalRef.current = setInterval(() => {
      if (intervalRef.current === undefined) return;
      if (0 < countRef.current) {
        countRef.current -= 1;
        setCount(countRef.current);
      } else if (countRef.current < 0) {
        clearInterval(intervalRef.current);
      }
    }, 1000);
  }, []);

  const stop = useCallback(() => {
    if (intervalRef.current === undefined) return;
    clearInterval(intervalRef.current);
  }, []);

  const reset = useCallback((resetCount: number) => {
    countRef.current = resetCount;
    setCount(countRef.current);
    if (intervalRef.current !== undefined) {
      clearInterval(intervalRef.current);
    }
  }, []);

  const done = useCallback(() => {
    countRef.current = 0;
    setCount(countRef.current);
    clearInterval(intervalRef.current);
  }, []);

  return { count, start, stop, reset, done };
};
