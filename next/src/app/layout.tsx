import Navbar from "@/components/navbar/Navbar";
import "./globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";

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
      <body className="bg-gray-400 w-full h-screen">
        <main className="relative overflow-hidden mx-auto h-screen w-full max-w-md bg-gray-100">
          <div className="h-[90%] overflow-hidden">{children}</div>
          <Navbar />
        </main>
      </body>
    </html>
  );
}
