import { Router } from "express";
import { userRepository } from "./UserRoutes";
import { AuthService } from "../services/AuthService";
import { AuthController } from "../controllers/AuthController";

const authRoutes: Router = Router();
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);

authRoutes.post("/login", (req, res) => authController.login(req, res));

export { authRoutes };
