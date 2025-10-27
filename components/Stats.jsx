"use client";
import React from "react";

export default function Stats({ stats, resetStats, demoAdd }) {
  return (
    <section>
      <h2 className="text-lg font-semibold mb-2">Stats</h2>
      <div className="bg-gray-50 p-3 rounded-md">
        <p>
          Sessions completed: <strong>{stats.sessionsCompleted}</strong>
        </p>
        <p>
          Total focus minutes: <strong>{stats.totalFocusMinutes}</strong>
        </p>

        <div className="mt-3 flex gap-2">
          <button
            className="px-3 py-2 rounded-lg bg-red-300 text-white"
            onClick={resetStats}
          >
            Reset Stats
          </button>
          <button
            className="px-3 py-2 rounded-lg bg-gray-200"
            onClick={demoAdd}
          >
            +Demo Session
          </button>
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-500">
        Tip: setiap kali sesi Pomodoro selesai, stats akan bertambah.
      </div>
    </section>
  );
}
