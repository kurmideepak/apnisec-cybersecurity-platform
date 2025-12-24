
import { container } from '@/server/container';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
    return container.rateLimitMiddleware.execute(req, async (req) => {
        return container.authMiddleware.execute(req, async (req) => {
            return container.issueHandler.list(req);
        });
    });
}

export async function POST(req: NextRequest) {
    return container.rateLimitMiddleware.execute(req, async (req) => {
        return container.authMiddleware.execute(req, async (req, userId) => {
            return container.issueHandler.create(req, userId);
        });
    });
}
