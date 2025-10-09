"use client";

import { useEffect, useRef } from "react";
import { useSettings } from "@/contexts/settings-context";

const tracks: Record<string, string> = {
  mystical: "/audio/mystical.mp3",
  ancient: "/audio/ancient.mp3",
  ethereal: "/audio/ethereal.mp3",
  dark: "/audio/dark.mp3",
};

export function GlobalAudioPlayer() {
  const { settings } = useSettings();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Load the chosen track
    if (settings.musicTrack && tracks[settings.musicTrack]) {
      audio.src = tracks[settings.musicTrack];
    }

    // Volume and mute
    audio.volume = settings.muted ? 0 : settings.volume / 100;

    // Play or pause
    if (settings.musicPlaying && settings.musicTrack) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  }, [
    settings.musicTrack,
    settings.musicPlaying,
    settings.volume,
    settings.muted,
  ]);

  return (
    <audio ref={audioRef} loop preload="auto" style={{ display: "none" }} />
  );
}
