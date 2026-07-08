import { Router } from "express";
import { UserRepository } from "../repositories/UserRepository";
import { UserService } from "../services/UserService";
import { LinkRepository } from "../repositories/LinkRepository";
import { LinkService } from "../services/LinkService";
import { LinkController } from "../controllers/LinkController";
import { authMiddleware } from "../middlewares";

const linkRoutes: Router = Router();
const userRepository = new UserRepository();
const userService = new UserService(userRepository)
const linkRepository = new LinkRepository();
const linkService = new LinkService(linkRepository, userService);
const linkController = new LinkController(linkService);

linkRoutes.post("/", authMiddleware, (req, res) =>
  linkController.create(req, res)
);
linkRoutes.get("/", authMiddleware, (req, res) =>
  linkController.findAll(req, res)
);
linkRoutes.get("/:id", authMiddleware, (req, res) =>
  linkController.findById(req, res)
);
linkRoutes.get("/user/:userId", authMiddleware, (req, res) =>
  linkController.findByUserId(req, res)
);
linkRoutes.put("/:id", authMiddleware, (req, res) =>
  linkController.update(req, res)
);
linkRoutes.delete("/:id", authMiddleware, (req, res) =>
  linkController.delete(req, res)
);

export { linkRoutes };
