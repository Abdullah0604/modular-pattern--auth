import express, { Request, Response } from "express";
import { Pool } from "pg";
import config from "./config";
import initDB, { pool } from "./config/db";
import logger from "./middleware/logger";
import { userRoutes } from "./modules/user/user.routes";
import { todoRoutes } from "./modules/todo/todo.routes";
import { authRoutes } from "./modules/auth/auth.routes";
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
app.use("/todos", todoRoutes);

app.use("/auth", authRoutes);

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
