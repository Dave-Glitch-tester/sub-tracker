import { Router } from "express";
import { login, logout, register } from "../controllers/auth.controller.js";
import catchAsync from "../middleware/asyncWrapper.js";
const authRouter = new Router();

authRouter.post("/sign-in", catchAsync(login));
authRouter.post("/sign-up", catchAsync(register));
authRouter.post("/sign-out", catchAsync(logout));

export default authRouter;
