
import { NextRequest, NextResponse } from 'next/server';
import { JwtProvider } from '../utils/JwtProvider';
import { AppError } from '../errors/AppError';

type AuthenticatedHandler = (req: NextRequest, userId: string, ...args: any[]) => Promise<NextResponse>;

export class AuthMiddleware {
    constructor(private jwtProvider: JwtProvider) { }

    async execute(req: NextRequest, next: AuthenticatedHandler, ...args: any[]): Promise<NextResponse> {
        try {
            const token = req.cookies.get('token')?.value;
            if (!token) {
                return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
            }

            const decoded = this.jwtProvider.verify<{ userId: string }>(token);
            return next(req, decoded.userId, ...args);
        } catch (error) {
            return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
        }
    }
}
