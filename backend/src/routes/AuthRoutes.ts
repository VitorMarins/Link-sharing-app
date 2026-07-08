import { Router } from "express";
import { UserRepository } from "../repositories/UserRepository";
import { UserService } from "../services/UserService";
import { AuthService } from "../services/AuthService";
import { AuthController } from "../controllers/AuthController";

const authRoutes: Router = Router();
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const authService = new AuthService(userService);
const authController = new AuthController(authService);

authRoutes.post("/login", (req, res) => authController.login(req, res));

export { authRoutes };
