"use client";

import type React from "react";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  type ReactNode,
} from "react";

export interface Settings {
  font: string;
  musicTrack: string | null;
  musicPlaying: boolean;
  volume: number;
  muted: boolean;
  particleEffects: boolean;
  cursorTrail: boolean;
  soundEffects: boolean;
  candleFlicker: boolean;
  themeAccent: string;
  dynamicBackground: string;
  cursorStyle: string;
  darkModeIntensity: number;
  runeSeals: boolean;
  scrollAnimation: boolean;
  hapticFeedback: boolean;
  reducedMotion: boolean;
  themePreset: string;
  textSize: number;
}

const DEFAULT_SETTINGS: Settings = {
  font: "Cinzel, serif",
  musicTrack: null,
  musicPlaying: false,
  volume: 50,
  muted: false,
  particleEffects: false,
  cursorTrail: false,
  soundEffects: false,
  candleFlicker: false,
  themeAccent: "amber",
  dynamicBackground: "none",
  cursorStyle: "default",
  darkModeIntensity: 50,
  runeSeals: false,
  scrollAnimation: false,
  hapticFeedback: true,
  reducedMotion: false,
  themePreset: "default",
  textSize: 100,
};

interface SettingsContextType {
  settings: Settings;
  updateSettings: (updates: Partial<Settings>) => void;
  audioRef: React.RefObject<HTMLAudioElement>;
  playSound: (soundType: string) => void;
  isMobile: boolean;
  allSettings: Settings;
}

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined
);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [isClient, setIsClient] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    setIsClient(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024 || "ontouchstart" in window);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Load settings from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("eternal-letters-settings");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setSettings({ ...DEFAULT_SETTINGS, ...parsed });
      } catch (e) {
        console.error("[v0] Failed to parse settings:", e);
      }
    }
  }, []);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    if (isClient) {
      localStorage.setItem(
        "eternal-letters-settings",
        JSON.stringify(settings)
      );
      console.log("[v0] Settings updated:", settings);
    }
  }, [settings, isClient]);

  // Apply font globally
  useEffect(() => {
    if (isClient) {
      document.documentElement.style.setProperty(
        "--font-custom",
        settings.font
      );
    }
  }, [settings.font, isClient]);

  // Apply dark mode intensity
  useEffect(() => {
    if (isClient) {
      const intensity = settings.darkModeIntensity / 100;
      document.documentElement.style.setProperty(
        "--dark-intensity",
        intensity.toString()
      );
    }
  }, [settings.darkModeIntensity, isClient]);

  useEffect(() => {
    if (isClient) {
      const accentColors: {
        [key: string]: { primary: string; light: string; dark: string };
      } = {
        amber: { primary: "#f59e0b", light: "#fbbf24", dark: "#d97706" },
        blue: { primary: "#3b82f6", light: "#60a5fa", dark: "#2563eb" },
        red: { primary: "#dc2626", light: "#ef4444", dark: "#b91c1c" },
        emerald: { primary: "#10b981", light: "#34d399", dark: "#059669" },
        purple: { primary: "#a855f7", light: "#c084fc", dark: "#9333ea" },
      };

      const colors = accentColors[settings.themeAccent] || accentColors.amber;

      // Apply multiple CSS variables for comprehensive theming
      document.documentElement.style.setProperty(
        "--theme-accent",
        colors.primary
      );
      document.documentElement.style.setProperty(
        "--theme-accent-light",
        colors.light
      );
      document.documentElement.style.setProperty(
        "--theme-accent-dark",
        colors.dark
      );
      document.documentElement.setAttribute(
        "data-theme-accent",
        settings.themeAccent
      );

      console.log("[v0] Theme accent applied:", settings.themeAccent, colors);
    }
  }, [settings.themeAccent, isClient]);

  // Apply cursor style
  useEffect(() => {
    if (isClient && !isMobile) {
      document.documentElement.setAttribute(
        "data-cursor-style",
        settings.cursorStyle
      );
    }
  }, [settings.cursorStyle, isClient, isMobile]);

  // Apply text size
  useEffect(() => {
    if (isClient) {
      document.documentElement.style.setProperty(
        "--text-scale",
        `${settings.textSize / 100}`
      );
    }
  }, [settings.textSize, isClient]);

  // Apply theme presets
  useEffect(() => {
    if (isClient && settings.themePreset !== "default") {
      const presets: { [key: string]: Partial<Settings> } = {
        minimal: {
          particleEffects: false,
          cursorTrail: false,
          candleFlicker: false,
          dynamicBackground: "none",
        },
        immersive: {
          particleEffects: true,
          cursorTrail: true,
          candleFlicker: true,
          dynamicBackground: "embers",
        },
        performance: {
          particleEffects: false,
          cursorTrail: false,
          candleFlicker: false,
          dynamicBackground: "none",
          reducedMotion: true,
        },
      };

      if (presets[settings.themePreset]) {
        setSettings((prev) => ({ ...prev, ...presets[settings.themePreset] }));
      }
    }
  }, [settings.themePreset, isClient]);

  useEffect(() => {
    if (!audioRef.current || !isClient) return;

    const audio = audioRef.current;

    if (settings.musicTrack) {
      audio.src = `/audio/${settings.musicTrack}.mp3`;
      audio.volume = settings.volume / 100;
      audio.muted = settings.muted;
      audio.loop = true;

      if (settings.musicPlaying) {
        audio.play().catch((err) => {
          console.log(
            "[v0] Audio autoplay blocked, user interaction required:",
            err
          );
        });
      } else {
        audio.pause();
      }
    }
  }, [settings.musicTrack, settings.musicPlaying, isClient]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = settings.volume / 100;
      audioRef.current.muted = settings.muted;
    }
  }, [settings.volume, settings.muted]);

  const updateSettings = (updates: Partial<Settings>) => {
    setSettings((prev) => {
      const newSettings = { ...prev, ...updates };
      console.log("[v0] Setting changed:", updates);
      return newSettings;
    });

    if (
      isMobile &&
      updates &&
      settings.hapticFeedback &&
      "vibrate" in navigator
    ) {
      navigator.vibrate(10);
    }
  };

  const playSound = (soundType: string) => {
    if (!settings.soundEffects || !isClient) return;
    // User needs to add actual MP3 files to /public/sounds/
  };

  return (
    <SettingsContext.Provider
      value={{
        settings,
        updateSettings,
        audioRef,
        playSound,
        isMobile,
        allSettings: settings,
      }}
    >
      <audio ref={audioRef} />
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within SettingsProvider");
  }
  return context;
}
