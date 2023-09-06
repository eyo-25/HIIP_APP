import NextAuth, { NextAuthOptions } from "next-auth";

import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_ID || "",
      clientSecret: process.env.GOOGLE_OAUTH_SECRET || "",
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_OAUTH_ID || "",
      clientSecret: process.env.FACEBOOK_OAUTH_SECRET || "",
    }),
  ],
};

const handler = NextAuth(authOptions);

export { authOptions, handler as GET, handler as POST };
