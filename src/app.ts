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



app.use(helmet());
app.use(express.json());
app.use(cookieParser());


const allowedOrigins = [
  process.env.APP_URL || "http://localhost:3000",
  process.env.PROD_APP_URL,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true); 
      if (allowedOrigins.includes(origin)) {
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


app.get("/", (req: Request, res: Response) => {
  res.send("Hello Assignment 4 🚀");
});


app.get("/favicon.png", (req, res) => res.status(204).end());
app.get("/favicon.ico", (req, res) => res.status(204).end());



app.get("/api/auth/session", async (req: Request, res: Response) => {
  try {
    const headers = new Headers();
    Object.entries(req.headers).forEach(([key, value]) => {
      if (typeof value === "string") headers.set(key, value);
    });

    const session = await auth.api.getSession({ headers });

    if (!session?.user) {
      return res.status(401).json({ message: "Not logged in" });
    }

    res.json(session);
  } catch (error) {
    res.status(500).json({ message: "Failed to get session", error });
  }
});


app.all("/api/auth/*splat", toNodeHandler(auth));


app.use("/api", PublicRouter);


app.use("/api/seller", SellerRouter);
app.use("/api/admin", AdminRouter);
app.use("/api/customer", CustomerRouter);


app.use((err: any, req: Request, res: Response, next: Function) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ message: err.message || "Server error" });
});

export default app;
