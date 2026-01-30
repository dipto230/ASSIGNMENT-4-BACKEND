import express, { Application } from "express";
import { toNodeHandler } from "better-auth/node";
import { SellerRouter } from "./modules/seller/seller.routes";
import { auth } from "./lib/auth";
import { AdminRouter } from "./modules/admin/admin.routes";
import { PublicRouter } from "./modules/public/public.routes";
import { CustomerRouter } from "./customer/customer.routes";
import cors from "cors";
import cookieParser from "cookie-parser";

const app: Application = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());


app.get("/api/auth/session", async (req, res) => {
  try {
    const session = await auth.api.getSession({ headers: req.headers });
    if (!session?.user) {
      return res.status(401).json({ message: "Not logged in" });
    }
    res.json(session);
  } catch (error) {
    res.status(500).json({ message: "Failed to get session", error });
  }
});

// All other BetterAuth routes
app.all("/api/auth/*splat", toNodeHandler(auth));

// Routers
app.use("/api/seller", SellerRouter);
app.use("/api/admin", AdminRouter);
app.use("/api", PublicRouter);
app.use("/api/customer", CustomerRouter);

// Root route
app.get("/", (req, res) => {
  res.send("Hello Assignment 4");
});

export default app;
