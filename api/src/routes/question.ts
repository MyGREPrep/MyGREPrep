import express from "express";
import {
  createOption,
  createQuestion,
  generateMockTest,
  getQuestion,
  options,
  questionIds,
  verifyAnswer,
} from "../controllers/questionController";

const questionRouter = express.Router();

/**
 * @swagger
 * /question/create:
 *      post:
 *          summary: Create a new question
 *          tags:
 *              - Question API
 *          description: Create a new question to store in the database. This is served for mock tests and quizes
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              description:
 *                                  type: string
 *                                  example: Choose the right option
 *                              sectionType:
 *                                  type: string
 *                                  example: QUANTITATIVE
 *                              question:
 *                                  type: string
 *                                  example: What is square root of 16?
 *                              topicType:
 *                                  type: string
 *                                  example: roots
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
 *                                          question:
 *                                              type: object
 *                                              example: { description: Choose the right option, sectionType: QUANTITATIVE, question: What is the square root of 16?, topicType: roots, id: 41, createdAt: 2023-07-22T11:26:07.995Z, updatedAt: 2023-07-22T11:26:07.995Z  }
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
 * /question/generate-mock-test:
 *      get:
 *          summary: Create a mock test
 *          tags:
 *              - Question API
 *          description: Generate a mock test from random sections and topics
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
 *                                          questions:
 *                                              type: array
 *                                              example: [{ description: Choose the right option, sectionType: QUANTITATIVE, question: What is the square root of 16?, correctOption: 4, options: [4, 56, 5, 7] }]
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
 * /question/create-option:
 *      post:
 *          summary: Create a new option for a question
 *          tags:
 *              - Question API
 *          description: Create a new option for an EXISTING question to store in the database. This is served for mock tests and quizes.
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              option:
 *                                  type: string
 *                                  example: 122
 *                              questionId:
 *                                  type: integer
 *                                  example: 37
 *                              isCorrect:
 *                                  type: boolean
 *                                  example: false
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
 *                                          option:
 *                                              type: object
 *                                              example: { option: 122, isCorrect: false, questionId: 37, id: 35, createdAt: 2023-07-22T11:26:07.995Z, updatedAt: 2023-07-22T11:26:07.995Z  }
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
 * /question/verify-answer:
 *      post:
 *          summary: Verify the answer
 *          tags:
 *              - Question API
 *          description: Verify the answer user selects to a question
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              questionId:
 *                                  type: integer
 *                                  example: 37
 *                              selectedAnswer:
 *                                  type: string
 *                                  example: 7
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

questionRouter.post("/create", createQuestion);
questionRouter.get("/question-ids", questionIds);
questionRouter.get("/options", options);
questionRouter.post("/create-option", createOption);
questionRouter.get("/get-question", getQuestion);
questionRouter.post("/verify-answer", verifyAnswer);
questionRouter.get("/generate-mock-test", generateMockTest);

export default questionRouter;
