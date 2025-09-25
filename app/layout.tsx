import type React from "react";
import type { Metadata } from "next";
import { Cinzel, Cinzel_Decorative } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/auth-context";
import { ThemeProvider } from "@/contexts/theme-context";

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
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico", // recommended for modern browsers
    apple: "/favicon.ico", // optional, for iOS devices
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
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
