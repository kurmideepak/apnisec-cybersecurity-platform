
import { PrismaClient, Issue, Prisma } from '@prisma/client';
import { IIssueRepository } from './interfaces/IIssueRepository';

export class IssueRepository implements IIssueRepository {
    constructor(private prisma: PrismaClient) { }

    async findAll(filter?: Prisma.IssueWhereInput): Promise<Issue[]> {
        return this.prisma.issue.findMany({
            where: filter,
            orderBy: { createdAt: 'desc' },
            include: { user: { select: { name: true, email: true } } }
        });
    }

    async findById(id: string): Promise<Issue | null> {
        return this.prisma.issue.findUnique({
            where: { id },
            include: { user: { select: { name: true, email: true } } }
        });
    }

    async create(data: Prisma.IssueCreateInput): Promise<Issue> {
        return this.prisma.issue.create({ data });
    }

    async update(id: string, data: Prisma.IssueUpdateInput): Promise<Issue> {
        return this.prisma.issue.update({
            where: { id },
            data,
        });
    }

    async delete(id: string): Promise<Issue> {
        return this.prisma.issue.delete({
            where: { id },
        });
    }
}
