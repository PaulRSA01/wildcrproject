"use client";

import { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "@/components/site/icons";

const STORAGE_KEY = "eco-pulse-theme";

/**
 * Day/night toggle. The actual class swap on <html> happens here and in the
 * blocking inline script in app/layout.tsx (which runs before paint so the
 * correct theme is already set by the time this component mounts — this
 * just reads that state back into React and re-applies it on click).
 */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
    setMounted(true);
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem(STORAGE_KEY, next ? "dark" : "light");
    } catch {
      // localStorage unavailable (private mode, blocked) — theme just won't persist
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to day view" : "Switch to night view"}
      aria-pressed={dark}
      title={dark ? "Day view" : "Night view"}
      className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-opacity hover:opacity-70 ${className}`}
    >
      {/* Avoid rendering the wrong icon before hydration settles */}
      <span className={mounted ? "contents" : "hidden"}>
        {dark ? <SunIcon width={19} height={19} /> : <MoonIcon width={19} height={19} />}
      </span>
    </button>
  );
}
