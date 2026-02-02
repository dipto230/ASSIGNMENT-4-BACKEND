import { auth } from "../lib/auth";
import { NextFunction, Response } from "express";

export const verifyAuth = async (req: any, res: Response, next: NextFunction) => {
  
  // const cookieHeader = req.headers.cookie || "";
 

  const session = await auth.api.getSession({
    // headers: { cookie: cookieHeader },
    headers: req.headers as any
  });

  if (!session?.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  req.user = session.user;
  next();
};