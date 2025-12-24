
import { container } from '@/server/container';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
    return container.authHandler.me(req);
}
