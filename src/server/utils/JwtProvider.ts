import jwt, { SignOptions, JwtPayload } from 'jsonwebtoken';

export class JwtProvider {
    private readonly secret: string;
    private readonly expiresIn: string;

    constructor() {
        this.secret = process.env.JWT_SECRET || 'fallback-secret-for-dev';
        this.expiresIn = '1d';
    }

    sign(payload: JwtPayload, options?: SignOptions): string {
        const signOptions: SignOptions = {
            expiresIn: this.expiresIn as SignOptions['expiresIn'],
            ...options,
        };
        return jwt.sign(payload, this.secret, signOptions);
    }

    verify<T>(token: string): T {
        try {
            return jwt.verify(token, this.secret) as T;
        } catch {
            throw new Error('Invalid token');
        }
    }
}
