import express, { Application } from "express";

import { toNodeHandler } from "better-auth/node";
import { postRouter } from "./modules/seller/seller.routes";


const app: Application = express();
app.use(express.json());

app.use("/posts", postRouter)
 

app.get("/", (req, res) => {
  res.send("Hello Assignment 4");
});

export default app;
