"use client";
import React from "react";

export default function ModeButtons({ mode, setMode }) {
  return (
    <div className="flex justify-center gap-3 mb-4">
      <button
        className={`px-4 py-2 rounded-lg font-medium ${
          mode === "pomodoro" ? "bg-pomodo-btn text-white" : "bg-transparent"
        }`}
        onClick={() => setMode("pomodoro")}
      >
        Pomodoro
      </button>

      <button
        className={`px-4 py-2 rounded-lg font-medium ${
          mode === "shortBreak" ? "bg-short-btn text-white" : "bg-transparent"
        }`}
        onClick={() => setMode("shortBreak")}
      >
        Short Break
      </button>

      <button
        className={`px-4 py-2 rounded-lg font-medium ${
          mode === "longBreak" ? "bg-long-btn text-white" : "bg-transparent"
        }`}
        onClick={() => setMode("longBreak")}
      >
        Long Break
      </button>
    </div>
  );
}
