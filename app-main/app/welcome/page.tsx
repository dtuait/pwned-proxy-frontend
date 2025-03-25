"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function WelcomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [debugResponse, setDebugResponse] = useState<any>(null);

  if (status === "loading") {
    return <p className="text-center text-gray-300">Loading...</p>;
  }

  if (!session) {
    router.push("/api/auth/signin?callbackUrl=/welcome");
    return null;
  }

  async function fetchStealerLogs() {
    try {
      const res = await fetch(
        "https://api.dtuaitsoc.ngrok.dev/api/stealer-logs/dtu.dk/",
        {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error(`Fetch failed with status: ${res.status}`);
      }

      const data = await res.json();
      setDebugResponse(data);
    } catch (error) {
      console.error("Error fetching stealer logs:", error);
      setDebugResponse({ error: String(error) });
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-[#1a1b26] text-[#a9b1d6]">
      <div className="w-full max-w-md p-8 rounded shadow bg-[#24283b]">
        <h1 className="text-2xl font-bold mb-4 text-[#7aa2f7]">Welcome!</h1>
        <p className="mb-2">You have successfully signed in.</p>

        <p className="mt-4">
          Logged in as{" "}
          <span className="font-semibold">
            {session.user?.name ?? session.user?.email}
          </span>
        </p>

        {/* Debug: Show the entire session object */}
        <div className="mt-4 text-sm">
          <p className="font-semibold mb-1 text-[#bb9af7]">Session Debug:</p>
          <pre className="bg-[#3b4261] p-2 whitespace-pre-wrap rounded">
            {JSON.stringify(session, null, 2)}
          </pre>
        </div>

        {/* Button to fetch data from your Django API */}
        <button
          onClick={fetchStealerLogs}
          className="mt-4 px-4 py-2 rounded bg-[#414868] hover:bg-[#373e57] text-white"
        >
          Fetch Stealer Logs (Bearer)
        </button>

        {/* Render the debug response from the Django API */}
        {debugResponse && (
          <div className="mt-4 text-sm">
            <p className="font-semibold mb-1 text-[#bb9af7]">API Response:</p>
            <pre className="bg-[#3b4261] p-2 whitespace-pre-wrap rounded">
              {JSON.stringify(debugResponse, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </main>
  );
}
