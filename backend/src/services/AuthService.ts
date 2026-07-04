import { SignJWT } from "jose";
import { comparePassword } from "../utils/password";
import type { IUsersRepository } from "../repositories/IUserRepository";
import { secret } from "../config/jwt";

export class AuthService {
  constructor(private usersRepository: IUsersRepository) {}

  async login(email: string, password: string): Promise<any> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }
    const jwt = await new SignJWT({ userId: user.id })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setIssuer("urn:linksharing:issuer")
      .setAudience("urn:linksharing:audience")
      .setExpirationTime("2h")
      .sign(secret);
    return { ...user, token: jwt };
  }
}
