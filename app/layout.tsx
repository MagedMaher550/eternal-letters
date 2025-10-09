import type React from "react";
import type { Metadata } from "next";
import { Cinzel, Cinzel_Decorative } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/auth-context";
import { ThemeProvider } from "@/contexts/theme-context";
import { SWRegister } from "@/components/sw-register";
import { SettingsProvider } from "@/contexts/settings-context";
import { EffectsRenderer } from "@/components/effects-renderer";
import { SettingsDisplay } from "@/components/settings-display";
import { Suspense } from "react";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
});

const cinzelDecorative = Cinzel_Decorative({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-cinzel-decorative",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Eternal Letters",
  description: "A mystical space for exchanging ancient scrolls between souls",
  generator: "MSS",
  manifest: "/manifest.json",
  themeColor: "#000000",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${cinzelDecorative.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Uncial+Antiqua&family=MedievalSharp&family=IM+Fell+English:ital@0;1&family=Pirata+One&family=Almendra:ital@0;1&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Spectral:ital,wght@0,400;0,600;1,400&family=Crimson+Text:ital,wght@0,400;0,600;1,400&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased min-h-screen">
        <Suspense fallback={<div>Loading...</div>}>
          <ThemeProvider>
            <SettingsProvider>
              <AuthProvider>
                <EffectsRenderer />

                {children}
                <SWRegister />
                <SettingsDisplay />
              </AuthProvider>
            </SettingsProvider>
          </ThemeProvider>
        </Suspense>
      </body>
    </html>
  );
}
