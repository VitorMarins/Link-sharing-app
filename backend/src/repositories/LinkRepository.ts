import { prisma } from "../config/database";
import type { CreateLinkData, UpdateLinkData, ILinksRepository } from './ILinkRepository';

export class LinkRepository implements ILinksRepository {
    async create(data: CreateLinkData) {
        return await prisma.link.create({ data });
    }

    async findall() {
        return await prisma.link.findMany();
    }

    async findById(id: string) {
        return await prisma.link.findUnique({
            where: { id: id },
        });
    }

    async findByUserId(userId: string) {
        return await prisma.link.findMany({
            where: { userId: userId },
        });
    }

    async update(id: string, data: Partial<UpdateLinkData>) {
        return await prisma.link.update({
            where: { id: id },
            data: { ...data },
        });
    }

    async delete(id: string): Promise<void> {
        await prisma.link.delete({
            where: { id: id },
        });
    }
}

