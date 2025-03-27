import NextAuth, { NextAuthOptions, AuthOptions, Session } from "next-auth";
import AzureADProvider from "next-auth/providers/azure-ad";
import { JWT } from "next-auth/jwt";

/**
 * Example scope:
 *   "api://ccd5ce0d-5f7a-43cf-bbb8-82c9cb822f12/access_as_user"
 * Replace the above with YOUR "App Registration" for the Django API.
 *
 * The idea is to have something like:
 *   scope: "openid profile email offline_access api://<YOUR_API_CLIENT_ID>/access_as_user"
 */

export const authOptions: NextAuthOptions = {
  providers: [
    AzureADProvider({
      clientId: process.env.NEXT_PUBLIC_AZURE_AD_CLIENT_ID!,      // <--- Frontend App’s Client ID
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET!,          // <--- App secret
      tenantId: process.env.NEXT_PUBLIC_AZURE_AD_TENANT_ID!,      // <--- Your tenant (directory) ID
      checks: ["pkce", "state"],

      // IMPORTANT: Add the custom scope for the Django API
      authorization: {
        params: {
          // By default: "openid profile email offline_access"
          // Add your custom API scope here
          scope:
            "openid profile email offline_access api://ccd5ce0d-5f7a-43cf-bbb8-82c9cb822f12/access_as_user",
        },
      },
    }),
  ],

  // Use JWT-based sessions so that we can store the access token
  session: {
    strategy: "jwt",
  },

  // This should be a long, random string used to sign cookies etc.
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    /**
     * The "jwt" callback runs whenever a token is created or updated.
     * We save the "access_token" returned by AzureAD into "token.accessToken".
     */
    async jwt({ token, account }: { token: JWT; account?: any }) {
      if (account?.access_token) {
        token.accessToken = account.access_token;
      }
      return token;
    },

    /**
     * The "session" callback runs whenever a session is checked/created.
     * We attach "token.accessToken" to "session.accessToken" so the client can use it.
     */
    async session({ session, token }: { session: Session; token: JWT }) {
      // Put the Azure AD access token on the session, so you can do:
      // fetch("...", { headers: { Authorization: `Bearer ${session.accessToken}` }})
      return {
        ...session,
        accessToken: token.accessToken,
      };
    },

    /**
     * Optional: Force user to land on /welcome after sign in
     */
    async redirect({ url, baseUrl }) {
      return `${baseUrl}/welcome`;
    },
  },

  // For debugging in development:
  debug: true,
};

const handler = NextAuth(authOptions as AuthOptions);
export { handler as GET, handler as POST };
