import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HabitForge | Gamified Habit Builder",
  description: "Build and sustain positive habits with AI-powered coaching and gamification.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans min-h-full flex flex-col bg-black text-white">
        {children}
      </body>
    </html>
  );
}
