import "./globals.css";
import { Roboto } from "next/font/google";
import type { Metadata } from "next";
import AuthContext from "@/context/AuthContext";
import SwrconfigContext from "@/context/SwrconfigContext";

const roboto = Roboto({
  weight: ["300", "400", "500", "700", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HIIP APP",
  description: "High Intensity Interval Planing App",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={roboto.className}>
      <body className="bg-gray-400 w-full">
        <div className="relative overflow-hidden mx-auto h-full w-full max-w-md bg-gray-200">
          <AuthContext>
            <SwrconfigContext>{children}</SwrconfigContext>
          </AuthContext>
        </div>
      </body>
    </html>
  );
}
