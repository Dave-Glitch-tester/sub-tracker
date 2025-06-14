import { Router } from "express";
import {
  getSubscription,
  createSubscription,
  updateSubscription,
  deleteSubscription,
  getsubscriptiondetails,
} from "../controllers/subscription.controller.js";
import catchAsync from "../middleware/asyncWrapper.js";
const subscriptionRouter = Router();

subscriptionRouter.get("/", catchAsync(getSubscription));
subscriptionRouter.post("/", catchAsync(createSubscription));
subscriptionRouter.get("/:id", catchAsync(getsubscriptiondetails));
subscriptionRouter.put("/:id", catchAsync(updateSubscription));
subscriptionRouter.delete("/:id/cancel", catchAsync(deleteSubscription));

export default subscriptionRouter;
