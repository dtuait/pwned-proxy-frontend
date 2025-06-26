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
  icons: {
    icon: "https://www.deic.dk/sites/default/files/favicon_1.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={jetbrainsMono.variable}>
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

          {/*
            This single <main> is our site’s main content area.
            flex-1 => takes remaining space to push footer to bottom
          */}
          <main className="flex-1">{children}</main>

          <Footer />
        </Providers>
      </body>
    </html>
  );
}
