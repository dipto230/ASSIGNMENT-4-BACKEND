import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:5000",

  database: prismaAdapter(prisma, { provider: "postgresql" }),

  trustedOrigins: async (request) => {
    const origin = request?.headers.get("origin");
    const allowedOrigins = [
      process.env.FRONTEND_URL, // frontend
      process.env.BETTER_AUTH_URL, // backend
      "http://localhost:3000", // local dev
    ].filter(Boolean);

    if (!origin || allowedOrigins.includes(origin) || /^https:\/\/.*\.vercel\.app$/.test(origin)) {
      return [origin];
    }
    return [];
  },

  basePath: "/api/auth",

  user: {
    additionalFields: {
      role: { type: "string", defaultValue: "CUSTOMER", required: false },
      phone: { type: "string", required: false },
      status: { type: "string", defaultValue: "ACTIVE", required: false },
    },
  },

  emailAndPassword: { enabled: true, autoSignIn: true, requireEmailVerification: false },

  session: {
    cookieCache: { enabled: true, maxAge: 7 * 24 * 60 * 60 }, // 7 days
    cookieOptions: {
      httpOnly: true,
      secure: true,       // HTTPS only
      sameSite: "none",   // ⚡ Must be None for cross-domain
      path: "/",
    },
  },

  advanced: {
    cookiePrefix: "better-auth",
    useSecureCookies: true,
    crossSubDomainCookies: { enabled: true },
    disableCSRFCheck: true,
  },
});
