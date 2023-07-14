import express from "express";
import { createTopic, getTopic } from "../controllers/topicController";

const topicRouter = express.Router();

topicRouter.post("/create", createTopic);
topicRouter.post("/get-topic", getTopic);

export default topicRouter;
