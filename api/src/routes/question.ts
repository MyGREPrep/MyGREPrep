import express from "express";
import {
  createOption,
  createQuestion,
  generateMockTest,
  getQuestion,
  options,
  questionIds,
} from "../controllers/questionController";

const questionRouter = express.Router();

questionRouter.post("/create", createQuestion);
questionRouter.get("/question-ids", questionIds);
questionRouter.get("/options", options);
questionRouter.post("/create-option", createOption);
questionRouter.get("/get-question", getQuestion);
questionRouter.get("/generate-mock-test", generateMockTest);

export default questionRouter;
