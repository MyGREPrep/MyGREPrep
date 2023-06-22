import "dotenv/config";
import express from "express";
import cors from "cors";
import os from "os";
import { mainRouter, questionRouter, userRouter } from "./routes";
import { dataSource } from "./utils/typeORMConfig";
import Redis from "ioredis";

const main = async () => {
  // connecting to the postgres DB
  await dataSource.initialize();

  // initializing the express server
  const app = express();

  const redis = new Redis();

  app.use(
    cors({
      origin: [""],
      credentials: true,
    })
  );

  app.use(express.json());

  app.use((req, res, next) => {
    app.locals.context = { redis, dataSource };

    next();
  });

  app.use("/", mainRouter);
  app.use("/user", userRouter);
  app.use("/question", questionRouter);

  app.listen(process.env.PORT, () => {
    console.log(
      `@mygreprep/api running at ${os.hostname} at port ${process.env.PORT}`
    );
  });
};

main().catch((error) => {
  console.log(error);
});
