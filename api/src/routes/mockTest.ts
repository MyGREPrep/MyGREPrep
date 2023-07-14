import express from "express";
import { createMockTestScore } from "../controllers/mockTestScoreController";

const mockTestRouter = express.Router();

mockTestRouter.post("/create-score", createMockTestScore);

export default mockTestRouter;
