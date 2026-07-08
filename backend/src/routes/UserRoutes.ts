import { Router } from "express";
import { UserRepository } from "../repositories/UserRepository";
import { UserService } from "../services/UserService";
import { UserController } from "../controllers/UserController";
import { authMiddleware, extractSubdomain } from "../middlewares";

const userRoutes: Router = Router();
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

userRoutes.post("/", (req, res) => userController.create(req, res));
userRoutes.get("/", authMiddleware, (req, res) =>
  userController.findAll(req, res)
);
userRoutes.get("/:id", authMiddleware, (req, res) =>
  userController.findById(req, res)
);
userRoutes.get("/public-profile", extractSubdomain, (req, res) =>
  userController.findByUsername(req, res)
);
userRoutes.put("/:id", authMiddleware, (req, res) =>
  userController.update(req, res)
);
userRoutes.delete("/:id", authMiddleware, (req, res) =>
  userController.delete(req, res)
);

export { userRoutes, userService, userRepository };
