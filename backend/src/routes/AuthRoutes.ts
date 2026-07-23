import { Router } from "express";
import { makeAuthController } from "../controllers";

const authRoutes: Router = Router();

const authController = makeAuthController();

authRoutes.post("/login", (req, res) => authController.login(req, res));

export { authRoutes };
