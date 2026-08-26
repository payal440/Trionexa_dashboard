import express from "express";
import authRoutes from "../src/modules/auth/auth.routes.js";
import userRoutes from "../src/modules/users/user.route.js"

import {errorMiddleware} from "../middlewares/error.middleware.js";

const app = express();

app.use(express.json());

app.get("/", ( req,res) => {
    res.send("Welcome to the API");
});

app.get("/health", (req, res) => {
    res.status(200).json({ status: "OK" });
});

app.use("/api/auth", authRoutes);
app.use("/api", authRoutes);
app.use("/api/users",userRoutes)

app.use(errorMiddleware);

export default app;