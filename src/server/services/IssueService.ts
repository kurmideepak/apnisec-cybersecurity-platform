
import { IIssueRepository } from '../repositories/interfaces/IIssueRepository';
import { IIssueService } from './interfaces/IIssueService';
import { AppError } from '../errors/AppError';
import { Issue } from '@prisma/client';
import { IEmailService } from './interfaces/IEmailService';


import { CreateIssueDto, UpdateIssueDto, IssueType } from '../validators/IssueValidator';

import { IUserRepository } from '../repositories/interfaces/IUserRepository';

export class IssueService implements IIssueService {
    constructor(
        private issueRepository: IIssueRepository,
        private userRepository: IUserRepository,
        private emailService: IEmailService
    ) { }

    async list(type?: IssueType): Promise<Issue[]> {
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

    async create(userId: string, data: CreateIssueDto): Promise<Issue> {
        const issue = await this.issueRepository.create({
            ...data,
            user: { connect: { id: userId } }
        });

        const user = await this.userRepository.findById(userId);

        if (user) {
            await this.emailService.sendIssueCreatedEmail(
                user.email,
                user.name,
                issue.title,
                issue.id
            );
        }

        return issue;
    }

    async update(id: string, userId: string, data: UpdateIssueDto): Promise<Issue> {
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
