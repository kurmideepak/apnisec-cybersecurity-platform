
import { container } from '@/server/container';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return container.rateLimitMiddleware.execute(req, async (req) => {
        return container.authMiddleware.execute(req, async (req) => {
            return container.issueHandler.get(req, id);
        });
    });
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return container.rateLimitMiddleware.execute(req, async (req) => {
        return container.authMiddleware.execute(req, async (req, userId) => {
            return container.issueHandler.update(req, userId, id);
        });
    });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return container.rateLimitMiddleware.execute(req, async (req) => {
        return container.authMiddleware.execute(req, async (req, userId) => {
            return container.issueHandler.delete(req, userId, id);
        });
    });
}
