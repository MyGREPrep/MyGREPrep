import express from "express";
import {
  addRewards,
  getRewards,
  removeRewards,
} from "../controllers/rewardController";

const rewardsRouter = express.Router();

rewardsRouter.post("/get-rewards", getRewards);
rewardsRouter.post("/add-rewards", addRewards);
rewardsRouter.post("/remove-rewards", removeRewards);

export default rewardsRouter;
