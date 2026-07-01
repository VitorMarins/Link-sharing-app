import { Router } from "express";
import { UserRepository } from "../repositories/UserRepository";
import { UserService } from "../services/UserService";
import { UserController } from "../controllers/UserController";

const userRoutes: Router = Router();
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

userRoutes.post("/", (req, res) => userController.create(req, res));
userRoutes.get("/", (req, res) => userController.findAll(req, res));
userRoutes.get("/:id", (req, res) => userController.findById(req, res));
userRoutes.put("/:id", (req, res) => userController.update(req, res));
userRoutes.delete("/:id", (req, res) => userController.delete(req, res));

export { userRoutes };
