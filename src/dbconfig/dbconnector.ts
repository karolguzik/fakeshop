import { Pool } from "pg";

export const pool = new Pool({
  user: process.env.DB_USER_LOCAL,
  host: process.env.DB_HOST_LOCAL,
  database: process.env.DB_NAME_LOCAL,
  password: process.env.DB_PASSWORD_LOCAL,
  port: 5432,
});

export const connectToDB = async () => {
  try {
    return await pool.connect();
  } catch (error) {
    console.log(error);
  }
};
