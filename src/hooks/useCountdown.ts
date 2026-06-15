"use client";
// 📍 src/hooks/useCountdown.ts

import { useState, useRef, useCallback } from "react";

interface CountdownOptions {
  from?: number;
  onTick?: (count: number) => void;
  onComplete?: () => void;
}

interface UseCountdownReturn {
  count: number;
  isRunning: boolean;
  start: (options?: CountdownOptions) => void;
  cancel: () => void;
  reset: () => void;
}

export function useCountdown(): UseCountdownReturn {
  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const onTickRef = useRef<((count: number) => void) | undefined>(undefined);
  const onCompleteRef = useRef<(() => void) | undefined>(undefined);

  const cancel = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsRunning(false);
  }, []);

  const reset = useCallback(() => {
    cancel();
    setCount(0);
  }, [cancel]);

  const start = useCallback(
    (options: CountdownOptions = {}) => {
      const { from = 3, onTick, onComplete } = options;
      cancel();

      onTickRef.current = onTick;
      onCompleteRef.current = onComplete;

      setCount(from);
      setIsRunning(true);
      onTick?.(from);

      intervalRef.current = setInterval(() => {
        setCount((prev) => {
          const next = prev - 1;

          if (next <= 0) {
            if (intervalRef.current) clearInterval(intervalRef.current);
            setIsRunning(false);
            setTimeout(() => onCompleteRef.current?.(), 0);
            return 0;
          }

          setTimeout(() => onTickRef.current?.(next), 0);
          return next;
        });
      }, 1000);
    },
    [cancel],
  );

  return { count, isRunning, start, cancel, reset };
}
