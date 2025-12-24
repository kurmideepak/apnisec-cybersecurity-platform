
import { IIssueRepository } from '../repositories/interfaces/IIssueRepository';
import { IIssueService } from './interfaces/IIssueService';
import { AppError } from '../errors/AppError';
import { Issue } from '@prisma/client';
import { IEmailService } from './interfaces/IEmailService';


export class IssueService implements IIssueService {
    constructor(
        private issueRepository: IIssueRepository,
        private emailService: IEmailService
    ) { }

    async list(type?: string): Promise<Issue[]> {
        const filter = type ? { type } : undefined;
        return this.issueRepository.findAll(filter);
    }

    async get(id: string): Promise<Issue> {
        const issue = await this.issueRepository.findById(id);
        if (!issue) {
            throw new AppError("Issue not found", 404);
        }
        return issue;
    }

    async create(userId: string, data: any): Promise<Issue> {
        const issue = await this.issueRepository.create({
            ...data,
            user: { connect: { id: userId } }
        });

        const issueWithUser = await this.issueRepository.findById(issue.id);

        if (issueWithUser && (issueWithUser as any).user) {
            const user = (issueWithUser as any).user;
            await this.emailService.sendIssueCreatedEmail(
                user.email,
                user.name,
                issue.title,
                issue.id
            );
        }

        return issue;
    }

    async update(id: string, userId: string, data: any): Promise<Issue> {
        const issue = await this.get(id);

        if (issue.userId !== userId) {
            throw new AppError("You do not have permission to update this issue", 403);
        }

        return this.issueRepository.update(id, data);
    }

    async delete(id: string, userId: string): Promise<Issue> {
        const issue = await this.get(id);

        if (issue.userId !== userId) {
            throw new AppError("You do not have permission to delete this issue", 403);
        }

        return this.issueRepository.delete(id);
    }
}
