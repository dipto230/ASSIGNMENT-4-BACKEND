import { Response, NextFunction } from "express";

export const verifySeller = (req: any, res: Response, next: NextFunction) => {
  if (req.user?.role !== "SELLER") {
    return res.status(403).json({ message: "Seller access only" });
  }
  next();
};

export const verifyAdmin = (req: any, res: Response, next: NextFunction) => {
  if (req.user?.role !== "ADMIN") {
    return res.status(403).json({ message: "Admin access only" });
  }
  next();
};
