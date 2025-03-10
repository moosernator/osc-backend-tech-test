import { createConnection } from "mysql2/promise";
import { config } from "dotenv";

config();

export const createDatabaseConnection = async () => {
  return createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: Number(process.env.MYSQL_PORT),
  });
};
