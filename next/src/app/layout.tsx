"use client";

import "./globals.css";
import { useEffect } from "react";
import { Roboto } from "next/font/google";
import type { Metadata } from "next";

import AuthContext from "@/context/AuthContext";
import AuthGardContext from "@/context/AuthGardContext";
import SwrconfigContext from "@/context/SwrconfigContext";

const roboto = Roboto({
  weight: ["300", "400", "500", "700", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HIIP APP",
  description: "High Intensity Interval Planing App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  function setScreenSize() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }
  useEffect(() => {
    window.addEventListener("resize", () => setScreenSize());
    setScreenSize();
  }, []);

  return (
    <html lang="en" className={roboto.className}>
      <body className="bg-gray-400 w-full h-100vh">
        <div className="relative overflow-hidden mx-auto h-100vh w-full max-w-md bg-gray-200">
          <AuthContext>
            <SwrconfigContext>
              <AuthGardContext>{children}</AuthGardContext>
            </SwrconfigContext>
          </AuthContext>
        </div>
      </body>
    </html>
  );
}
