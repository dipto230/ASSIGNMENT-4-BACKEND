import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";


export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:5000",

  database: prismaAdapter(prisma, { provider: "postgresql" }),

trustedOrigins: [
  process.env.FRONTEND_URL!,
  "http://localhost:3000",
],


  // basePath: "/api/auth",

  user: {
    additionalFields: {
      role: { type: "string", defaultValue: "CUSTOMER", required: false },
      phone: { type: "string", required: false },
      status: { type: "string", defaultValue: "ACTIVE", required: false },
    },
  },

  emailAndPassword: { enabled: true, autoSignIn: true, requireEmailVerification: false },

  // session: {
  //   cookieCache: { enabled: true, maxAge: 7 * 24 * 60 * 60 }, 
  //   cookieOptions: {
  //     httpOnly: true,
  //     secure: true,       
  //     sameSite: "none",
  //     path: "/",
  //   },
  // },

  // advanced: {
  //   cookiePrefix: "better-auth",
  //   useSecureCookies: true,
  //   crossSubDomainCookies: { enabled: true },
  //   disableCSRFCheck: true,
  // },
advanced: {
  defaultCookieAttributes: {
    sameSite: "none",
    secure: true,
    httpOnly: true,
    path: "/",
  },
},

});
