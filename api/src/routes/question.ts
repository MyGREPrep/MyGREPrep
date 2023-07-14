import express from "express";
import {
  createOption,
  createQuestion,
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
questionRouter.post("/verify-answer", verifyAnswer)

export default questionRouter;
