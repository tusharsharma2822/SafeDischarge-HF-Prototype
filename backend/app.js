import express from "express";
import "dotenv/config.js";
import cors from "cors";
import morgan from "morgan";
import generateRoute from "./routes/generate.routes.js";
import errorHandler from "./middlewares/error.middleware.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));
app.use("/generate", generateRoute);

//Health Check
app.get("/health", (req, res) => {
    res.json({ status: "OK" });
});

app.use(errorHandler);

// app.get(("/"), (req, res) => {
    // res.send("Greetings from the team of the SafeDischarge");
// })

export default app;