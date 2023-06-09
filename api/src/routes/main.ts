import express from "express";

const mainRouter = express.Router();

mainRouter.get("/", (req, res) => {
  res.send("MyGrePrep API says hello!");
});

export default mainRouter;
