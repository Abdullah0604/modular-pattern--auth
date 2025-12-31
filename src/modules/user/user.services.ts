import { pool } from "../../config/db";
import bcrypt from "bcryptjs";

const createUserDB = async (payload: Record<string, unknown>) => {
  const { name, email, password, role } = payload;
  const hashPassword = await bcrypt.hash(password as string, 10);

  const result = await pool.query(
    `INSERT INTO users(name, email, password, role) VALUES($1, $2, $3, $4) RETURNING *`,
    [name, email, hashPassword, role]
  );

  return result;
};

const accessUsersFromDB = async () => {
  const result = await pool.query(`SELECT * FROM users`);
  return result;
};

const accessUserDB = async (id: string) => {
  const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);

  return result;
};

const updateUserDB = async (name: string, email: string, id: string) => {
  const result = await pool.query(
    `UPDATE users SET name=$1, email=$2  WHERE id=$3 RETURNING *`,
    [name, email, id]
  );

  return result;
};

const deleteUserDB = async (id: string) => {
  const result = await pool.query(`DELETE FROM users WHERE id = $1`, [id]);
  return result;
};
export const userServices = {
  createUserDB,
  accessUsersFromDB,
  accessUserDB,
  updateUserDB,
  deleteUserDB,
};
