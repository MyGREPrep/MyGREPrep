import { Option } from "../entities/Option";
import { Question } from "../entities/Question";
import { User } from "../entities/User";
import { DataSource } from "typeorm";

export const dataSource = new DataSource({
  type: "postgres",
  database: process.env.POSTGRES_DBNAME,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  logging: true,
  synchronize: true,
  entities: [User, Question, Option],
  // migrations: [path.join(__dirname, "./migrations/*")],
});
