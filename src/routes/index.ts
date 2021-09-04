import userRoute from "./users";
import authRoute from "./auth";

export const setupRoutes = (app) => {
    app.use("/api/users", userRoute);
    app.use("/api/auth", authRoute);
};
