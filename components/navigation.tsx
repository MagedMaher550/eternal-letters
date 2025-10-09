"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { useTheme } from "@/contexts/theme-context";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  LogOut,
  Menu,
  X,
  Flame,
  Scroll,
  BookOpen,
  User,
  Sun,
  Moon,
  Settings,
} from "lucide-react";
import { useSettings } from "../contexts/settings-context";

export function Navigation() {
  const pathname = usePathname();
  const { currentUser, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { settings, playSound } = useSettings();

  const navItems = [
    { href: "/", label: "Letters", icon: Scroll },
    { href: "/rules", label: "Rules", icon: BookOpen },
    { href: "/lore", label: "Lore", icon: Flame },
    { href: "/profile", label: "Profile", icon: User },
    { href: "/settings", label: "Settings", icon: Settings },
  ];

  const handleLogout = () => {
    playSound("click");
    logout();
    setIsMobileMenuOpen(false);
  };

  const handleToggleTheme = () => {
    playSound("click");
    toggleTheme();
  };

  const handleNavClick = () => {
    playSound("click");
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            onMouseEnter={() => playSound("hover")}
            className="gothic-title text-xl text-primary flex items-center gap-2"
          >
            <Flame className="h-6 w-6" />
            <span className="hidden sm:inline">Eternal Letters</span>
          </Link>

          {/* Desktop Navigation — visible ≥1024px */}
          <div className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isSettings = item.href === "/settings";
              const hasActiveSetting =
                settings.particleEffects ||
                settings.cursorTrail ||
                settings.soundEffects;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onMouseEnter={() => playSound("hover")}
                  onClick={handleNavClick}
                  className={`relative flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
                    pathname === item.href
                      ? "bg-primary/20 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  }`}
                >
                  <Icon
                    className={`h-4 w-4 ${
                      isSettings && hasActiveSetting ? "animate-pulse" : ""
                    }`}
                  />
                  {/* Hide Settings label between md and xl */}
                  <span className={isSettings ? "hidden xl:inline" : "inline"}>
                    {item.label}
                  </span>
                  {isSettings && hasActiveSetting && (
                    <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Desktop Controls — visible ≥1024px */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>Signed in as</span>
              <span className="font-serif text-primary capitalize">
                {currentUser}
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleToggleTheme}
              onMouseEnter={() => playSound("hover")}
              className="text-muted-foreground hover:text-foreground"
            >
              {theme === "light" ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              onMouseEnter={() => playSound("hover")}
              className="text-muted-foreground hover:text-foreground"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>

          {/* Mobile Menu Button — visible <1024px */}
          <button
            onClick={() => {
              playSound("click");
              setIsMobileMenuOpen(!isMobileMenuOpen);
            }}
            className="lg:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary/50"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation — visible <1024px */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border">
            <div className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isSettings = item.href === "/settings";
                const hasActiveSetting =
                  settings.particleEffects ||
                  settings.cursorTrail ||
                  settings.soundEffects;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={handleNavClick}
                    onMouseEnter={() => playSound("hover")}
                    className={`relative flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
                      pathname === item.href
                        ? "bg-primary/20 text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                    }`}
                  >
                    <Icon
                      className={`h-4 w-4 ${
                        isSettings && hasActiveSetting ? "animate-pulse" : ""
                      }`}
                    />
                    <span>{item.label}</span>
                    {isSettings && hasActiveSetting && (
                      <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Mobile Footer */}
            <div className="mt-4 pt-4 border-t border-border space-y-3">
              <div className="flex items-center justify-between px-3">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <span>Signed in as</span>
                  <span className="font-serif text-primary capitalize">
                    {currentUser}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleToggleTheme}
                    onMouseEnter={() => playSound("hover")}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {theme === "light" ? (
                      <Moon className="h-4 w-4" />
                    ) : (
                      <Sun className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLogout}
                    onMouseEnter={() => playSound("hover")}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
