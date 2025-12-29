import express, { Request, Response } from "express";
import { Pool } from "pg";
import config from "./config";
import initDB, { pool } from "./config/db";
import logger from "./middleware/logger";
import { userRoutes } from "./modules/user/user.routes";
const app = express();
const port = config.port;

app.use(express.json());

initDB();

app.get("/", logger, (req: Request, res: Response) => {
  res.send("Hello Next Level Developer!");
});

// users crud
app.use("/users", userRoutes);

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
