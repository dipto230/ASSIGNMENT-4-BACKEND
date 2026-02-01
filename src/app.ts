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

const allowedOrigins = [
  "http://localhost:3000",
  "https://medistore-client-side.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // allow server-to-server, Postman, health checks
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.error("Blocked by CORS:", origin);

      // ❗ DO NOT THROW ERROR
      // This keeps the logic (blocked) but allows headers to be sent
      return callback(null, false);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
    ],
  })
);

// preflight handling
app.options("*", cors());

app.get("/", (_req, res) => {
  res.status(200).send("Hello Assignment 4 🚀");
});

app.get("/health", (_req, res) => {
  res.status(200).send("OK");
});

app.use("/api", PublicRouter);

app.all("/api/auth/*", toNodeHandler(auth));

app.use("/api/seller", SellerRouter);
app.use("/api/admin", AdminRouter);
app.use("/api/customer", CustomerRouter);

app.use((err: any, _req: Request, res: Response, _next: Function) => {
  console.error(err.message);
  res.status(500).json({
    message: err.message || "Server error",
  });
});

export default app;
