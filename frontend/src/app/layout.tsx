import type { Metadata } from "next";
import { Geist, Geist_Mono, Mali } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const maliFont = Mali({
  variable: "--font-mali",
  weight: ["200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Music Room App",
  description: "A music room learning project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${maliFont.variable} antialiased
        w-full max-w-screen-2xl min-h-screen flex justify-center items-center mx-auto p-4 bg-[#ffc8dd]/50`}
      >
        {children}
      </body>
    </html>
  );
}
