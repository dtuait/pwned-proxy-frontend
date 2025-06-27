"use client";

import PasswordChecker from "../components/password/PasswordChecker";

export default function PasswordsPage() {
  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Password Breach Checking APIs: HIBP and Alternatives</h1>
      <PasswordChecker />
      <p>
        Data breaches have exposed billions of passwords, putting users at risk of account takeover through credential stuffing and other attacks. Services like Have I Been Pwned (HIBP) allow users to verify if a password appears in known breach corpuses.
      </p>
      <p>
        HIBP's Pwned Passwords API implements a k-anonymity model. The client hashes the password locally with SHA-1 and sends only the first five hexadecimal characters to the endpoint <code>/range/&lt;prefix&gt;</code>. The response contains all matching suffixes and occurrence counts. If the client's full hash is in the list, the password is compromised.
      </p>
      <p>
        The service is free, unauthenticated and heavily cached. Requests must include a <code>User-Agent</code> header and are performed over HTTPS.
      </p>
      <h2 className="text-xl font-semibold">Alternative Services</h2>
      <p>
        Several commercial APIs provide similar functionality with their own datasets and features. Examples include Enzoic, SpyCloud and DeHashed. These typically require an API key and may offer additional checks, such as username and password combinations or continuous monitoring.
      </p>
      <p>
        Each service has different authentication requirements, rate limits and pricing models. When integrating them, consult the respective documentation for usage examples and constraints.
      </p>
    </main>
  );
}
