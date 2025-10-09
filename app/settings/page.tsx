"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Flame,
  Check,
  RotateCcw,
  Smartphone,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Shuffle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ScrollEdge } from "@/components/scroll-edge";
import { useSettings } from "@/contexts/settings-context";

const FANTASY_FONTS = [
  {
    name: "Cinzel",
    value: "Cinzel, serif",
    preview: "The Ancient Scrolls Await",
  },
  {
    name: "Uncial Antiqua",
    value: "Uncial Antiqua, cursive",
    preview: "Mystical Runes of Old",
  },
  {
    name: "MedievalSharp",
    value: "MedievalSharp, cursive",
    preview: "Tales of Forgotten Realms",
  },
  {
    name: "IM Fell English",
    value: "IM Fell English, serif",
    preview: "Chronicles of the Eternal Flame",
  },
  {
    name: "Pirata One",
    value: "Pirata One, cursive",
    preview: "Legends Written in Fire",
  },
  {
    name: "Almendra",
    value: "Almendra, serif",
    preview: "Whispers from the Void",
  },
  {
    name: "Cormorant Garamond",
    value: "Cormorant Garamond, serif",
    preview: "Sacred Words of Power",
  },
  {
    name: "Spectral",
    value: "Spectral, serif",
    preview: "Ethereal Messages Beyond",
  },
  {
    name: "Crimson Text",
    value: "Crimson Text, serif",
    preview: "Blood Oaths and Promises",
  },
  {
    name: "Libre Baskerville",
    value: "Libre Baskerville, serif",
    preview: "Timeless Wisdom Preserved",
  },
];

const MUSIC_TRACKS = [
  { id: "mystical", title: "Mystical Whispers", category: "ambient" },
  { id: "ancient", title: "Ancient Echoes", category: "mystical" },
  { id: "ethereal", title: "Ethereal Dreams", category: "calm" },
  { id: "dark", title: "Dark Sanctuary", category: "mystical" },
];

const THEME_ACCENTS = [
  { id: "amber", name: "Eternal Flame", color: "bg-amber-500", hex: "#f59e0b" },
  { id: "blue", name: "Ethereal Blue", color: "bg-blue-500", hex: "#3b82f6" },
  { id: "red", name: "Obsidian Red", color: "bg-red-600", hex: "#dc2626" },
  {
    id: "emerald",
    name: "Mystic Emerald",
    color: "bg-emerald-500",
    hex: "#10b981",
  },
  {
    id: "purple",
    name: "Shadow Violet",
    color: "bg-purple-500",
    hex: "#a855f7",
  },
];

const DYNAMIC_BACKGROUNDS = [
  { id: "none", name: "None", description: "Pure darkness" },
  {
    id: "embers",
    name: "Floating Embers",
    description: "Rising sparks of flame",
  },
  { id: "fog", name: "Moving Fog", description: "Ethereal mist" },
  { id: "stars", name: "Starfield", description: "Twinkling cosmos" },
  { id: "aurora", name: "Aurora Mystica", description: "Shifting lights" },
  { id: "fireflies", name: "Spirit Lights", description: "Glowing orbs" },
];

const CURSOR_STYLES = [
  { id: "default", name: "Default", description: "Standard cursor" },
  { id: "rune", name: "Glowing Rune", description: "Mystical symbol" },
  { id: "flame", name: "Eternal Flame", description: "Burning cursor" },
  { id: "orb", name: "Golden Orb", description: "Radiant sphere" },
  { id: "cross", name: "Sacred Cross", description: "Holy symbol" },
];

const THEME_PRESETS = [
  { id: "default", name: "Default", description: "Balanced experience" },
  { id: "minimal", name: "Minimal", description: "Clean and simple" },
  { id: "immersive", name: "Immersive", description: "Full effects" },
  { id: "performance", name: "Performance", description: "Optimized speed" },
];

export default function SettingsPage() {
  const { settings, updateSettings, audioRef, playSound, isMobile } =
    useSettings();
  const [previewFont, setPreviewFont] = useState<string | null>(null);
  const [showScrollAnimation, setShowScrollAnimation] = useState(false);

  useEffect(() => {
    if (settings.scrollAnimation) {
      setShowScrollAnimation(true);
      const timer = setTimeout(() => setShowScrollAnimation(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [settings.scrollAnimation]);

  const handleFontSelect = (fontValue: string) => {
    setPreviewFont(fontValue);
    playSound("hover");
  };

  const handleFontSave = () => {
    if (previewFont) {
      updateSettings({ font: previewFont });
      setPreviewFont(null);
      playSound("click");
    }
  };

  const handleFontReset = () => {
    updateSettings({ font: "Cinzel, serif" });
    setPreviewFont(null);
    playSound("click");
  };

  const handleMusicSelect = (trackId: string) => {
    updateSettings({ musicTrack: trackId, musicPlaying: true });
    playSound("click");
  };

  const togglePlayPause = () => {
    updateSettings({ musicPlaying: !settings.musicPlaying });
    playSound("click");
  };

  const handleVolumeChange = (value: number[]) => {
    updateSettings({ volume: value[0] });
  };

  const toggleMute = () => {
    updateSettings({ muted: !settings.muted });
    playSound("click");
  };

  const handleRandomTrack = () => {
    const randomTrack =
      MUSIC_TRACKS[Math.floor(Math.random() * MUSIC_TRACKS.length)];
    updateSettings({ musicTrack: randomTrack.id, musicPlaying: true });
    playSound("click");
  };

  return (
    <div
      className={`min-h-screen bg-[#0a0a0f] text-purple-200 transition-all duration-1000 ${
        showScrollAnimation ? "opacity-0 scale-95" : "opacity-100 scale-100"
      }`}
      style={{
        fontFamily: `var(--font-custom, ${settings.font})`,
        filter: `brightness(${0.8 + (settings.darkModeIntensity / 100) * 0.4})`,
        fontSize: `calc(1rem * var(--text-scale, 1))`,
      }}
    >
      {/* Navigation */}
      <nav className="border-b border-purple-900/30 bg-[#0f0f1a]/80 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
          >
            <Flame className="h-5 w-5" />
            <span className="font-serif text-lg">Eternal Letters</span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/letters"
              className="text-sm text-purple-300 hover:text-purple-200 transition-colors"
            >
              Letters
            </Link>
            <Link
              href="/rules"
              className="text-sm text-purple-300 hover:text-purple-200 transition-colors"
            >
              Rules
            </Link>
            <Link
              href="/lore"
              className="text-sm text-purple-300 hover:text-purple-200 transition-colors"
            >
              Lore
            </Link>
            <Link
              href="/profile"
              className="text-sm text-purple-300 hover:text-purple-200 transition-colors"
            >
              Profile
            </Link>
            <Link
              href="/settings"
              className="text-sm text-purple-400 hover:text-purple-300 transition-colors relative"
            >
              <svg
                className={`h-5 w-5 ${
                  settings.particleEffects || settings.cursorTrail
                    ? "animate-pulse"
                    : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="mb-8 md:mb-12 text-center">
          <h1 className="mb-2 font-serif text-3xl md:text-5xl text-amber-400">
            Sacred Settings
          </h1>
          <p className="italic text-purple-300 text-sm md:text-base">
            Customize your journey through the eternal realm
          </p>
          {isMobile && (
            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-purple-900/30 px-4 py-2 text-xs text-purple-300 border border-purple-800/30">
              <Smartphone className="h-4 w-4" />
              Mobile-optimized settings active
            </div>
          )}
        </div>

        {isMobile && (
          <section className="mb-8 md:mb-12">
            <div className="relative mx-auto max-w-4xl rounded-lg bg-gradient-to-b from-purple-950/40 to-purple-900/20 p-4 md:p-8 shadow-2xl border border-purple-800/30">
              <ScrollEdge />

              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-900/50 text-amber-400">
                  <Smartphone className="h-5 w-5" />
                </div>
                <h2 className="font-serif text-xl md:text-2xl text-purple-300">
                  Mobile Experience
                </h2>
              </div>

              <p className="mb-6 italic text-purple-400 text-xs md:text-sm">
                Optimize your mobile journey through the eternal realm
              </p>

              <div className="space-y-4">
                <div>
                  <Label className="mb-3 block text-sm text-purple-300">
                    Quick Theme Presets
                  </Label>
                  <div className="grid gap-2 grid-cols-2">
                    {THEME_PRESETS.map((preset) => (
                      <button
                        key={preset.id}
                        onClick={() => {
                          updateSettings({ themePreset: preset.id });
                        }}
                        className={`rounded-lg border p-3 text-left transition-all ${
                          settings.themePreset === preset.id
                            ? "border-amber-500 bg-purple-900/40"
                            : "border-purple-800/30 bg-purple-950/20 active:bg-purple-900/30"
                        }`}
                      >
                        <div className="font-medium text-purple-200 text-sm">
                          {preset.name}
                        </div>
                        <div className="text-xs text-purple-400 mt-1">
                          {preset.description}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="mb-3 block text-sm text-purple-300">
                    Text Size
                  </Label>
                  <Slider
                    value={[settings.textSize]}
                    onValueChange={(value) =>
                      updateSettings({ textSize: value[0] })
                    }
                    min={80}
                    max={150}
                    step={10}
                    className="w-full"
                  />
                  <div className="mt-2 flex justify-between text-xs text-purple-400">
                    <span>Small</span>
                    <span>{settings.textSize}%</span>
                    <span>Large</span>
                  </div>
                </div>

                <div className="flex items-center justify-between rounded-lg bg-purple-950/30 p-4 border border-purple-800/20">
                  <div>
                    <h3 className="font-medium text-purple-200">
                      Haptic Feedback
                    </h3>
                    <p className="text-sm text-purple-400">
                      Vibration on interactions
                    </p>
                  </div>
                  <Switch
                    checked={settings.hapticFeedback}
                    onCheckedChange={(checked) =>
                      updateSettings({ hapticFeedback: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between rounded-lg bg-purple-950/30 p-4 border border-purple-800/20">
                  <div>
                    <h3 className="font-medium text-purple-200">
                      Reduced Motion
                    </h3>
                    <p className="text-sm text-purple-400">
                      Minimize animations for comfort
                    </p>
                  </div>
                  <Switch
                    checked={settings.reducedMotion}
                    onCheckedChange={(checked) =>
                      updateSettings({ reducedMotion: checked })
                    }
                  />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Font Customization */}
        <section className="mb-8 md:mb-12">
          <div className="relative mx-auto max-w-4xl rounded-lg bg-gradient-to-b from-purple-950/40 to-purple-900/20 p-4 md:p-8 shadow-2xl border border-purple-800/30">
            <ScrollEdge />

            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-900/50 text-amber-400">
                  <span className="font-serif text-lg">✒️</span>
                </div>
                <h2 className="font-serif text-xl md:text-2xl text-purple-300">
                  Font of the Ancients
                </h2>
              </div>
              <Button
                onClick={handleFontReset}
                variant="outline"
                size="sm"
                className="border-purple-700 text-purple-300 hover:bg-purple-900/30 bg-transparent"
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Reset
              </Button>
            </div>

            <p className="mb-6 italic text-purple-400 text-xs md:text-sm">
              Choose the sacred script that shall carry your words across the
              ethereal plane
            </p>

            <div className="grid gap-3 md:gap-4 grid-cols-1 md:grid-cols-2">
              {FANTASY_FONTS.map((font) => (
                <button
                  key={font.value}
                  onClick={() => handleFontSelect(font.value)}
                  onMouseEnter={() => playSound("hover")}
                  className={`group relative rounded-lg border p-3 md:p-4 text-left transition-all ${
                    (previewFont || settings.font) === font.value
                      ? "border-amber-500 bg-purple-900/40 shadow-lg shadow-amber-500/20"
                      : "border-purple-800/30 bg-purple-950/20 hover:border-purple-700/50 hover:bg-purple-900/30"
                  } ${
                    settings.runeSeals
                      ? "hover:shadow-lg hover:shadow-purple-500/30"
                      : ""
                  }`}
                >
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs md:text-sm font-medium text-purple-300">
                      {font.name}
                    </span>
                    {(previewFont || settings.font) === font.value && (
                      <Check className="h-4 w-4 text-amber-500" />
                    )}
                  </div>
                  <p
                    className="text-sm md:text-base text-purple-200"
                    style={{ fontFamily: font.value }}
                  >
                    {font.preview}
                  </p>
                </button>
              ))}
            </div>

            {previewFont && (
              <div className="mt-6 flex gap-3">
                <Button
                  onClick={handleFontSave}
                  className="bg-amber-600 hover:bg-amber-700 text-white"
                >
                  Save Font
                </Button>
                <Button
                  onClick={() => {
                    setPreviewFont(null);
                    playSound("click");
                  }}
                  variant="outline"
                  className="border-purple-700 text-purple-300 hover:bg-purple-900/30"
                >
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Background Music */}
        <section className="mb-8 md:mb-12">
          <div className="relative mx-auto max-w-4xl rounded-lg bg-gradient-to-b from-purple-950/40 to-purple-900/20 p-4 md:p-8 shadow-2xl border border-purple-800/30">
            <ScrollEdge />

            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-900/50 text-amber-400">
                <span className="font-serif text-lg">🎵</span>
              </div>
              <h2 className="font-serif text-2xl text-purple-300">
                Ethereal Melodies
              </h2>
            </div>

            <p className="mb-6 italic text-purple-400 text-xs md:text-sm">
              Let ancient harmonies accompany your journey through the eternal
              realm
            </p>

            {/* Track Selection */}
            <div className="mb-6">
              <Label className="mb-3 block text-sm text-purple-300">
                Select Your Melody
              </Label>
              <div className="grid gap-2 md:gap-3 grid-cols-1 md:grid-cols-2">
                {MUSIC_TRACKS.map((track) => (
                  <button
                    key={track.id}
                    onClick={() => handleMusicSelect(track.id)}
                    onMouseEnter={() => playSound("hover")}
                    className={`flex items-center justify-between rounded-lg border p-3 transition-all ${
                      settings.musicTrack === track.id
                        ? "border-amber-500 bg-purple-900/40"
                        : "border-purple-800/30 bg-purple-950/20 hover:border-purple-700/50 hover:bg-purple-900/30"
                    }`}
                  >
                    <div>
                      <div className="font-medium text-purple-200 text-sm">
                        {track.title}
                      </div>
                      <div className="text-xs text-purple-400 capitalize">
                        {track.category}
                      </div>
                    </div>
                    {settings.musicTrack === track.id &&
                      settings.musicPlaying && (
                        <div className="flex gap-1">
                          <div className="w-1 h-4 bg-amber-500 animate-pulse" />
                          <div className="w-1 h-4 bg-amber-500 animate-pulse delay-75" />
                          <div className="w-1 h-4 bg-amber-500 animate-pulse delay-150" />
                        </div>
                      )}
                  </button>
                ))}
              </div>
            </div>

            {/* Playback Controls */}
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <Button
                onClick={togglePlayPause}
                disabled={!settings.musicTrack}
                className="bg-amber-600 hover:bg-amber-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {settings.musicPlaying ? (
                  <>
                    <Pause className="mr-2 h-4 w-4" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play className="mr-2 h-4 w-4" />
                    Play
                  </>
                )}
              </Button>

              <Button
                onClick={handleRandomTrack}
                variant="outline"
                className="border-purple-700 text-purple-300 hover:bg-purple-900/30 bg-transparent"
              >
                <Shuffle className="mr-2 h-4 w-4" />
                Random
              </Button>

              <Button
                onClick={toggleMute}
                variant="outline"
                size="icon"
                className="border-purple-700 text-purple-300 hover:bg-purple-900/30 bg-transparent"
              >
                {settings.muted ? (
                  <VolumeX className="h-4 w-4" />
                ) : (
                  <Volume2 className="h-4 w-4" />
                )}
              </Button>
            </div>

            {/* Volume Control */}
            <div>
              <Label className="mb-3 block text-sm text-purple-300">
                Volume
              </Label>
              <Slider
                value={[settings.volume]}
                onValueChange={handleVolumeChange}
                max={100}
                step={1}
                className="w-full"
                disabled={settings.muted}
              />
              <div className="mt-2 flex justify-between text-xs text-purple-400">
                <span>Silent</span>
                <span>{settings.volume}%</span>
                <span>Loud</span>
              </div>
            </div>

            {settings.musicTrack && (
              <div className="mt-4 rounded-lg bg-purple-900/20 p-3 border border-purple-800/20">
                <p className="text-xs text-purple-400 text-center">
                  Now playing:{" "}
                  <span className="text-purple-300">
                    {
                      MUSIC_TRACKS.find((t) => t.id === settings.musicTrack)
                        ?.title
                    }
                  </span>
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Theme Customization */}
        <section className="mb-8 md:mb-12">
          <div className="relative mx-auto max-w-4xl rounded-lg bg-gradient-to-b from-purple-950/40 to-purple-900/20 p-4 md:p-8 shadow-2xl border border-purple-800/30">
            <ScrollEdge />

            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-900/50 text-amber-400">
                <span className="font-serif text-lg">🎨</span>
              </div>
              <h2 className="font-serif text-xl md:text-2xl text-purple-300">
                Realm Aesthetics
              </h2>
            </div>

            <p className="mb-6 italic text-purple-400 text-xs md:text-sm">
              Shape the visual essence of your mystical environment
            </p>

            {/* Theme Accent */}
            <div className="mb-6">
              <Label className="mb-3 block text-sm text-purple-300">
                Theme Accent
              </Label>
              <div className="grid gap-2 md:gap-3 grid-cols-2 md:grid-cols-3">
                {THEME_ACCENTS.map((accent) => (
                  <button
                    key={accent.id}
                    onClick={() => {
                      updateSettings({ themeAccent: accent.id });
                      playSound("click");
                    }}
                    onMouseEnter={() => playSound("hover")}
                    className={`flex items-center gap-2 md:gap-3 rounded-lg border p-2 md:p-3 transition-all ${
                      settings.themeAccent === accent.id
                        ? "border-amber-500 bg-purple-900/40"
                        : "border-purple-800/30 bg-purple-950/20 active:bg-purple-900/30"
                    }`}
                  >
                    <div
                      className={`h-5 w-5 md:h-6 md:w-6 rounded-full ${accent.color}`}
                    />
                    <span className="text-xs md:text-sm text-purple-200">
                      {accent.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Dynamic Background */}
            <div className="mb-6">
              <Label className="mb-3 block text-sm text-purple-300">
                Dynamic Background
              </Label>
              <div className="grid gap-2 md:gap-3 grid-cols-2 md:grid-cols-3">
                {DYNAMIC_BACKGROUNDS.map((bg) => (
                  <button
                    key={bg.id}
                    onClick={() => {
                      updateSettings({ dynamicBackground: bg.id });
                      playSound("click");
                    }}
                    onMouseEnter={() => playSound("hover")}
                    className={`rounded-lg border p-2 md:p-3 text-left transition-all ${
                      settings.dynamicBackground === bg.id
                        ? "border-amber-500 bg-purple-900/40"
                        : "border-purple-800/30 bg-purple-950/20 active:bg-purple-900/30"
                    }`}
                  >
                    <div className="font-medium text-purple-200 text-xs md:text-sm">
                      {bg.name}
                    </div>
                    <div className="text-xs text-purple-400 mt-1">
                      {bg.description}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Cursor Style */}
            <div className="mb-6">
              <Label className="mb-3 block text-sm text-purple-300">
                Cursor Style
              </Label>
              <div className="grid gap-2 md:gap-3 grid-cols-2 md:grid-cols-3">
                {CURSOR_STYLES.map((cursor) => (
                  <button
                    key={cursor.id}
                    onClick={() => {
                      updateSettings({ cursorStyle: cursor.id });
                      playSound("click");
                    }}
                    onMouseEnter={() => playSound("hover")}
                    className={`rounded-lg border p-2 md:p-3 text-left transition-all ${
                      settings.cursorStyle === cursor.id
                        ? "border-amber-500 bg-purple-900/40"
                        : "border-purple-800/30 bg-purple-950/20 active:bg-purple-900/30"
                    }`}
                  >
                    <div className="font-medium text-purple-200 text-xs md:text-sm">
                      {cursor.name}
                    </div>
                    <div className="text-xs text-purple-400 mt-1">
                      {cursor.description}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Dark Mode Intensity */}
            <div>
              <Label className="mb-3 block text-sm text-purple-300">
                Dark Mode Intensity
              </Label>
              <Slider
                value={[settings.darkModeIntensity]}
                onValueChange={(value) =>
                  updateSettings({ darkModeIntensity: value[0] })
                }
                max={100}
                step={1}
                className="w-full"
              />
              <div className="mt-2 flex justify-between text-xs text-purple-400">
                <span>Dim</span>
                <span>Bright</span>
              </div>
            </div>
          </div>
        </section>

        {/* Additional Customizations */}
        <section>
          <div className="relative mx-auto max-w-4xl rounded-lg bg-gradient-to-b from-purple-950/40 to-purple-900/20 p-4 md:p-8 shadow-2xl border border-purple-800/30">
            <ScrollEdge />

            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-900/50 text-amber-400">
                <span className="font-serif text-lg">✨</span>
              </div>
              <h2 className="font-serif text-xl md:text-2xl text-purple-300">
                Mystical Enhancements
              </h2>
            </div>

            <p className="mb-6 italic text-purple-400 text-xs md:text-sm">
              Invoke additional powers to enhance your experience in the realm
            </p>

            <div className="space-y-3 md:space-y-4">
              <div className="flex items-center justify-between rounded-lg bg-purple-950/30 p-4 border border-purple-800/20">
                <div>
                  <h3 className="font-medium text-purple-200">
                    Ethereal Particles
                  </h3>
                  <p className="text-sm text-purple-400">
                    Floating mystical dust across the realm
                  </p>
                </div>
                <Switch
                  checked={settings.particleEffects}
                  onCheckedChange={(checked) =>
                    updateSettings({ particleEffects: checked })
                  }
                />
              </div>

              {!isMobile && (
                <>
                  <div className="flex items-center justify-between rounded-lg bg-purple-950/30 p-4 border border-purple-800/20">
                    <div>
                      <h3 className="font-medium text-purple-200">
                        Flame Cursor Trail
                      </h3>
                      <p className="text-sm text-purple-400">
                        Leave a trail of embers as you navigate
                      </p>
                    </div>
                    <Switch
                      checked={settings.cursorTrail}
                      onCheckedChange={(checked) =>
                        updateSettings({ cursorTrail: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between rounded-lg bg-purple-950/30 p-4 border border-purple-800/20">
                    <div>
                      <h3 className="font-medium text-purple-200">
                        Animated Rune Seals
                      </h3>
                      <p className="text-sm text-purple-400">
                        Mystical symbols appear on hover
                      </p>
                    </div>
                    <Switch
                      checked={settings.runeSeals}
                      onCheckedChange={(checked) =>
                        updateSettings({ runeSeals: checked })
                      }
                    />
                  </div>
                </>
              )}

              <div className="flex items-center justify-between rounded-lg bg-purple-950/30 p-4 border border-purple-800/20 opacity-50">
                <div>
                  <h3 className="font-medium text-purple-200">
                    Mystical Sound Effects
                  </h3>
                  <p className="text-sm text-purple-400">
                    Requires audio files in /public/sounds/
                  </p>
                </div>
                <Switch checked={false} disabled />
              </div>

              <div className="flex items-center justify-between rounded-lg bg-purple-950/30 p-4 border border-purple-800/20">
                <div>
                  <h3 className="font-medium text-purple-200">
                    Candlelight Ambiance
                  </h3>
                  <p className="text-sm text-purple-400">
                    Flickering light effects throughout
                  </p>
                </div>
                <Switch
                  checked={settings.candleFlicker}
                  onCheckedChange={(checked) =>
                    updateSettings({ candleFlicker: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between rounded-lg bg-purple-950/30 p-4 border border-purple-800/20">
                <div>
                  <h3 className="font-medium text-purple-200">
                    Scroll Opening Animation
                  </h3>
                  <p className="text-sm text-purple-400">
                    Pages unfurl like ancient scrolls
                  </p>
                </div>
                <Switch
                  checked={settings.scrollAnimation}
                  onCheckedChange={(checked) =>
                    updateSettings({ scrollAnimation: checked })
                  }
                />
              </div>
            </div>
          </div>
        </section>

        {/* Footer Quote */}
        <div className="mt-8 md:mt-12 text-center">
          <div className="mx-auto max-w-2xl px-4">
            <Flame
              className="mx-auto mb-4 h-6 w-6 md:h-8 md:w-8 text-amber-500 animate-pulse"
              style={{ filter: `brightness(var(--candle-flicker, 1))` }}
            />
            <p className="italic text-purple-400 text-xs md:text-sm">
              "Through customization and preference, the soul finds its voice in
              the eternal dance of words."
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
