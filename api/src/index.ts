import "dotenv/config";
import express from "express";
import cors from "cors";
import os from "os";
import { mainRouter, questionRouter, topicRouter, userRouter } from "./routes";
import { dataSource } from "./utils/typeORMConfig";
import Redis from "ioredis";
import rewardsRouter from "./routes/rewards";
import mockTestRouter from "./routes/mockTest";
import leaderboardRouter from "./routes/leaderboard";

const main = async () => {
  // connecting to the postgres DB
  await dataSource.initialize();

  // initializing the express server
  const app = express();

  const redis = new Redis(process.env.REDIS_URL);

  app.use(
    cors({
      origin: [""],
      credentials: true,
    })
  );

  app.use(express.json());

  app.use((_, __, next) => {
    app.locals.context = { redis, dataSource };

    next();
  });

  app.use("/", mainRouter);
  app.use("/user", userRouter);
  app.use("/question", questionRouter);
  app.use("/topic", topicRouter);
  app.use("/rewards", rewardsRouter);
  app.use("/mocktest", mockTestRouter);
  app.use("/leaderboard", leaderboardRouter);

  app.listen(parseInt(process.env.PORT), () => {
    console.log(
      `@mygreprep/api running at ${os.hostname} at port ${process.env.PORT}`
    );
  });
};

main().catch((error) => {
  console.log(error);
});
