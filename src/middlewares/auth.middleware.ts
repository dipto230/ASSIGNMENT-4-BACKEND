import { auth } from "../lib/auth";
import { NextFunction, Response } from "express";

export const verifyAuth = async (req: any, res: Response, next: NextFunction) => {
  console.log("➡️ verifyAuth hit");

  const cookie = req.headers.cookie;
  console.log("🍪 Incoming cookie:", cookie);

  if (!cookie) {
    console.log("❌ No cookie found on request");
    return res.status(401).json({ message: "No cookie" });
  }

  const session = await auth.api.getSession({
    headers: {
      cookie,
    },
  });

  console.log("🧠 Session result:", session);

  if (!session?.user) {
    console.log("❌ Session invalid or missing user");
    return res.status(401).json({ message: "Unauthorized" });
  }

  console.log("✅ Authenticated user:", session.user.email);

  req.user = session.user;
  next();
};
