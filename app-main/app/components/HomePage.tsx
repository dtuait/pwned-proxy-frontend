"use client";

import React, { useState } from "react";
import BreachCountCard from "./BreachCountCard";
import FireworkAnimation from "./ui/FireworkAnimation";
import { Database, Calendar } from "lucide-react";

export default function HomePage() {
  const [email, setEmail] = useState("");
  const [results, setResults] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searched, setSearched] = useState(false);

  // "Have I Been Pwned?" click handler
  const handleClick = async () => {
    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      alert("Please enter an email address!");
      return;
    }

    setLoading(true);
    setError(null);
    setResults(null);
    setSearched(false);

    try {
      const apiBase =
        process.env.NEXT_PUBLIC_HIBP_PROXY_URL ||
        "https://api.haveibeenpwned.security.ait.dtu.dk/";

      const res = await fetch(
        `${apiBase}api/v3/breachedaccount/${encodeURIComponent(trimmedEmail)}`,
        {
          headers: { accept: "application/json" },
        }
      );

      if (res.status === 404) {
        // A 404 means the email was not found in any breach
        setResults([]);
        setSearched(true);
        return;
      }

      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }

      const data = await res.json();
      setResults(data);
      setSearched(true);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#0d0f14] px-4">
      <h1 className="text-3xl md:text-4xl font-bold text-white mt-14 mb-6 text-center">
        Check if your email address is in a data breach
      </h1>

      <div className="flex w-full max-w-lg bg-white rounded-lg overflow-hidden shadow-lg">
        <input
          type="email"
          placeholder="Enter email address..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 px-4 py-4 text-gray-900 placeholder-gray-500 focus:outline-none"
        />
        <button
          onClick={handleClick}
          disabled={loading || !email}
          className="px-8 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-500 text-white font-semibold"
        >
          {loading ? (
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mx-auto"></div>
          ) : (
            'Check'
          )}
        </button>
      </div>

      {loading && <p className="mt-4 text-gray-300">Loading...</p>}

      {error && <p className="mt-4 text-red-600">Error: {error}</p>}

      {searched && (
        <>
          <h2 className="text-3xl font-bold text-center mt-16">Email Breach History</h2>
          <p className="text-center text-gray-300">Timeline of data breaches affecting your email address</p>

          <BreachCountCard count={results ? results.length : 0} />

          {results && results.length === 0 && <FireworkAnimation />}

          {results && results.length > 0 && (
            <div className="space-y-6 mt-8">
              {results.map((breach: any, index: number) => (
                <div key={index} className="bg-gray-800 rounded-2xl p-6 border-l-4 border-red-500">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-gray-700 rounded-lg flex items-center justify-center">
                        <Database className="w-8 h-8 text-gray-400" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-bold">{breach.Title || breach.Name}</h3>
                        {breach.BreachDate && (
                          <div className="flex items-center gap-2 text-gray-400">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(breach.BreachDate).toLocaleDateString()}</span>
                          </div>
                        )}
                      </div>
                      {breach.Domain && (
                        <p className="text-gray-300 mb-2">Domain: {breach.Domain}</p>
                      )}
                      {breach.PwnCount && (
                        <p className="text-gray-300 mb-2">
                          Compromised accounts: {breach.PwnCount.toLocaleString()}
                        </p>
                      )}
                      {breach.Description && (
                        <p className="text-gray-300" dangerouslySetInnerHTML={{ __html: breach.Description }} />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
