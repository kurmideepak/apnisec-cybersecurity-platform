
import { NextRequest, NextResponse } from 'next/server';
import { IIssueService } from '../services/interfaces/IIssueService';
import { IssueValidator } from '../validators/IssueValidator';


export class IssueHandler {
    constructor(
        private issueService: IIssueService,
        private validator: IssueValidator
    ) { }

    async list(req: NextRequest): Promise<NextResponse> {
        try {
            const { searchParams } = new URL(req.url);
            const type = searchParams.get('type') || undefined;

            const issues = await this.issueService.list(type);
            return NextResponse.json(issues);
        } catch (error: any) {
            return NextResponse.json({ error: error.message }, { status: error.statusCode || 500 });
        }
    }

    async create(req: NextRequest, userId: string): Promise<NextResponse> {
        try {
            const body = await req.json();
            this.validator.validateCreate(body);

            const issue = await this.issueService.create(userId, body);
            return NextResponse.json(issue, { status: 201 });
        } catch (error: any) {
            return NextResponse.json({ error: error.message }, { status: error.statusCode || 500 });
        }
    }

    async get(req: NextRequest, id: string): Promise<NextResponse> {
        try {
            const issue = await this.issueService.get(id);
            return NextResponse.json(issue);
        } catch (error: any) {
            return NextResponse.json({ error: error.message }, { status: error.statusCode || 500 });
        }
    }

    async update(req: NextRequest, userId: string, id: string): Promise<NextResponse> {
        try {
            const body = await req.json();
            this.validator.validateUpdate(body);

            const issue = await this.issueService.update(id, userId, body);
            return NextResponse.json(issue);
        } catch (error: any) {
            return NextResponse.json({ error: error.message }, { status: error.statusCode || 500 });
        }
    }

    async delete(req: NextRequest, userId: string, id: string): Promise<NextResponse> {
        try {
            await this.issueService.delete(id, userId);
            return new NextResponse(null, { status: 204 });
        } catch (error: any) {
            return NextResponse.json({ error: error.message }, { status: error.statusCode || 500 });
        }
    }
}
