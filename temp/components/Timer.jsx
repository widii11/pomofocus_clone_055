"use client";
import React, { useEffect, useRef, useState } from "react";

const DEFAULTS = {
  pomodoro: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 15 * 60,
};

export default function Timer({ mode, onSessionComplete }) {
  const [timeLeft, setTimeLeft] = useState(DEFAULTS[mode]);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  // set time on mode change
  useEffect(() => {
    setTimeLeft(DEFAULTS[mode]);
    setRunning(false);
    clearInterval(intervalRef.current);
  }, [mode]);

  // start/stop interval
  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((t) => (t > 0 ? t - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [running]);

  // when time hits 0
  useEffect(() => {
    if (timeLeft === 0) {
      setRunning(false);
      clearInterval(intervalRef.current);
      // notify parent on pomodoro complete
      if (mode === "pomodoro" && typeof onSessionComplete === "function") {
        onSessionComplete();
      }
      // play tiny beep (may be blocked by browser until user interacts)
      try {
        const audio = new Audio(
          "data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAESsAACJWAAACABAAZGF0YQgAAAAA"
        );
        audio.play().catch(() => {});
      } catch (e) {}
    }
  }, [timeLeft, mode, onSessionComplete]);

  function formatTime(sec) {
    const m = Math.floor(sec / 60)
      .toString()
      .padStart(2, "0");
    const s = (sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  }

  function start() {
    if (timeLeft <= 0) setTimeLeft(DEFAULTS[mode]);
    setRunning(true);
  }
  function pause() {
    setRunning(false);
    clearInterval(intervalRef.current);
  }
  function reset() {
    setRunning(false);
    clearInterval(intervalRef.current);
    setTimeLeft(DEFAULTS[mode]);
  }

  return (
    <div className="text-center mb-4">
      <div className="text-6xl font-mono mb-3">{formatTime(timeLeft)}</div>
      <div className="flex justify-center gap-3">
        <button
          className="px-4 py-2 rounded-lg bg-green-400 text-white font-semibold"
          onClick={start}
        >
          Start
        </button>
        <button
          className="px-4 py-2 rounded-lg bg-yellow-300 font-semibold"
          onClick={pause}
        >
          Pause
        </button>
        <button
          className="px-4 py-2 rounded-lg bg-gray-200 font-semibold"
          onClick={reset}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
