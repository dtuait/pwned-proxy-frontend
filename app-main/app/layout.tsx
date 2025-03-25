// app/layout.tsx
import "../styles/globals.css"; // or "@/styles/globals.css"

import type { Metadata } from "next";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "My Next.js App",
  description: "...",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
