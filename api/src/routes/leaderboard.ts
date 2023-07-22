import express from "express";
import { fetchScores } from "../controllers/leaderboardController";

const leaderboardRouter = express.Router();

/**
 * @swagger
 * /leaderboard/fetch-scores:
 *      get:
 *          summary: Fetch the leaderboard
 *          tags:
 *              - Leaderboard API
 *          description: Get the complete leaderboard for users in the app
 *          responses:
 *              201:
 *                  description: Success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  status:
 *                                      type: boolean
 *                                      example: true
 *                                  payload:
 *                                      type: object
 *                                      properties:
 *                                          mockTestScores:
 *                                              type: array
 *                                              example: [{ id: 1, name: "Luqmaan Shaik", score: 320 }, { id: 23, name: "Samreetha Williams", score: 310 }]
 *              501:
 *                  description: Error
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  status:
 *                                      type: boolean
 *                                      example: false
 */

leaderboardRouter.get("/fetch-scores", fetchScores);

export default leaderboardRouter;
