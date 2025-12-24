
import { NextRequest, NextResponse } from 'next/server';
import { IAuthService } from '../services/interfaces/IAuthService';
import { AuthValidator } from '../validators/AuthValidator';
import { JwtProvider } from '../utils/JwtProvider';
import { AppError } from '../errors/AppError';

export class AuthHandler {
    constructor(
        private authService: IAuthService,
        private validator: AuthValidator,
        private jwtProvider: JwtProvider
    ) { }

    async register(req: NextRequest): Promise<NextResponse> {
        try {
            const body = await req.json();
            this.validator.validateRegister(body);

            const result = await this.authService.register(body);
            const response = NextResponse.json(result, { status: 201 });

            // Set HttpOnly cookie
            response.cookies.set('token', result.token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                path: '/',
                maxAge: 60 * 60 * 24, // 1 day
            });

            return response;
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'An unexpected error occurred';
            const statusCode = error instanceof AppError ? error.statusCode : 500;
            return NextResponse.json(
                { error: message },
                { status: statusCode }
            );
        }
    }

    async login(req: NextRequest): Promise<NextResponse> {
        try {
            const body = await req.json();
            this.validator.validateLogin(body);

            const result = await this.authService.login(body);
            const response = NextResponse.json(result, { status: 200 });

            response.cookies.set('token', result.token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                path: '/',
                maxAge: 60 * 60 * 24,
            });

            return response;
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'An unexpected error occurred';
            const statusCode = error instanceof AppError ? error.statusCode : 500;
            return NextResponse.json(
                { error: message },
                { status: statusCode }
            );
        }
    }

    async logout(req: NextRequest): Promise<NextResponse> {
        const response = NextResponse.json({ message: 'Logged out successfully' }, { status: 200 });
        response.cookies.delete('token');
        return response;
    }

    async me(req: NextRequest): Promise<NextResponse> {
        try {
            const token = req.cookies.get('token')?.value;
            if (!token) {
                return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
            }

            const decoded = this.jwtProvider.verify<{ userId: string }>(token);
            const user = await this.authService.getCurrentUser(decoded.userId);

            if (!user) {
                return NextResponse.json({ error: 'User not found' }, { status: 404 });
            }

            return NextResponse.json(user, { status: 200 });
        } catch (error: unknown) {
            return NextResponse.json(
                { error: 'Invalid token' },
                { status: 401 }
            );
        }
    }

    async updateProfile(req: NextRequest, userId: string): Promise<NextResponse> {
        try {
            const body = await req.json();
            const user = await this.authService.updateProfile(userId, body);
            return NextResponse.json(user);
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'An unexpected error occurred';
            const statusCode = error instanceof AppError ? error.statusCode : 500;
            return NextResponse.json(
                { error: message },
                { status: statusCode }
            );
        }
    }
}
