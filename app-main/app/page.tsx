"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function HomePage() {
  const { data: session, status } = useSession();

  const handleSignOut = async () => {
    // Sign out locally from NextAuth
    await signOut({
      callbackUrl: `https://${process.env.NEXT_PUBLIC_MY_DOMAIN}`, // e.g. the domain of your app
    });

    // Redirect to Azure AD logout endpoint
    window.location.href = `https://login.microsoftonline.com/${process.env.NEXT_PUBLIC_AZURE_AD_TENANT_ID}/oauth2/v2.0/logout?post_logout_redirect_uri=https://${process.env.NEXT_PUBLIC_MY_DOMAIN}`;
  };

  return (
    <main className="p-4">
      <h1>Welcome to NextAuth + Azure AD</h1>
      {status === "loading" && <p>Loading session...</p>}

      {session ? (
        <>
          <p>Signed in as {session.user?.email}</p>
          <button onClick={handleSignOut}>Sign out</button>
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
