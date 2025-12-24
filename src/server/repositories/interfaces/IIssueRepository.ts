
import { Issue, Prisma } from '@prisma/client';

export interface IIssueRepository {
    findAll(filter?: Prisma.IssueWhereInput): Promise<Issue[]>;
    findById(id: string): Promise<Issue | null>;
    create(data: Prisma.IssueCreateInput): Promise<Issue>;
    update(id: string, data: Prisma.IssueUpdateInput): Promise<Issue>;
    delete(id: string): Promise<Issue>;
}
