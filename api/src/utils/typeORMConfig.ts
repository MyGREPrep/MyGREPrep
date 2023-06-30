import { Option } from "../entities/Option";
import { Question } from "../entities/Question";
import { User } from "../entities/User";
import { DataSource } from "typeorm";

export const dataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  logging: true,
  synchronize: true,
  entities: [User, Question, Option],
  // migrations: [path.join(__dirname, "./migrations/*")],
});
