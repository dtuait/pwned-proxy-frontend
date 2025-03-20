// app/layout.tsx
import type { Metadata } from "next";
// Import the client Providers component
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "My Next.js App",
  description: "...",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Wrap all pages/routes with SessionProvider */}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
