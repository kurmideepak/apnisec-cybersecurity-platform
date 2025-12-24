
import { Issue } from '@prisma/client';

export interface IIssueService {
    list(type?: string): Promise<Issue[]>;
    get(id: string): Promise<Issue>;
    create(userId: string, data: any): Promise<Issue>;
    update(id: string, userId: string, data: any): Promise<Issue>;
    delete(id: string, userId: string): Promise<Issue>;
}
