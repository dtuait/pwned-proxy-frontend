"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function HomePage() {
  const { data: session, status } = useSession();

  return (
    <main className="p-4">
      <h1>Welcome to NextAuth + Azure AD</h1>
      {status === "loading" && <p>Loading session...</p>}

      {session ? (
        <>
          <p>Signed in as {session.user?.email}</p>
          <button onClick={() => signOut()}>Sign out</button>
        </>
      ) : (
        <>
          <p>You are not signed in.</p>
          <button onClick={() => signIn("azure-ad")}>Sign in with Azure AD</button>
        </>
      )}
    </main>
  );
}
