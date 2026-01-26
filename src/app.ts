import express, { Application } from "express"

const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const app: Application = express();
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

app.use("/api/auth", require("./routes/auth.routes"));


app.get("/", (req, res) => {
    res.send("Hello Assignment 4")
})
export default app;