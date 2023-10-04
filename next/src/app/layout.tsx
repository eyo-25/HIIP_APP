import "./globals.css";
import { Roboto } from "next/font/google";
import type { Metadata } from "next";

import AuthContext from "@/context/AuthContext";
import NavigationContext from "@/context/NavigationContext";
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
  return (
    <html lang="en" className={roboto.className}>
      <body className="bg-gray-400 w-full">
        <AuthContext>
          <SwrconfigContext>
            <NavigationContext>{children}</NavigationContext>
          </SwrconfigContext>
        </AuthContext>
      </body>
    </html>
  );
}
