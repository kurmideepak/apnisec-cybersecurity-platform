
import { Issue } from '@prisma/client';

import { CreateIssueDto, UpdateIssueDto, IssueType } from '../../validators/IssueValidator';

export interface IIssueService {
    list(type?: IssueType): Promise<Issue[]>;
    get(id: string): Promise<Issue>;
    create(userId: string, data: CreateIssueDto): Promise<Issue>;
    update(id: string, userId: string, data: UpdateIssueDto): Promise<Issue>;
    delete(id: string, userId: string): Promise<Issue>;
}
