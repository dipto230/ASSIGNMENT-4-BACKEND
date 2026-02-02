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
      secure: true,
      sameSite: "none",          
      path: "/",
    },
  },
});

