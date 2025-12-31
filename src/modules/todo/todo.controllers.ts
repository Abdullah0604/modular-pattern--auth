import { Request, Response } from "express";
import { todosServices } from "./todo.services";

const createTodo = async (req: Request, res: Response) => {
  const { user_id, title } = req.body;

  try {
    const result = await todosServices.createTodoDB(user_id, title);

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
};

const accessTodos = async (req: Request, res: Response) => {
  try {
    const result = await todosServices.accessTodosDB();

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
};

export const todosControllers = {
  createTodo,
  accessTodos,
};
