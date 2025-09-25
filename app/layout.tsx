import type React from "react";
import type { Metadata } from "next";
import { Cinzel, Cinzel_Decorative } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/auth-context";
import { ThemeProvider } from "@/contexts/theme-context";
import { SWRegister } from "@/components/sw-register"; // 👈 import here

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
  manifest: "/manifest.json", // 👈 add this too
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
      <body className="font-sans antialiased min-h-screen">
        <ThemeProvider>
          <AuthProvider>
            {children}
            <SWRegister /> {/* 👈 mount it here */}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
