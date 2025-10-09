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
import {
  getUserSettings,
  updateUserSettings,
  initializeDefaultSettings,
} from "@/lib/firebaseUserSettings";
import { useAuth } from "./auth-context";
import { UserSettings } from "@/lib/types";

const DEFAULT_SETTINGS: UserSettings = {
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
  settings: UserSettings;
  updateSettings: (updates: Partial<UserSettings>) => void;
  audioRef: React.RefObject<HTMLAudioElement>;
  playSound: (soundType: string) => void;
  isMobile: boolean;
  allSettings: UserSettings;
}

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined
);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<UserSettings>(DEFAULT_SETTINGS);
  const [isClient, setIsClient] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [firebaseLoaded, setFirebaseLoaded] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { currentUser } = useAuth();

  // Detect client and device type
  useEffect(() => {
    setIsClient(true);
    const checkMobile = () =>
      setIsMobile(window.innerWidth < 1024 || "ontouchstart" in window);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Load settings when user is ready
  useEffect(() => {
    if (!currentUser) return; // Wait until user is known

    const loadSettings = async () => {
      try {
        const firebaseSettings = await getUserSettings(currentUser);
        if (firebaseSettings) {
          setSettings({ ...DEFAULT_SETTINGS, ...firebaseSettings });
          console.log("[Firebase] Settings loaded:", firebaseSettings);
        } else {
          console.log("[Firebase] No settings found, initializing defaults.");
          await initializeDefaultSettings(currentUser);
        }
      } catch (err) {
        console.error("[Firebase] Failed to load settings:", err);
        const stored = localStorage.getItem("eternal-letters-settings");
        if (stored) setSettings({ ...DEFAULT_SETTINGS, ...JSON.parse(stored) });
      } finally {
        setFirebaseLoaded(true);
      }
    };

    loadSettings();
  }, [currentUser]);

  // handle background audio
  useEffect(() => {
    if (!audioRef.current || !isClient) return

    const audio = audioRef.current

    if (settings.musicTrack) {
      audio.src = `/audio/${settings.musicTrack}.mp3`
      audio.volume = settings.volume / 100
      audio.muted = settings.muted
      audio.loop = true

      if (settings.musicPlaying) {
        audio.play().catch((err) => {
          console.log("[v0] Audio autoplay blocked, user interaction required:", err)
        })
      } else {
        audio.pause()
      }
    }
  }, [settings.musicTrack, settings.musicPlaying, isClient])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = settings.volume / 100
      audioRef.current.muted = settings.muted
    }
  }, [settings.volume, settings.muted])

  // Persist settings after load
  useEffect(() => {
    if (isClient && firebaseLoaded && currentUser) {
      localStorage.setItem(
        "eternal-letters-settings",
        JSON.stringify(settings)
      );
      updateUserSettings(currentUser, settings)
        .then(() => console.log("[Firebase] Settings updated"))
        .catch((e) => console.error("[Firebase] Failed to sync settings:", e));
    }
  }, [settings, isClient, firebaseLoaded, currentUser]);

  // Apply font dynamically
  useEffect(() => {
    if (isClient) {
      document.documentElement.style.setProperty(
        "--handwritten-font",
        settings.font
      );
    }
  }, [settings.font, isClient]);

  // Apply other reactive UI variables
  useEffect(() => {
    if (isClient) {
      document.documentElement.style.setProperty(
        "--dark-intensity",
        (settings.darkModeIntensity / 100).toString()
      );
    }
  }, [settings.darkModeIntensity, isClient]);

  useEffect(() => {
    if (isClient) {
      const accents: Record<
        string,
        { primary: string; light: string; dark: string }
      > = {
        amber: { primary: "#f59e0b", light: "#fbbf24", dark: "#d97706" },
        blue: { primary: "#3b82f6", light: "#60a5fa", dark: "#2563eb" },
        red: { primary: "#dc2626", light: "#ef4444", dark: "#b91c1c" },
        emerald: { primary: "#10b981", light: "#34d399", dark: "#059669" },
        purple: { primary: "#a855f7", light: "#c084fc", dark: "#9333ea" },
      };
      const colors = accents[settings.themeAccent] || accents.amber;
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
    }
  }, [settings.themeAccent, isClient]);

  // Cursor & text scale
  useEffect(() => {
    if (isClient && !isMobile) {
      document.documentElement.setAttribute(
        "data-cursor-style",
        settings.cursorStyle
      );
    }
  }, [settings.cursorStyle, isClient, isMobile]);

  useEffect(() => {
    if (isClient) {
      document.documentElement.style.setProperty(
        "--text-scale",
        `${settings.textSize / 100}`
      );
    }
  }, [settings.textSize, isClient]);

  const updateSettings = (updates: Partial<UserSettings>) => {
    setSettings((prev) => ({ ...prev, ...updates }));
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
    // Placeholder for future sound logic
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
  if (!context)
    throw new Error("useSettings must be used within SettingsProvider");
  return context;
}
