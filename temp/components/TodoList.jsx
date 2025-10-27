"use client";
import React, { useEffect, useState } from "react";

export default function TodoList() {
  const [todos, setTodos] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("pomotodos")) || [];
    } catch {
      return [];
    }
  });
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    localStorage.setItem("pomotodos", JSON.stringify(todos));
  }, [todos]);

  function addTodo() {
    const text = newTask.trim();
    if (!text) return;
    setTodos((t) => [...t, { text, done: false }]);
    setNewTask("");
  }
  function toggleTodo(i) {
    setTodos((t) =>
      t.map((x, idx) => (idx === i ? { ...x, done: !x.done } : x))
    );
  }
  function deleteTodo(i) {
    setTodos((t) => t.filter((_, idx) => idx !== i));
  }

  return (
    <section>
      <h2 className="text-lg font-semibold mb-2">Todo</h2>
      <div className="flex gap-2">
        <input
          className="flex-1 px-3 py-2 rounded-lg border"
          placeholder="Tambah task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTodo()}
        />
        <button
          className="px-3 py-2 rounded-lg bg-indigo-400 text-white"
          onClick={addTodo}
        >
          Add
        </button>
      </div>

      <ul className="mt-3 max-h-48 overflow-y-auto space-y-2">
        {todos.length === 0 && (
          <li className="text-sm text-gray-500">Belum ada task.</li>
        )}
        {todos.map((t, i) => (
          <li
            key={i}
            className="flex items-center justify-between bg-gray-50 p-2 rounded-md"
          >
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={t.done}
                onChange={() => toggleTodo(i)}
              />
              <span className={t.done ? "line-through text-gray-400" : ""}>
                {t.text}
              </span>
            </div>
            <button
              className="text-sm text-red-500"
              onClick={() => deleteTodo(i)}
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
