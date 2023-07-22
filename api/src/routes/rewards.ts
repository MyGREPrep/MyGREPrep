import express from "express";
import {
  addRewards,
  getRewards,
  removeRewards,
} from "../controllers/rewardController";

const rewardsRouter = express.Router();

/**
 * @swagger
 * /reward/get-rewards:
 *      post:
 *          summary: Get the rewards of a specific user
 *          tags:
 *              - Rewards API
 *          description: Send a email to the server and get their rewards
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              userEmail:
 *                                  type: string
 *                                  example: joelmathewkoshy@gmail.com
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
 *                                          reward:
 *                                              type: integer
 *                                              example: 100
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

/**
 * @swagger
 * /reward/add-rewards:
 *      post:
 *          summary: Increment rewards of a user
 *          tags:
 *              - Rewards API
 *          description: Send a email to the server and increment their reward points
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              email:
 *                                  type: string
 *                                  example: joelmathewkoshy@gmail.com
 *                              rewards:
 *                                  type: integer
 *                                  example: 50
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
 *                                          reward:
 *                                              type: integer
 *                                              example: 150
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

/**
 * @swagger
 * /reward/remove-rewards:
 *      post:
 *          summary: Decrement rewards of a user
 *          tags:
 *              - Rewards API
 *          description: Send a email to the server and decrement their reward points
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              email:
 *                                  type: string
 *                                  example: joelmathewkoshy@gmail.com
 *                              points:
 *                                  type: integer
 *                                  example: 10
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
 *                                          reward:
 *                                              type: integer
 *                                              example: 140
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

rewardsRouter.post("/get-rewards", getRewards);
rewardsRouter.post("/add-rewards", addRewards);
rewardsRouter.post("/remove-rewards", removeRewards);

export default rewardsRouter;
