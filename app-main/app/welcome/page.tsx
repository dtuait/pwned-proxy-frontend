import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function WelcomePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/welcome");
  }

  return (
    <main className="p-6">
      <h1 className="text-xl font-bold mb-4">Welcome!</h1>
      <p>You have successfully signed in.</p>
    </main>
  );
}
