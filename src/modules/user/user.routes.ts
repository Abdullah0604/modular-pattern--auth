import express, { Request, Response } from "express";
import { pool } from "../../config/db";

const router = express.Router();

// localhost:5000/users
router.post("/", async (req: Request, res: Response) => {
  const body = req.body;
  const { name, email } = body;

  console.log(body);

  try {
    const result = await pool.query(
      `INSERT INTO users(name, email) VALUES($1, $2) RETURNING *`,
      [name, email]
    );

    console.log(result.rows);
    res.status(201).send(
      JSON.stringify({
        success: "Succeed!!",
        message: "User is created successfully",
        data: result.rows[0],
      })
    );
  } catch (error: any) {
    console.log(error);
    res.status(500).send(
      JSON.stringify({
        success: "Failed!!",
        message: error.message,
      })
    );
  }
});

router.get("/", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`SELECT * FROM users`);

    console.log(result);
    res.status(200).json({
      sucess: true,
      message: "Users retrived successfully!",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(200).json({
      sucess: false,
      message: "Users didn't retrived successfully!",
      data: error,
    });
  }
});
export const userRoutes = router;
