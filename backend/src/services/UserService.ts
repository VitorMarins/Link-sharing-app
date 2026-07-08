import { hashPassword } from "../utils/password";
import usernamesReserved from "../config/usernameReserved";
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

    if (usernamesReserved.includes(data.username.toLowerCase())) {
      throw new Error("Username is reserved");
    }

    if (await this.usersRepository.findByUsername(data.username)) {
      throw new Error("Username already exists");
    }

    const hashedPassword = await hashPassword(data.password);
    return await this.usersRepository.create({
      name: data.name,
      email: data.email.toLowerCase(),
      password: hashedPassword,
      username: data.username.toLowerCase(),
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
      const currentUser = await this.findById(id);

      const updateData: Partial<UpdateUserData> & { updatedAt?: Date } = {};

      if (data.email && data.email.toLowerCase() !== currentUser.email) {
        const emailLower = data.email.toLowerCase();
        if (await this.usersRepository.findByEmail(emailLower)) {
          throw new Error("Email already exists");
        }
        updateData.email = emailLower;
      }

      if (
        data.username &&
        data.username.toLowerCase() !== currentUser.username
      ) {
        const usernameLower = data.username.toLowerCase();

        if (usernamesReserved.includes(usernameLower)) {
          throw new Error("Username is reserved");
        }

        if (await this.usersRepository.findByUsername(usernameLower)) {
          throw new Error("Username already exists");
        }
        updateData.username = usernameLower;
      }

      if (data.password) {
        updateData.password = await hashPassword(data.password);
      }

      if (data.name) {
        updateData.name = data.name;
      }

      if (Object.keys(updateData).length === 0) {
        return currentUser;
      }

      updateData.updatedAt = new Date();
      return await this.usersRepository.update(id, updateData);
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
