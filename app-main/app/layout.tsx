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
      {/* Note: We do NOT forcibly add "dark" class here by default. 
          We'll rely on the user's saved setting or system preference 
          toggled in the Footer. */}
      <body
        className="
          font-mono 
          bg-tnLight-bg 
          text-tnLight-text 
          dark:bg-tnStorm-bg 
          dark:text-tnStorm-text
        "
      >
        <Providers>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
