import { Request, Response } from "express";
import { authServices } from "./auth.services";

const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const result = await authServices.loginUser(email, password);

    console.log(result);
    res.status(201).send(
      JSON.stringify({
        success: "Succeed!!",
        message: "Login successfull",
        data: result,
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

export const authControllers = {
  loginUser,
};
