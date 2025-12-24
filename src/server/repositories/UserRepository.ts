
import { PrismaClient, User, Prisma } from '@prisma/client';
import { IUserRepository } from './interfaces/IUserRepository';

export class UserRepository implements IUserRepository {
    constructor(private prisma: PrismaClient) { }

    async create(data: Prisma.UserCreateInput): Promise<User> {
        return this.prisma.user.create({ data });
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.prisma.user.findUnique({ where: { email } });
    }

    async findById(id: string): Promise<User | null> {
        return this.prisma.user.findUnique({ where: { id } });
    }

    async update(id: string, data: Prisma.UserUpdateInput): Promise<User> {
        return this.prisma.user.update({ where: { id }, data });
    }
}
