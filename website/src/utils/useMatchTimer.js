import { useEffect, useRef, useState } from "react";

const MATCH_TIMER_KEY = "matchTimerStart";

export function useMatchTimer() {
  const [startTimestamp, setStartTimestamp] = useState(null);
  const [elapsedMs, setElapsedMs] = useState(0);
  const intervalRef = useRef(null);

  // Initialize from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(MATCH_TIMER_KEY);
    if (stored) {
      const ts = parseInt(stored, 10);
      if (!Number.isNaN(ts)) {
        setStartTimestamp(ts);
        setElapsedMs(Date.now() - ts);
      }
    }
  }, []);

  // Drive the ticking timer whenever we have a start timestamp
  useEffect(() => {
    if (!startTimestamp) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      setElapsedMs(Date.now() - startTimestamp);
    }, 100);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [startTimestamp]);

  const start = () => {
    if (startTimestamp) return;
    const now = Date.now();
    setStartTimestamp(now);
    setElapsedMs(0);
    localStorage.setItem(MATCH_TIMER_KEY, String(now));
  };

  const reset = () => {
    setStartTimestamp(null);
    setElapsedMs(0);
    localStorage.removeItem(MATCH_TIMER_KEY);
  };

  const elapsedSeconds = elapsedMs / 1000;

  return {
    timerStarted: !!startTimestamp,
    elapsedMs,
    elapsedSeconds,
    start,
    reset,
  };
}

export function clearMatchTimerStorage() {
  localStorage.removeItem(MATCH_TIMER_KEY);
}

