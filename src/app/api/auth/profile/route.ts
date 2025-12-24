
import { container } from '@/server/container';
import { NextRequest } from 'next/server';

export async function PUT(req: NextRequest) {
    return container.rateLimitMiddleware.execute(req, async (req) => {
        return container.authMiddleware.execute(req, async (req, userId) => {
            return container.authHandler.updateProfile(req, userId);
        });
    });
}
