import { Router } from "express";
import { makeLinkController } from "../controllers";
import { authMiddleware } from "../middlewares";

const linkRoutes: Router = Router();

const linkController = makeLinkController();

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
