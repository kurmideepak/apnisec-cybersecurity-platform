
import { NextRequest, NextResponse } from 'next/server';
import { IIssueService } from '../services/interfaces/IIssueService';
import { IssueValidator, IssueType } from '../validators/IssueValidator';
import { AppError } from '../errors/AppError';


export class IssueHandler {
    constructor(
        private issueService: IIssueService,
        private validator: IssueValidator
    ) { }

    async list(req: NextRequest): Promise<NextResponse> {
        try {
            const { searchParams } = new URL(req.url);
            const typeParam = searchParams.get('type');

            let type: IssueType | undefined = undefined;
            if (typeParam && Object.values(IssueType).includes(typeParam as IssueType)) {
                type = typeParam as IssueType;
            }

            const issues = await this.issueService.list(type);
            return NextResponse.json(issues);
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'An error occurred';
            const statusCode = error instanceof AppError ? error.statusCode : 500;
            return NextResponse.json({ error: message }, { status: statusCode });
        }
    }

    async create(req: NextRequest, userId: string): Promise<NextResponse> {
        try {
            const body = await req.json();
            this.validator.validateCreate(body);

            const issue = await this.issueService.create(userId, body);
            return NextResponse.json(issue, { status: 201 });
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'An error occurred';
            const statusCode = error instanceof AppError ? error.statusCode : 500;
            return NextResponse.json({ error: message }, { status: statusCode });
        }
    }

    async get(req: NextRequest, id: string): Promise<NextResponse> {
        try {
            const issue = await this.issueService.get(id);
            return NextResponse.json(issue);
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'An error occurred';
            const statusCode = error instanceof AppError ? error.statusCode : 500;
            return NextResponse.json({ error: message }, { status: statusCode });
        }
    }

    async update(req: NextRequest, userId: string, id: string): Promise<NextResponse> {
        try {
            const body = await req.json();
            this.validator.validateUpdate(body);

            const issue = await this.issueService.update(id, userId, body);
            return NextResponse.json(issue);
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'An error occurred';
            const statusCode = error instanceof AppError ? error.statusCode : 500;
            return NextResponse.json({ error: message }, { status: statusCode });
        }
    }

    async delete(req: NextRequest, userId: string, id: string): Promise<NextResponse> {
        try {
            await this.issueService.delete(id, userId);
            return new NextResponse(null, { status: 204 });
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'An error occurred';
            const statusCode = error instanceof AppError ? error.statusCode : 500;
            return NextResponse.json({ error: message }, { status: statusCode });
        }
    }
}
