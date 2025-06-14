import { Router } from "express";
import {
  getuser,
  getAllUsers,
  updateUser,
  deleteUser,
  createUser,
} from "../controllers/user.controller.js";
import catchAsync from "../middleware/asyncWrapper.js";
const userRouter = Router();

userRouter.get("/", catchAsync(getAllUsers));
userRouter.post("/", catchAsync(createUser));
userRouter.get("/:id", catchAsync(getuser));
userRouter.put("/:id", catchAsync(updateUser));
userRouter.delete("/:id", catchAsync(deleteUser));

export default userRouter;
