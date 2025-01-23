import express from "express";
const dadosRouter = express.Router();
import { targetChalenge } from "../controlles/dados.controller.js";

dadosRouter.get("/", targetChalenge);

export default dadosRouter;