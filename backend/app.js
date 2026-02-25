import express from "express";
import "dotenv/config.js";
import cors from "cors";
import morgan from "morgan";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

app.get(("/"), (req,res) => {
    res.send("Greetings from the team of the SafeDischarge");
})

export default app;