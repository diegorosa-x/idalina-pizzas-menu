"use client";

import React from "react";
import { useTheme } from "@/lib/useTheme";

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme, mounted } = useTheme();
  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Ativar tema claro" : "Ativar tema escuro"}
      aria-pressed={isDark}
      className="
        group relative inline-flex h-10 w-[92px] items-center rounded-full
        border border-stone-200 bg-white/70 px-1
        shadow-sm backdrop-blur
        transition-all duration-300
        hover:shadow-md
        dark:border-stone-700 dark:bg-stone-900/60
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-400
        dark:focus-visible:ring-stone-500
      "
    >
      {/* trilho "ativo" */}
      <span
        className="
          absolute inset-0 rounded-full
          bg-gradient-to-r from-amber-200/40 to-sky-200/40
          opacity-0 transition-opacity duration-300
          group-hover:opacity-100
          dark:from-indigo-500/20 dark:to-fuchsia-500/20
        "
      />

      {/* labels */}
      <span className="relative flex w-full items-center justify-between px-3 text-[12px] font-medium">
        <span
          className={`
    pointer-events-none absolute top-1/2 -translate-y-1/2
    text-[12px] font-medium transition-all duration-300
    ${isDark ? "right-8 text-white" : "left-10 text-white"}
  `}
        >
          {isDark ? "Escuro" : "Claro"}
        </span>
      </span>

      {/* knob */}
      <span
        className={`
          absolute top-1/2 h-8 w-8 -translate-y-1/2 rounded-full
          bg-white shadow-sm ring-1 ring-stone-200
          transition-all duration-300 ease-out
          dark:bg-stone-950 dark:ring-stone-700
          ${isDark ? "translate-x-[52px]" : "translate-x-1"}
        `}
      >
        {/* ícone */}
        <span className="grid h-full w-full place-items-center text-[14px]">
          {isDark ? "🌙" : "☀️"}
        </span>
      </span>
    </button>
  );
};

export default ThemeToggle;
