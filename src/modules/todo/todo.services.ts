import { pool } from "../../config/db";

const createTodoDB = async (userId: string, title: string) => {
  const result = await pool.query(
    `INSERT INTO todos(user_id, title) VALUES($1, $2)`,
    [userId, title]
  );

  return result;
};

const accessTodosDB = async () => {
  const result = await pool.query(`SELECT * FROM todos`);
  return result;
};
export const todosServices = {
  createTodoDB,
  accessTodosDB,
};
