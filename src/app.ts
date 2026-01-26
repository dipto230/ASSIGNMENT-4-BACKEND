import express, { Application } from "express";

import { toNodeHandler } from "better-auth/node";
import { SellerRouter } from "./modules/seller/seller.routes";
import { auth } from "./lib/auth";
import { AdminRouter } from "./modules/admin/admin.routes";
import { PublicRouter } from "./modules/public/public.routes";



const app: Application = express();
app.use(express.json());
app.all("/api/auth/*splat", toNodeHandler(auth));

app.use("/api/seller", SellerRouter);
app.use("/api/admin", AdminRouter);
app.use("/api", PublicRouter);
 

app.get("/", (req, res) => {
  res.send("Hello Assignment 4");
});

export default app;
