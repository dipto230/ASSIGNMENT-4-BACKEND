import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";

export const auth = betterAuth({
  // 🔥 MUST be your deployed backend URL
  baseURL: "https://medistore-assignment-70.vercel.app",

  // 🔥 TRUST your frontend origins
  trustedOrigins: [
    "http://localhost:3000",   // local frontend dev
    "http://localhost:5000",   // if testing same origin
    "https://medistore-assignment-70.vercel.app", // deployed frontend if used
  ],

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

  cookies: {
    sessionToken: {
      attributes: {
        sameSite: "none", // required for cross-site cookies
        secure: true,     // MUST be true for HTTPS (Vercel)
      },
    },
  },
});
