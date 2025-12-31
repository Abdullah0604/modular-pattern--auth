import { pool } from "../../config/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../../config";
const loginUser = async (email: string, password: string) => {
  const result = await pool.query("SELECT * FROM users WHERE email=$1", [
    email,
  ]);

  if (!result.rows.length) return null;

  const user = result.rows[0];
  const isMatchPassword = bcrypt.compare(password, user.password);

  if (!isMatchPassword) return false;

  const secret = config.jwt_secret as string;
  const token = jwt.sign(
    { name: user.name, role: user.role, email: user.email },
    secret,
    {
      expiresIn: "7d",
    }
  );

  console.log(token);
  return { token, user };
};

export const authServices = {
  loginUser,
};
