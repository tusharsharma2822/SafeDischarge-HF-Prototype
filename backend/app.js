import express from "express";
import cors from "cors";
import morgan from "morgan";
import "dotenv/config.js";
import generateRoutes from "./routes/generate.routes.js";
import errorHandler from "./middlewares/error.middleware.js";
//import { initializedGuidelines } from "./services/guideline.service.js";
import { initializeGuidelines } from "./services/guideline.service.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

app.use("/generate", generateRoutes);
app.use(errorHandler);

app.get("/",(req, res) => {
    res.send("Greetings from the team of the SafeGuard.");
});

await initializeGuidelines();

export default app;
