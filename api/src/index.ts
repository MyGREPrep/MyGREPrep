import "dotenv/config";
import express from "express";
import cors from "cors";
import os from "os";
import { questionRouter, topicRouter, userRouter } from "./routes";
import { dataSource } from "./utils/typeORMConfig";
import Redis from "ioredis";
import rewardsRouter from "./routes/rewards";
import mockTestRouter from "./routes/mockTest";
import leaderboardRouter from "./routes/leaderboard";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

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

  const options = {
    definition: {
      openapi: "3.1.0",
      info: {
        title: "The official documentation for MyGREPrep API",
        version: "0.1.0",
        description: "API for MyGREPrep, a GRE prep application",
        license: {
          name: "MIT",
          url: "https://spdx.org/licenses/MIT.html",
        },
        contact: {
          name: "MyGREPrep",
          url: "https://mygreprep.online",
          email: "mygreprep9@gmail.com",
        },
      },
      servers: [
        {
          url: "https://mygreprep.api.endpoint",
        },
      ],
    },
    apis: [
      "dist/routes/user.js",
      "dist/routes/question.js",
      "dist/routes/topic.js",
      "dist/routes/mockTest.js",
      "dist/routes/rewards.js",
      "dist/routes/leaderboard.js",
    ],
  };

  const specs = swaggerJsdoc(options);

  app.use("/", swaggerUi.serve, swaggerUi.setup(specs));
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
