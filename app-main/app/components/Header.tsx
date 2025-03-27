"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import UserAvatar from "./UserAvatar";

export default function Header() {
  const { data: session, status } = useSession();

  const handleSignOut = async () => {
    await signOut({
      callbackUrl: `https://${process.env.NEXT_PUBLIC_MY_DOMAIN}`,
    });

    // sign out from Azure AD if needed
    window.location.href = `https://login.microsoftonline.com/${process.env.NEXT_PUBLIC_AZURE_AD_TENANT_ID}/oauth2/v2.0/logout?post_logout_redirect_uri=https://${process.env.NEXT_PUBLIC_MY_DOMAIN}`;
  };

  return (
    <header
      className="
        w-full 
        flex 
        items-center 
        justify-between 
        p-4 
        border-b 
        bg-white 
        dark:bg-tnStormBg 
        dark:border-tnStormAccent3
      "
    >
      {/* Left side: site logo or title */}
      <Link href="/">
        <h1 className="text-lg font-bold dark:text-tnStormFg">My Next.js App</h1>
      </Link>

      {/* Right side: sign in or user avatar */}
      <div>
        {status === "loading" && <span>Loading...</span>}

        {session?.user ? (
          <div className="flex items-center space-x-4">
            <UserAvatar
              name={session.user.name || session.user.email || ""}
              onClick={handleSignOut}
            />
          </div>
        ) : (
          <button
            className="
              bg-deicBlue 
              text-white 
              px-3 
              py-1 
              rounded
              dark:bg-tnStormAccent1
              hover:opacity-90
            "
            onClick={() => signIn("azure-ad")}
          >
            Sign In
          </button>
        )}
      </div>
    </header>
  );
}
