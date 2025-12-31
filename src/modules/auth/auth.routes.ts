import express from "express";
import { authControllers } from "./auth.controllers";

const router = express.Router();

router.post("/login", authControllers.loginUser);
export const authRoutes = router;
