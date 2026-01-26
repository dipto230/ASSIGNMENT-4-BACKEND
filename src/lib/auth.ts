import { betterAuth } from "better-auth";
import { prisma } from "./prisma";

export const auth = betterAuth({
  database: {
    provider: "prisma",
    prisma,
  },

  user: {
    fields: {
      email: "email",
      password: "password",
      name: "name",
    },
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "CUSTOMER",
      },
      status: {
        type: "string",
        defaultValue: "ACTIVE",
      },
    },
  },

  session: {
    strategy: "jwt", // better-auth managed JWT
  },

  security: {
    passwordHash: "bcrypt",
  },
});
