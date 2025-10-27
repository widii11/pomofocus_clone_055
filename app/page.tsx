"use client";
import React, { useState, useEffect } from "react";

export default function Home() {
  const [mode, setMode] = useState<"pomodoro" | "short" | "long">("pomodoro");
  const [time, setTime] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [tasks, setTasks] = useState<string[]>([]);
  const [newTask, setNewTask] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [estPomodoro, setEstPomodoro] = useState(1);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning && time > 0) {
      timer = setTimeout(() => setTime(time - 1), 1000);
    } else if (isRunning && time === 0) {
      setIsRunning(false);
      alert("⏰ Waktu habis! Saatnya ganti mode.");
    }
    return () => clearTimeout(timer);
  }, [isRunning, time]);

  const formatTime = (t: number) => {
    const m = Math.floor(t / 60);
    const s = t % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const switchMode = (m: "pomodoro" | "short" | "long") => {
    setMode(m);
    setIsRunning(false);
    if (m === "pomodoro") setTime(25 * 60);
    if (m === "short") setTime(5 * 60);
    if (m === "long") setTime(15 * 60);
  };

  const addTask = () => {
    if (newTask.trim() === "") return;
    setTasks([...tasks, newTask]);
    setNewTask("");
  };

  const deleteTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center transition-all duration-500 ${
        mode === "pomodoro"
          ? "bg-[#F8B195]" // pastel merah
          : mode === "short"
          ? "bg-[#C8E6C9]" // pastel hijau
          : "bg-[#B3CDE0]" // pastel biru
      }`}
    >
      {/* === HEADER === */}
      <header className="flex justify-between items-center w-full max-w-4xl px-6 py-3 bg-white/40 backdrop-blur-md rounded-lg shadow-sm mt-6">
        <div className="flex items-center gap-2">
          <span className="text-2xl"></span>
          <h1 className="text-xl font-bold text-gray-800">Pomofocus</h1>
        </div>

        <div className="flex items-center gap-3">
          <button className="bg-white/60 hover:bg-white/80 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition">
            Report
          </button>
          <button className="bg-white/60 hover:bg-white/80 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition">
            Setting
          </button>
          <button className="bg-white/60 hover:bg-white/80 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition">
            Sign In
          </button>
          <button className="bg-white/60 hover:bg-white/80 px-3 py-2 rounded-lg text-sm transition">
            ⋮
          </button>
        </div>
      </header>

      {/* === MAIN CONTAINER === */}
      <div className="bg-white/80 backdrop-blur-md p-10 rounded-3xl shadow-xl w-[420px] text-center mt-10">
        {/* Mode Buttons */}
        <div className="flex justify-center mb-6 space-x-2">
          <button
            onClick={() => switchMode("pomodoro")}
            className={`px-4 py-2 rounded-xl font-semibold ${
              mode === "pomodoro"
                ? "bg-[#F67280] text-white"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            Pomodoro
          </button>
          <button
            onClick={() => switchMode("short")}
            className={`px-4 py-2 rounded-xl font-semibold ${
              mode === "short"
                ? "bg-[#81C784] text-white"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            Short Break
          </button>
          <button
            onClick={() => switchMode("long")}
            className={`px-4 py-2 rounded-xl font-semibold ${
              mode === "long"
                ? "bg-[#90CAF9] text-white"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            Long Break
          </button>
        </div>

        {/* Timer Display */}
        <div className="text-7xl font-bold mb-6 text-gray-700">
          {formatTime(time)}
        </div>

        {/* Start / Reset Buttons */}
        <div className="flex justify-center gap-4 mb-10">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="bg-[#F67280] text-white px-8 py-3 rounded-xl font-bold text-lg shadow hover:scale-105 transition"
          >
            {isRunning ? "PAUSE" : "START"}
          </button>
          <button
            onClick={() => {
              setIsRunning(false);
              setTime(
                mode === "pomodoro"
                  ? 25 * 60
                  : mode === "short"
                  ? 5 * 60
                  : 15 * 60
              );
            }}
            className="bg-gray-300 text-gray-700 px-5 py-3 rounded-xl font-semibold hover:bg-gray-400 transition"
          >
            RESET
          </button>
        </div>

        {/* Task Section */}
        <div className="text-left">
          <h2 className="text-lg font-semibold mb-3 text-gray-700">Tasks</h2>

          {!showForm ? (
            <button
              onClick={() => setShowForm(true)}
              className="w-full border-2 border-dashed border-gray-300 py-3 rounded-xl text-gray-500 hover:bg-gray-100 transition"
            >
              + Add Task
            </button>
          ) : (
            <div className="bg-white p-5 rounded-2xl shadow-md">
              <textarea
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="What are you working on?"
                className="w-full border-none outline-none text-gray-600 text-lg mb-4 resize-none placeholder-gray-400"
                rows={2}
              />

              <div className="mb-4">
                <p className="text-gray-600 font-medium mb-1">Est Pomodoros</p>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={1}
                    value={estPomodoro}
                    onChange={(e) => setEstPomodoro(parseInt(e.target.value))}
                    className="w-16 text-center border rounded-md py-1"
                  />
                  <div className="flex flex-col">
                    <button
                      onClick={() => setEstPomodoro(estPomodoro + 1)}
                      className="border rounded-t-md px-1"
                    >
                      ▲
                    </button>
                    <button
                      onClick={() =>
                        setEstPomodoro(Math.max(1, estPomodoro - 1))
                      }
                      className="border rounded-b-md px-1"
                    >
                      ▼
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex justify-between mt-4">
                <button
                  onClick={() => {
                    setShowForm(false);
                    setNewTask("");
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    addTask();
                    setShowForm(false);
                  }}
                  className="bg-gray-800 text-white px-5 py-2 rounded-lg hover:bg-gray-900"
                >
                  Save
                </button>
              </div>
            </div>
          )}

          <ul className="mt-4">
            {tasks.map((task, i) => (
              <li
                key={i}
                className="flex justify-between items-center bg-gray-100 px-4 py-2 mb-2 rounded-xl"
              >
                <span className="text-gray-700">
                  {task}{" "}
                  <span className="text-sm text-gray-500">(1 pomodoro)</span>
                </span>
                <button
                  onClick={() => deleteTask(i)}
                  className="text-red-500 font-bold hover:text-red-700"
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
