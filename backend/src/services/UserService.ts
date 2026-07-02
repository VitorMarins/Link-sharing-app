import { hashPassword } from "../utils/password";
import type {
  IUsersRepository,
  CreateUserData,
  UpdateUserData,
} from "../repositories/IUserRepository";

export class UserService {
  constructor(private usersRepository: IUsersRepository) {}

  async create(data: CreateUserData) {
    if (await this.usersRepository.findByEmail(data.email)) {
      throw new Error("Email already exists");
    }
    if (await this.usersRepository.findByUsername(data.username)) {
      throw new Error("Username already exists");
    }
    const hashedPassword = await hashPassword(data.password);
    return await this.usersRepository.create({
      ...data,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  async findAll() {
    return await this.usersRepository.findAll();
  }

  async findByEmail(email: string) {
    return await this.usersRepository.findByEmail(email);
  }

  async findByUsername(username: string) {
    return await this.usersRepository.findByUsername(username);
  }

  async findById(id: string) {
    const user = await this.usersRepository.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }

  async update(id: string, data: Partial<UpdateUserData>) {
    try {
      const updateData = { ...data };
      if (updateData.password) {
        updateData.password = await hashPassword(updateData.password);
      }
      const finalData = { ...updateData, updatedAt: new Date() };
      return await this.usersRepository.update(id, finalData);
    } catch (error: any) {
      if (error?.code === "P2025") {
        throw new Error("User not found");
      }
      throw error;
    }
  }

  async delete(id: string) {
    try {
      return await this.usersRepository.delete(id);
    } catch (error: any) {
      if (error?.code === "P2025") {
        throw new Error("User not found");
      }
      throw error;
    }
  }
}
