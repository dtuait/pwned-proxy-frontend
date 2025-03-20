import NextAuth, { AuthOptions, NextAuthOptions, Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import AzureADProvider from "next-auth/providers/azure-ad";

export const authOptions: NextAuthOptions = {
  providers: [
    AzureADProvider({
      clientId: process.env.NEXT_PUBLIC_AZURE_AD_CLIENT_ID!,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET!,
      tenantId: process.env.NEXT_PUBLIC_AZURE_AD_TENANT_ID!,
      authorization: {
        url: "https://login.microsoftonline.com/f251f123-c9ce-448e-9277-34bb285911d9/oauth2/v2.0/authorize",
        params: {
          response_type: "code",
          code_challenge_method: "S256",
          scope: "openid profile email",
        },
      },
      token: {
        url: "https://login.microsoftonline.com/f251f123-c9ce-448e-9277-34bb285911d9/oauth2/v2.0/token",
        async request({ client, params }: { client: any; params: Record<string, any> }) {
          return client.oauthCallback(
            "https://login.microsoftonline.com/f251f123-c9ce-448e-9277-34bb285911d9/oauth2/v2.0/token",
            params,
            { code_verifier: params.code_verifier as string }
          );
        },
      },
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
        accessToken: token.accessToken, // Ensure session type matches expected format
      };
    },
  },
  debug: true,
};

// Fix: Ensure `authOptions` matches expected NextAuth type
const handler = NextAuth(authOptions as AuthOptions);
export { handler as GET, handler as POST };
