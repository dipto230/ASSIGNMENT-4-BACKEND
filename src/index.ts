import app from "./app";
import { prisma } from "./lib/prisma";


export default async function handler(req: any, res: any) {
  try {
    await prisma.$connect();
    return app(req, res);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
