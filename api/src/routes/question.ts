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

questionRouter.post("/create", createQuestion);
questionRouter.get("/question-ids", questionIds);
questionRouter.get("/options", options);
questionRouter.post("/create-option", createOption);
questionRouter.get("/get-question", getQuestion);
questionRouter.post("/verify-answer", verifyAnswer);
questionRouter.get("/generate-mock-test", generateMockTest);

export default questionRouter;
