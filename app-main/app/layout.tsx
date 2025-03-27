// app/layout.tsx

import "../styles/globals.css";
import type { Metadata } from "next";
import { Providers } from "./providers";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { JetBrains_Mono } from "next/font/google";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "Deic HaveIBeenPwned",
  description: "...",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${jetbrainsMono.variable}`}>
      <body
        className="
          font-mono 
          flex flex-col min-h-screen
          bg-tnLight-bg 
          text-tnLight-text 
          dark:bg-tnStorm-bg 
          dark:text-tnStorm-text
        "
      >
        <Providers>
          <Header />
          {/* This main flex-1 (or flex-grow) will push the footer to the bottom */}
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
