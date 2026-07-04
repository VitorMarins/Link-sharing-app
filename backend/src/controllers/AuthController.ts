import type { Request, Response } from "express";
import { z } from "zod";
import { AuthService } from "../services/AuthService";

export class AuthController {
  constructor(private authService: AuthService) {}

  async login(req: Request, res: Response) {
    try {
      const loginSchema = z.object({
        email: z.email("Invalid email address"),
        password: z
          .string()
          .min(6, "Password must be at least 6 characters long"),
      });
      const result = loginSchema.safeParse(req.body);
      if (!result.success) {
        throw new Error(result.error.message);
      }
      const { email, password } = req.body;
      const user = await this.authService.login(email, password);
      return res.status(200).json(user);
    } catch (error) {
      return res.status(400).json({ error: (error as Error).message });
    }
  }
}
