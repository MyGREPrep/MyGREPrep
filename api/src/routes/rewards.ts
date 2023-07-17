import express from "express";
import { addRewards, getRewards } from "../controllers/rewardController";

const rewardsRouter = express.Router();

rewardsRouter.post("/get-rewards", getRewards);
rewardsRouter.post("/add-rewards", addRewards);

export default rewardsRouter;
