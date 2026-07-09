import type { Request, Response } from "express";
import { z } from "zod";
import { UserService } from "../services/UserService";

export class UserController {
  constructor(private userService: UserService) {}

  async create(req: Request, res: Response) {
    try {
      const createUserSchema = z.object({
        name: z.string().min(2, "Name must be at least 2 characters long"),
        email: z.email("Invalid email address"),
        password: z
          .string()
          .min(6, "Password must be at least 6 characters long"),
        username: z
          .string()
          .min(2, "Username must be at least 2 characters long"),
      });
      const result = createUserSchema.safeParse(req.body);
      if (!result.success) {
        throw new Error(result.error.message);
      }
      const user = await this.userService.create(req.body);
      return res.status(201).json(user);
    } catch (error) {
      return res.status(400).json({ error: (error as Error).message });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const users = await this.userService.findAll();
      return res.status(200).json(users);
    } catch (error) {
      return res.status(400).json({ error: (error as Error).message });
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const idParamSchema = z.object({
        id: z.uuid("O ID enviado não é um UUID válido"),
      });
      const { id } = idParamSchema.parse(req.params);
      const user = await this.userService.findById(id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(200).json(user);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "ID inválido ou ausente" });
      }
      return res.status(500).json({ error: (error as Error).message });
    }
  }

  async findByUsername(req: Request, res: Response) {
    try {
      if (!req.subdomain) {
        return res.status(400).json({ error: "Nenhum perfil especificado." });
      }
      const usernameParamSchema = z
        .string()
        .min(2, "Username must be at least 2 characters long");
      const username = usernameParamSchema.parse(req.subdomain);
      const profile = await this.userService.findByUsername(username);
      res.status(200).json(profile);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res
          .status(400)
          .json({ message: "Username inválido ou ausente" });
      }
      return res.status(500).json({ error: (error as Error).message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const idParamSchema = z.object({
        id: z.uuid("O ID enviado não é um UUID válido"),
      });
      const { id } = idParamSchema.parse(req.params);
      const updateUserSchema = z.object({
        name: z
          .string()
          .min(2, "Name must be at least 2 characters long")
          .optional(),
        email: z.email("Invalid email address").optional(),
        password: z
          .string()
          .min(6, "Password must be at least 6 characters long")
          .optional(),
        username: z
          .string()
          .min(2, "Username must be at least 2 characters long")
          .optional(),
      });
      const result = updateUserSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ message: "Dados inválidos" });
      }
      const user = await this.userService.update(id, req.body);
      return res.status(200).json(user);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "ID inválido ou ausente" });
      }
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const idParamSchema = z.object({
        id: z.uuid("O ID enviado não é um UUID válido"),
      });
      const { id } = idParamSchema.parse(req.params);
      await this.userService.delete(id);
      return res.status(204).send();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "ID inválido ou ausente" });
      }
      return res.status(400).json({ error: (error as Error).message });
    }
  }
}
