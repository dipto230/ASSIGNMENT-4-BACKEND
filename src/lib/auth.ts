import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";

export const auth = betterAuth({
  // 🔥 MUST be backend URL
  baseURL: "https://medistore-assignment-70.vercel.app",

  // 🔥 Allowed frontend origins
  trustedOrigins: [
    "http://localhost:3000",
    "https://medistore-client-side.vercel.app",
  ],

  // optional but OK for dev
  allowMissingOrigin: true,

  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  emailAndPassword: {
    enabled: true,
  },

  user: {
    additionalFields: {
      role: {
        type: "string",
        required: true,
        defaultValue: "CUSTOMER",
      },
    },
  },

  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
  },

  // 🔥 THIS IS THE CRITICAL FIX
  cookies: {
    session: {
      name: "__Secure-better-auth.session",
      options: {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        domain: ".vercel.app",
       
      },
    },
  },
});
