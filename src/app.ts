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
      if (!origin) return callback(null, true); 
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      console.warn("Blocked by CORS:", origin);
      return callback(null, false); 
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


app.get("/", (_req: Request, res: Response) => {
  res.status(200).send("Hello Assignment 4 🚀");
});

app.get("/health", (_req: Request, res: Response) => {
  res.status(200).send("OK");
});

app.get("/favicon.ico", (_req: Request, res: Response) => {
  res.status(204).end();
});

app.get("/favicon.png", (_req: Request, res: Response) => {
  res.status(204).end();
});



app.use("/api", PublicRouter);



app.get("/api/auth/session", async (req: Request, res: Response) => {
  try {
    const headers = new Headers();
    Object.entries(req.headers).forEach(([key, value]) => {
      if (typeof value === "string") {
        headers.set(key, value);
      }
    });

    const session = await auth.api.getSession({ headers });

    if (!session?.user) {
      return res.status(401).json({ message: "Not logged in" });
    }

    res.status(200).json(session);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get session",
      error,
    });
  }
});



app.all("/api/auth/*splat", toNodeHandler(auth));



app.use("/api/seller", SellerRouter);
app.use("/api/admin", AdminRouter);
app.use("/api/customer", CustomerRouter);



app.use(
  (err: any, _req: Request, res: Response, _next: Function) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
      message: err.message || "Server error",
    });
  }
);

export default app;
