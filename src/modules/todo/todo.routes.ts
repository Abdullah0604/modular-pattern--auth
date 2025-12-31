import express from "express";
import { todosControllers } from "./todo.controllers";

const router = express.Router();

router.post("/todo", todosControllers.createTodo);

router.get("/", todosControllers.accessTodos);

export const todoRoutes = router;
