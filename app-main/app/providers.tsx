"use client";

import { SessionProvider } from "next-auth/react";

// A client component that wraps children in <SessionProvider>
export function Providers({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
