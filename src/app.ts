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


app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://medistore-client-side.vercel.app",
    ],
    credentials: true,
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
