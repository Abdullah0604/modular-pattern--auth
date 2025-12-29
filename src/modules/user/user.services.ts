import { pool } from "../../config/db";

const createUserDB = async (name: string, email: string) => {
  const result = await pool.query(
    `INSERT INTO users(name, email) VALUES($1, $2) RETURNING *`,
    [name, email]
  );

  return result;
};

const accessUsersFromDB = async () => {
  const result = await pool.query(`SELECT * FROM users`);
  return result;
};
export const userServices = {
  createUserDB,
  accessUsersFromDB,
};
