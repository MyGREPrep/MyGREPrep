import express from "express";
import { createTopic, getTopic } from "../controllers/topicController";

const topicRouter = express.Router();

/**
 * @swagger
 * /topic/get-topic:
 *      post:
 *          summary: Get a specific topic detail
 *          tags:
 *              - Topic API
 *          description: Get all details like video, description, significance, etc for a topic.
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              topic:
 *                                  type: string
 *                                  example: ratio
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
 *                                          topic:
 *                                              type: object
 *                                              example: { id: 12, type: ratio, description: Ratio topic, significance: MEDUIM, videoUrl: afUJ1H3Df_A, quiz: [{ description: Choose an option, question: This is a sample question, sectionType: VERBAL, correctOption: option1, options: [option1, something, option2] }, { description: Choose an option, question: This is a sample question, sectionType: VERBAL, correctOption: option1, options: [option1, something, option2] }]  }
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
 * /topic/create:
 *      post:
 *          summary: Create a GRE topic
 *          tags:
 *              - Topic API
 *          description: Create a specific GRE topic from the GRE QUANT, VERBAL, and ANALYTICAL sections
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              topic:
 *                                  type: string
 *                                  example: ratio
 *                              description:
 *                                  type: string
 *                                  example: Description for the topic
 *                              significance:
 *                                  type: string,
 *                                  example: LOW
 *                              videoUrl:
 *                                  type: string,
 *                                  example: A3sdsAu
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
 *                                          topic:
 *                                              type: object
 *                                              example: { type: ratio, description: Description for the topic, significance: LOW, videoUrl: A3sdsAu, id: 3, createdAt: 2023-07-22T11:54:56.137Z, updatedAt: 2023-07-22T11:54:56.137Z }
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

topicRouter.post("/create", createTopic);
topicRouter.post("/get-topic", getTopic);

export default topicRouter;
