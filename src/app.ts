import express, { Application, Request, Response } from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";

import { SellerRouter } from "./modules/seller/seller.routes";
import { AdminRouter } from "./modules/admin/admin.routes";
import { PublicRouter } from "./modules/public/public.routes";
import { CustomerRouter } from "./customer/customer.routes";

const app: Application = express();

app.set("trust proxy", 1);

app.use(helmet());
app.use(express.json());
app.use(cookieParser());

/**
 * CORS configuration
 * - Supports local dev
 * - Production frontend
 * - Vercel preview deployments
 */
const allowedOrigins = [
  process.env.APP_URL || "http://localhost:3000",
  process.env.PROD_APP_URL || "https://medistore-client-side.vercel.app",
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (Postman, mobile apps, etc.)
      if (!origin) return callback(null, true);

      const isAllowed =
        allowedOrigins.includes(origin) ||
        /^https:\/\/medistore-client-side.*\.vercel\.app$/.test(origin) ||
        /^https:\/\/.*\.vercel\.app$/.test(origin);

      if (isAllowed) {
        callback(null, true);
      } else {
        callback(new Error(`Origin ${origin} not allowed by CORS`));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
    exposedHeaders: ["Set-Cookie"],
  })
);

app.get("/", (_req, res) => {
  res.status(200).send("Hello Assignment 4 🚀");
});

app.get("/health", (_req, res) => {
  res.status(200).send("OK");
});

app.all("/api/auth/*splat", toNodeHandler(auth));

app.use("/api", PublicRouter);
app.use("/api/customer", CustomerRouter);
app.use("/api/seller", SellerRouter);
app.use("/api/admin", AdminRouter);

app.use((err: any, _req: Request, res: Response, _next: Function) => {
  console.error(err);
  res.status(500).json({
    message: err.message || "Server error",
  });
});

export default app;
