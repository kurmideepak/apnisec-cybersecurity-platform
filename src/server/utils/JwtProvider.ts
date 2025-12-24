
import jwt, { SignOptions } from 'jsonwebtoken';

export class JwtProvider {
    private readonly secret: string;
    private readonly expiresIn: string;

    constructor() {
        this.secret = process.env.JWT_SECRET || 'fallback-secret-for-dev';
        this.expiresIn = '1d';
    }

    sign(payload: object, options?: SignOptions): string {
        return jwt.sign(payload, this.secret, {
            expiresIn: this.expiresIn,
            ...options,
        });
    }

    verify<T>(token: string): T {
        try {
            return jwt.verify(token, this.secret) as T;
        } catch (error) {
            throw new Error('Invalid token');
        }
    }
}
