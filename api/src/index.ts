import "dotenv/config";
import express from "express";
import cors from "cors";
import os from "os";
import { mainRouter } from "./routes";
import { dataSource } from "./utils/typeORMConfig";

const main = async () => {
  // connecting to the postgres DB
  await dataSource.initialize();

  // initializing the express server
  const app = express();

  app.use(
    cors({
      origin: [""],
      credentials: true,
    })
  );

  app.use("/", mainRouter);

  app.listen(process.env.PORT, () => {
    console.log(
      `@mygreprep/api running at ${os.hostname} at port ${process.env.PORT}`
    );
  });
};

main().catch((error) => {
  console.log(error);
});