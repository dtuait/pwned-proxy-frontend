"use client";

import { useState } from "react";

async function sha1(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-1", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("").toUpperCase();
}

export default function PasswordChecker() {
  const [password, setPassword] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheck = async () => {
    if (!password) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const hash = await sha1(password);
      const prefix = hash.slice(0, 5);
      const suffix = hash.slice(5);
      const res = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`, {
        headers: {
          "Add-Padding": "true",
          "User-Agent": "pwned-proxy-frontend",
        },
      });
      if (!res.ok) throw new Error("API request failed");
      const text = await res.text();
      const lines = text.split("\n");
      let count: number | null = null;
      for (const line of lines) {
        const [hashSuffix, hits] = line.trim().split(":");
        if (hashSuffix && hashSuffix.toUpperCase() === suffix) {
          count = parseInt(hits, 10);
          break;
        }
      }
      setResult(count === null ? 0 : count);
    } catch (err) {
      setError((err as Error).message || "Error checking password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="flex-1 px-3 py-2 border rounded text-black"
        />
        <button
          onClick={handleCheck}
          disabled={loading || !password}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-500"
        >
          {loading ? "Checking..." : "Check"}
        </button>
      </div>
      {error && <p className="text-red-600">{error}</p>}
      {result !== null && (
        result > 0 ? (
          <p className="text-red-600">Password found {result.toLocaleString()} times in breaches.</p>
        ) : (
          <p className="text-green-600">Password not found in known breaches.</p>
        )
      )}
      <p className="text-sm text-gray-500">
        The password is hashed locally and only a partial hash is sent to the API for privacy.
      </p>
    </div>
  );
}
