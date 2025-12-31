import { Request, Response } from "express";
import { pool } from "../../config/db";
import { userServices } from "./user.services";

const createUser = async (req: Request, res: Response) => {
  const { body } = req;

  console.log(body);

  try {
    const result = await userServices.createUserDB(body);

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

const accessUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.accessUserDB(req.params.id!);

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
};

const updateUser = async (req: Request, res: Response) => {
  const { name, email } = req.body;
  try {
    const result = await userServices.updateUserDB(name, email, req.params.id!);
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
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.deleteUserDB(req.params.id!);

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
};

export const userControllers = {
  createUser,
  accessUsers,
  accessUser,
  updateUser,
  deleteUser,
};
