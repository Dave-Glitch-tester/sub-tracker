import express from "express";
import cookieParser from "cookie-parser";
import connectDB from "./db/connect.js";
import authRoutes from "./Routes/auth.routes.js";
import subscriptionRoutes from "./Routes/subscription.routes.js";
import workerRoutes from "./Routes/workflow.routes.js";
import userRoutes from "./Routes/user.routes.js";
import Auth from "./middleware/auth.js";
import arcjetmiddleware from "./middleware/arcjet.middleware.js";
import errorHandler from "./Errors/errorHandler.js";
const app = express();
import { PORT } from "./config/env.js";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(arcjetmiddleware);
app.use(cookieParser());
// Define all the endpoints for the application
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", Auth, userRoutes);
app.use("/api/v1/subscription", Auth, subscriptionRoutes);
app.use("/api/v1/workflow", workerRoutes);

app.use(errorHandler);
app.get("/", (req, res) => {
  res.send("Welcome to Subscription Tracker!");
});
async function start() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(
      `Subscription Tracker is Listening on http://localhost:${PORT}`
    );
  });
}
start();

export default app;
