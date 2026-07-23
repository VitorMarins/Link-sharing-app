import { UserRepository } from "../repositories/UserRepository";
import { UserService } from "../services/UserService";
import { UserController } from "../controllers/UserController";

import { LinkRepository } from "../repositories/LinkRepository";
import { LinkService } from "../services/LinkService";
import { LinkController } from "../controllers/LinkController";

import { AuthService } from "../services/AuthService";
import { AuthController } from "../controllers/AuthController";

function makeUserService(): UserService {
  const userRepository = new UserRepository();
  const userService = new UserService(userRepository);
  return userService;
}

export function makeUserController(): UserController {
  const userService = makeUserService();
  const userController = new UserController(userService);
  return userController;
}

export function makeLinkController(): LinkController {
  const linkRepository = new LinkRepository();
  const linkService = new LinkService(linkRepository, makeUserService());
  const linkController = new LinkController(linkService);
  return linkController;
}

export function makeAuthController(): AuthController {
  const authService = new AuthService(makeUserService());
  const authController = new AuthController(authService);
  return authController;
}
