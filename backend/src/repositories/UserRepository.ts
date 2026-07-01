import { prisma } from "../config/database";
import type {
  IUsersRepository,
  CreateUserData,
  UpdateUserData,
} from "./IUserRepository";

export class UserRepository implements IUsersRepository {
  async create(data: CreateUserData) {
    return await prisma.user.create({ data });
  }

  async findAll() {
    return await prisma.user.findMany(
      {
        include: {
          links: true,
        },
      }
    );
  }

  async findById(id: string) {
    return await prisma.user.findUnique({
      where: { id: id },
      include: { links: true },
    });
  }

  async findByEmail(emailParam: string) {
    return await prisma.user.findUnique({
      where: { email: emailParam },
      include: { links: true },
    });
  }

  async findByUsername(usernameParam: string) {
    return await prisma.user.findUnique({
      where: { username: usernameParam },
      include: { links: true },
    });
  }

  async update(id: string, data: UpdateUserData) {
    return await prisma.user.update({
      where: { id: id },
      data: { data },
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.user.delete({
      where: { id: id },
    });
  }
}
