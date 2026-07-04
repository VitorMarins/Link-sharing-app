import type {
  ILinksRepository,
  CreateLinkData,
  UpdateLinkData,
} from "../repositories/ILinkRepository";
import { UserService } from "./UserService";

export class LinkService {
  constructor(
    private linksRepository: ILinksRepository,
    private userService: UserService
  ) {}

  async create(data: CreateLinkData) {
    await this.userService.findById(data.userId);
    return await this.linksRepository.create({
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  async findAll() {
    return await this.linksRepository.findAll();
  }

  async findById(id: string) {
    return await this.linksRepository.findById(id);
  }

  async findByUserId(userId: string) {
    await this.userService.findById(userId);
    return await this.linksRepository.findByUserId(userId);
  }

  async update(id: string, data: Partial<UpdateLinkData>) {
    const link = await this.linksRepository.findById(id);
    if (!link) {
      throw new Error("Link not found");
    }

    return await this.linksRepository.update(id, {
      ...data,
      updatedAt: new Date(),
    });
  }

  async delete(id: string) {
    const link = await this.linksRepository.findById(id);
    if (!link) {
      throw new Error("Link not found");
    }
    return await this.linksRepository.delete(id);
  }
}
