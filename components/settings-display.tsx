"use client";

import { useSettings } from "@/contexts/settings-context";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export function SettingsDisplay() {
  const { allSettings } = useSettings();
  const [isVisible, setIsVisible] = useState(false);

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 right-4 z-50 rounded-full bg-purple-900/80 p-3 text-purple-200 shadow-lg backdrop-blur-sm transition-all hover:bg-purple-800/80 hover:shadow-purple-500/30"
        title="Show Settings Object"
      >
        <Eye className="h-5 w-5" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 max-h-[80vh] w-96 overflow-auto rounded-lg border border-purple-700/50 bg-purple-950/95 p-4 shadow-2xl backdrop-blur-sm">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-serif text-lg text-amber-400">Settings Object</h3>
        <button
          onClick={() => setIsVisible(false)}
          className="rounded p-1 text-purple-300 transition-colors hover:bg-purple-900/50 hover:text-purple-200"
          title="Hide Settings Object"
        >
          <EyeOff className="h-5 w-5" />
        </button>
      </div>
      <pre className="overflow-x-auto rounded bg-purple-900/50 p-3 text-xs text-purple-200">
        {JSON.stringify(allSettings, null, 2)}
      </pre>
      <p className="mt-2 text-xs italic text-purple-400">
        Updates in real-time as you change settings
      </p>
    </div>
  );
}
