import express from "express";
import { createMockTestScore } from "../controllers/mockTestScoreController";

const mockTestRouter = express.Router();

/**
 * @swagger
 * /mocktest/create-score:
 *      post:
 *          summary: Create a mock test score
 *          tags:
 *              - Mock Test API
 *          description: Store a mock test score associated with a user after they complete a mock test in database
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
 *                              score:
 *                                  type: integer
 *                                  example: 340
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
 *                                          mockTestScore:
 *                                              type: object
 *                                              example: { userId: 1, score: 340, id: 29, createdAt: 2023-07-22T11:16:32.922Z, updatedAt: 2023-07-22T11:16:32.922Z }
 *                                          reward:
 *                                              type: integer
 *                                              example: 0
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

mockTestRouter.post("/create-score", createMockTestScore);

export default mockTestRouter;
