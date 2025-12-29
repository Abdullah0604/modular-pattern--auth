import express, { Request, Response } from "express";
import { Pool } from "pg";
import config from "./config";
import initDB, { pool } from "./config/db";
import logger from "./middleware/logger";
const app = express();
const port = config.port;

app.use(express.json());

initDB();

app.get("/", logger, (req: Request, res: Response) => {
  res.send("Hello Next Level Developer!");
});

app.post("/users/user", async (req: Request, res: Response) => {
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

app.get("/users", async (req: Request, res: Response) => {
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

app.get("/users/user/:id", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [
      req.params.id,
    ]);

    console.log(result.rows);
    if (!result.rows.length) {
      res.status(404).json({
        sucess: false,
        message: "user is not found!",
        userID: req.params.id,
      });
    }

    res.status(200).json({
      sucess: true,
      message: "User retrived successfully!",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      sucess: false,
      message: "Users didn't retrived successfully!",
      data: error,
    });
  }
});

app.put("/users/user/:id", async (req: Request, res: Response) => {
  const { name, email } = req.body;
  try {
    const result = await pool.query(
      `UPDATE users SET name=$1, email=$2  WHERE id=$3 RETURNING *`,
      [name, email, req.params.id]
    );

    console.log(result.rows);
    if (!result.rows.length) {
      res.status(404).json({
        sucess: false,
        message: "user is not found!",
        userID: req.params.id,
      });
    }

    res.status(200).json({
      sucess: true,
      message: "User retrived successfully!",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      sucess: false,
      message: "Users didn't retrived successfully!",
      data: error.message,
    });
  }
});

app.delete("/users/user/:id", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`DELETE FROM users WHERE id = $1`, [
      req.params.id,
    ]);

    console.log("Delete method: ", result);
    if (!result.rowCount) {
      res.status(404).json({
        sucess: false,
        message: "user is not found!",
        userID: req.params.id,
      });
    }

    res.status(200).json({
      sucess: true,
      message: "User deleted successfully!",
      data: null,
    });
  } catch (error: any) {
    res.status(500).json({
      sucess: false,
      message: "Users didn't retrived successfully!",
      data: error,
    });
  }
});

// todos crud
app.post("/todos/todo", async (req: Request, res: Response) => {
  const { user_id, title } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO todos(user_id, title) VALUES($1, $2)`,
      [user_id, title]
    );

    console.log(result);
    res.status(201).json({
      success: true,
      message: "Todo is created!!",
      data: result.rows,
    });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

app.get("/todos", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`SELECT * FROM todos`);

    console.log(result);
    res.status(200).json({
      sucess: true,
      message: "Todos retrived successfully!",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(200).json({
      sucess: false,
      message: "Todos didn't retrived successfully!",
      data: error,
    });
  }
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Rout Not found!",
    path: req.path,
    url: req.url,
  });
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
