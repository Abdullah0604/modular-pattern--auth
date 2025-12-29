import express, { Request, Response } from "express";
import { pool } from "../../config/db";
import { userControllers } from "./user.controller";

const router = express.Router();

// localhost:5000/users
router.post("/", userControllers.createUser);

router.get("/", userControllers.accessUsers);

router.get("/user/:id", userControllers.accessUser);

router.put("/user/:id", userControllers.updateUser);

router.delete("/user/:id", userControllers.deleteUser);
export const userRoutes = router;
