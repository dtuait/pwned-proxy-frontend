"use client";

import { useEffect, useState } from "react";

export default function AboutPage() {
  const [domains, setDomains] = useState<string[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/subscribed-domains");
        if (!res.ok) throw new Error(`Failed to load domains: ${res.status}`);
        const data = await res.json();
        if (!Array.isArray(data) || data.length === 0) {
          throw new Error("No domain list returned");
        }
        setDomains(data as string[]);
      } catch (err) {
        setError((err as Error).message);
      }
    };
    load();
  }, []);

  if (error) {
    return <div className="p-4 text-red-600">Error: {error}</div>;
  }

  if (!domains) {
    return <div className="p-4">Loading…</div>;
  }

  return (
    <main className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">About</h1>
      <p>
        Write contact {process.env.NEXT_PUBLIC_CONTACT_EMAIL} if you would like to get approved
        access to your university!
      </p>
      <h2 className="text-xl font-semibold mt-4">Subscribed Universities</h2>
      <ul className="list-disc pl-5">
        {domains.map((d) => (
          <li key={d}>{d}</li>
        ))}
      </ul>
    </main>
  );
}
