import serverless from "serverless-http";
import app from "./app";
import { prisma } from "./lib/prisma";

let prismaConnected = false;

const handler = serverless(app);

export default async function (req: any, res: any) {
  try {
    if (!prismaConnected) {
      await prisma.$connect();
      prismaConnected = true;
      console.log("DB Connected");
    }

    return handler(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}
