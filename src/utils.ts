import {DataSource} from "typeorm";
import {  Skill } from "./entities/Skill"
import { Wilder } from "./entities/Wilder"
import { Upvote } from "./entities/Upvotes"

export const dataSource = new DataSource({
  type: "postgres",
  host: "db",
  port: 5432,
  username: "postgres",
  password: "youcef",
  database: "postgres",
  synchronize: true,
  entities: [
    Wilder, Skill, Upvote
  ],
  logging: ["query", "error"],
});

