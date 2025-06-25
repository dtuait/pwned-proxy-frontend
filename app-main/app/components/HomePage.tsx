"use client";

import React, { useState } from "react";
import { signOut, useSession } from "next-auth/react";

export default function HomePage() {
  const { data: session, status } = useSession();
  const [email, setEmail] = useState("");
  const [result, setResult] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Sign out handler
  const handleSignOut = async () => {
    await signOut({
      callbackUrl: `https://${process.env.NEXT_PUBLIC_MY_DOMAIN}`,
    });
    window.location.href = `https://login.microsoftonline.com/${
      process.env.NEXT_PUBLIC_AZURE_AD_TENANT_ID
    }/oauth2/v2.0/logout?post_logout_redirect_uri=https://${
      process.env.NEXT_PUBLIC_MY_DOMAIN
    }`;
  };

  // "Have I Been Pwned?" click handler
  const handleClick = async () => {
    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      alert("Please enter an email address!");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch(
        `https://api.haveibeenpwned.security.ait.dtu.dk/api/v3/breachedaccount/${encodeURIComponent(trimmedEmail)}`,
        {
          headers: { accept: "application/json" },
        }
      );

      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }

      const data = await res.json();
      setResult(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    // <div> or <section>, just NOT <main> so we only have one <main> total.
    <div
      className="
        flex
        flex-col
        items-center
        justify-center
        w-full
        h-full         /* Let it fill the parent main’s height */
        px-4
        bg-tnLight-bg
        text-tnLight-text
        dark:bg-tnStorm-bg
        dark:text-tnStorm-text
        text-center
      "
    >
      <h1
        className="
          text-4xl font-bold mb-2
          text-tnLight-accent
          dark:text-tnStorm-blue
        "
      >
        {';-- have i been pwned?'}
      </h1>

      <p className="text-base md:text-lg max-w-xl">
        Check if your email address is in a data breach
      </p>

      {/* Session info */}
      <div className="mt-8">
        {status === "loading" && <p className="mb-2">Loading session...</p>}

        {session ? (
          <div className="flex flex-col items-center space-y-2">
            <p>
              Signed in as <strong>{session.user?.email}</strong>
            </p>
            <button
              onClick={handleSignOut}
              className="
                px-4 py-2 rounded-sm
                font-medium
                bg-deic-green text-black
                dark:bg-deic-green dark:text-black
                hover:opacity-90
              "
            >
              Sign Out
            </button>
          </div>
        ) : (
          <p>You are not signed in.</p>
        )}
      </div>

      {/* "Have I Been Pwned?" search area */}
      <div
        className="
          flex items-center
          w-full max-w-md mt-8
          rounded-md overflow-hidden
          bg-white text-tnLight-text
          dark:bg-tnStorm-bg dark:text-tnStorm-text
          border border-tnLight-border
          dark:border-tnStorm-border
          shadow
        "
      >
        <input
          type="text"
          placeholder="email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="
            flex-1 px-3 py-2
            outline-none
            bg-transparent
          "
        />
        <button
          onClick={handleClick}
          className="
            bg-deic-green text-black
            dark:bg-deic-green dark:text-black
            hover:opacity-90
            px-4 py-2
            transition-colors
          "
        >
          pwned?
        </button>
      </div>

      {loading && <p className="mt-4">Loading...</p>}
      {error && (
        <p className="mt-4 text-red-600 dark:text-red-400">Error: {error}</p>
      )}
      {result && (
        <pre className="mt-4 text-left whitespace-pre-wrap max-w-md bg-gray-800 text-white p-2 rounded">
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
}
