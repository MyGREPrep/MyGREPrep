import express from "express";
import { fetchScores } from "../controllers/leaderboardController";

const leaderboardRouter = express.Router();

leaderboardRouter.get("/fetch-scores", fetchScores);

export default leaderboardRouter;
