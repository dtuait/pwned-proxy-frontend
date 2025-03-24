import NextAuth, { NextAuthOptions, AuthOptions, Session } from "next-auth";
import AzureADProvider from "next-auth/providers/azure-ad";
import { JWT } from "next-auth/jwt";

export const authOptions: NextAuthOptions = {
  providers: [
    AzureADProvider({
      clientId: process.env.NEXT_PUBLIC_AZURE_AD_CLIENT_ID!,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET!,
      tenantId: process.env.NEXT_PUBLIC_AZURE_AD_TENANT_ID!,
      checks: ["pkce", "state"],
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async jwt({ token, account }: { token: JWT; account?: any }) {
      if (account?.access_token) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      return {
        ...session,
        accessToken: token.accessToken, 
      };
    },

    /**
     * Redirect users after a successful sign in.
     * If you always want them to land on /welcome,
     * just return `${baseUrl}/welcome` unconditionally.
     */
    async redirect({ url, baseUrl }) {
      // By default, NextAuth tries to continue to the URL the user was going to.
      // Here we’re forcing *any* successful sign-in to go to /welcome.
      return `${baseUrl}/welcome`;
    },
  },

  debug: true,
};

const handler = NextAuth(authOptions as AuthOptions);
export { handler as GET, handler as POST };
