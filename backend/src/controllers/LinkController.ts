import type { Request, Response } from "express";
import { z } from "zod";
import { LinkService } from "../services/LinkService";

export class LinkController {
  constructor(private linkService: LinkService) {}

  async create(req: Request, res: Response) {
    try {
      const createLinkSchema = z.object({
        title: z.string().min(1, "Title is required"),
        url: z.url("Invalid URL format"),
        userId: z.uuid("Invalid user ID format"),
      });
      const result = createLinkSchema.safeParse(req.body);
      if (!result.success) {
        throw new Error(result.error.message);
      }
      const link = await this.linkService.create(req.body);
      return res.status(201).json(link);
    } catch (error) {
      return res.status(400).json({ error: (error as Error).message });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const links = await this.linkService.findAll();
      return res.status(200).json(links);
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
      const link = await this.linkService.findById(id);
      if (!link) {
        return res.status(404).json({ error: "Link not found" });
      }
      return res.status(200).json(link);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "ID inválido ou ausente" });
      }
      return res.status(500).json({ error: (error as Error).message });
    }
  }

  async findByUserId(req: Request, res: Response) {
    try {
      const userIdParamSchema = z.object({
        userId: z.uuid("O ID do usuário enviado não é um UUID válido"),
      });
      const { userId } = userIdParamSchema.parse(req.params);
      const links = await this.linkService.findByUserId(userId);
      return res.status(200).json(links);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res
          .status(400)
          .json({ message: "ID do usuário inválido ou ausente" });
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
      const updateLinkSchema = z.object({
        title: z
          .string()
          .min(2, "Title must be at least 2 characters long")
          .optional(),
        url: z.email("Invalid email address").optional(),
      });
      const result = updateLinkSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ message: "Dados inválidos" });
      }
      const link = await this.linkService.update(id, req.body);
      return res.status(200).json(link);
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
      await this.linkService.delete(id);
      return res.status(204).send();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "ID inválido ou ausente" });
      }
      return res.status(400).json({ error: (error as Error).message });
    }
  }
}
