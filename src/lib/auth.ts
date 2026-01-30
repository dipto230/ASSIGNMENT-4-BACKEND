import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";

export const auth = betterAuth({
  // 🔴 REQUIRED for cross-origin
  baseURL: "http://localhost:5000",

  // 🔴 REQUIRED to trust frontend
  trustedOrigins: ["http://localhost:3000"],

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
    expiresIn: 60 * 60 * 24 * 7,
  },

  
  cookies: {
    sessionToken: {
      attributes: {
        sameSite: "none",
        secure: false,    
      },
    },
  },
});
