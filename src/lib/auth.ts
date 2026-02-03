import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";

export const auth = betterAuth({
  baseURL: "https://redeploy-medistore.vercel.app",

  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  trustedOrigins: [
    "https://medistore-client-side.vercel.app",
    "http://localhost:3000",
  ],

  
  events: {
    async createUser({ user, request }) {
      try {
        const body = await request.json();

        const role =
          body?.additionalFields?.role === "SELLER"
            ? "SELLER"
            : "CUSTOMER";

        await prisma.user.update({
          where: { id: user.id },
          data: { role },
        });
      } catch (error) {
        console.error("Failed to assign role:", error);
      }
    },
  },

  user: {
    additionalFields: {
      role: {
        type: "string",
        required: true,
      },
    },
  },

  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    requireEmailVerification: false,
  },

  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,
    },

  
  },

  advanced: {
    cookiePrefix: "better-auth",
    useSecureCookies: process.env.NODE_ENV === "production",

    crossSubDomainCookies: {
      enabled: false,
    },

    disableCSRFCheck: true,

    defaultCookieAttributes: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      path: "/",
    },
  },
});
