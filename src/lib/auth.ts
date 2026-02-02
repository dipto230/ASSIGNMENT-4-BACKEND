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

  /**
   * ✅ Session config (as per guideline)
   */
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // 5 minutes
    },
  },

  /**
   * ✅ Advanced config (as per guideline)
   */
  advanced: {
    cookiePrefix: "better-auth",

    useSecureCookies: process.env.NODE_ENV === "production",

    crossSubDomainCookies: {
      enabled: false,
    },

    disableCSRFCheck: true, // Allow Postman, mobile apps, no-origin requests

    defaultCookieAttributes: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      path: "/",
    },
  },
});
