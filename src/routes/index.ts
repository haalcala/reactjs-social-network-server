import userRoute from "./users";
import authRoute from "./auth";
import { Router, Application } from "express";

export const setupRoutes = (app: Application) => {
    app.use("/api/users", userRoute);
    app.use("/api/auth", authRoute);
};
