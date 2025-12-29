import { Request, Response } from "express";
import { pool } from "../../config/db";
import { userServices } from "./user.services";

const createUser = async (req: Request, res: Response) => {
  const body = req.body;
  const { name, email } = body;

  console.log(body);

  try {
    const result = await userServices.createUserDB(name, email);

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
};

const accessUsers = async (req: Request, res: Response) => {
  try {
    const result = await userServices.accessUsersFromDB();

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
};
export const userControllers = {
  createUser,
  accessUsers,
};
