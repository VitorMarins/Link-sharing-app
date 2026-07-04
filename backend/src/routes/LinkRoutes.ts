import { Router } from "express";
import { LinkRepository } from "../repositories/LinkRepository";
import { LinkService } from "../services/LinkService";
import { LinkController } from "../controllers/LinkController";
import { userService } from "./UserRoutes";

const linkRoutes: Router = Router();
const linkRepository = new LinkRepository();
const linkService = new LinkService(linkRepository, userService);
const linkController = new LinkController(linkService);

linkRoutes.post("/", (req, res) => linkController.create(req, res));
linkRoutes.get("/", (req, res) => linkController.findAll(req, res));
linkRoutes.get("/:id", (req, res) => linkController.findById(req, res));
linkRoutes.get("/user/:userId", (req, res) =>
  linkController.findByUserId(req, res)
);
linkRoutes.put("/:id", (req, res) => linkController.update(req, res));
linkRoutes.delete("/:id", (req, res) => linkController.delete(req, res));

export { linkRoutes };
