
import { NextRequest, NextResponse } from 'next/server';
import { RateLimitService } from '../services/RateLimitService';

type HandlerFunction = (req: NextRequest, ...args: unknown[]) => Promise<NextResponse>;

export class RateLimitMiddleware {
    constructor(private rateLimitService: RateLimitService) { }

    public async execute(req: NextRequest, next: HandlerFunction, context?: unknown): Promise<NextResponse> {
        const ip = req.headers.get('x-forwarded-for') || 'unknown-ip';
        // You could also use userId if authenticated, e.g. from a previous auth step

        const { allowed, remaining, resetTime } = this.rateLimitService.checkLimit(ip);

        const headers = {
            'X-RateLimit-Limit': this.rateLimitService['limit'].toString(),
            'X-RateLimit-Remaining': remaining.toString(),
            'X-RateLimit-Reset': resetTime.toString(),
        };

        if (!allowed) {
            return NextResponse.json(
                { error: 'Too many requests, please try again later.' },
                {
                    status: 429,
                    headers: headers
                }
            );
        }

        try {
            const response = await next(req, context);

            // Append headers to the successful response
            Object.entries(headers).forEach(([key, value]) => {
                response.headers.set(key, value);
            });

            return response;
        } catch (error) {
            // Even if it fails, we want headers? Usually yes.
            // If we catch here, we need to return a response or rethrow.
            throw error;
        }
    }
}
