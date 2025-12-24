
import { container } from '@/server/container';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
    return container.authHandler.register(req);
}
