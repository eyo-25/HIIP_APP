import { addUser } from "@/service/user";
import NextAuth, { NextAuthOptions } from "next-auth";

import GoogleProvider from "next-auth/providers/google";
import KAKAOProvider from "next-auth/providers/kakao";

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_ID || "",
      clientSecret: process.env.GOOGLE_OAUTH_SECRET || "",
    }),
    KAKAOProvider({
      clientId: process.env.KAKAO_OAUTH_ID || "",
      clientSecret: process.env.KAKAO_OAUTH_SECRET || "",
    }),
  ],
  pages: {
    signIn: "/auth",
  },
  callbacks: {
    async signIn({ user: { id, email, image, name } }) {
      if (!email) return false;
      addUser({
        id,
        email,
        image,
        name: name || "",
      });
      return true;
    },
    async session({ session }) {
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { authOptions, handler as GET, handler as POST };
