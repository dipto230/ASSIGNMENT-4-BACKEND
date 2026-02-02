import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";

export const auth = betterAuth({
  baseURL: "https://medistore-assignment-70.vercel.app",

  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  trustedOrigins: [
    "https://medistore-client-side.vercel.app",
    "http://localhost:3000",
  ],

  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    requireEmailVerification: false,
  },

  advanced: {
    cookiePrefix: "__Secure-",
    defaultCookieAttributes: {
      httpOnly: true,
      secure: true, // using secure always
      sameSite: "none", // same as your first snippet
      path: "/", // keeps cookies at root path
    },
    // You can add other advanced options here if needed
  },
});
