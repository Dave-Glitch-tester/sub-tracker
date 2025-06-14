import { Router } from "express";
import { sendRemainders } from "../controllers/worker.controller.js";
const workerRouter = Router();

workerRouter.post("/sendremainders", sendRemainders);

export default workerRouter;
