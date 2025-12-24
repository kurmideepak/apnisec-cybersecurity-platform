
import { IUserRepository } from '../repositories/interfaces/IUserRepository';
import { IAuthService } from './interfaces/IAuthService';
import { HashProvider } from '../utils/HashProvider';
import { JwtProvider } from '../utils/JwtProvider';
import { AuthError } from '../errors/AuthError';
import { User } from '@prisma/client';
import { IEmailService } from './interfaces/IEmailService';

export class AuthService implements IAuthService {
    constructor(
        private userRepository: IUserRepository,
        private hashProvider: HashProvider,
        private jwtProvider: JwtProvider,
        private emailService: IEmailService
    ) { }

    async register(data: any): Promise<{ user: User; token: string }> {
        const existingUser = await this.userRepository.findByEmail(data.email);
        if (existingUser) {
            throw new AuthError('User already exists', 400);
        }

        const hashedPassword = await this.hashProvider.hash(data.password);
        const user = await this.userRepository.create({
            ...data,
            password: hashedPassword,
        });

        // Send Welcome Email
        await this.emailService.sendWelcomeEmail(user.email, user.name);

        const token = this.jwtProvider.sign({ userId: user.id });
        return { user, token };
    }

    async login(data: any): Promise<{ user: User; token: string }> {
        const user = await this.userRepository.findByEmail(data.email);
        if (!user) {
            throw AuthError.invalidCredentials();
        }

        const isPasswordValid = await this.hashProvider.compare(data.password, user.password);
        if (!isPasswordValid) {
            throw AuthError.invalidCredentials();
        }

        const token = this.jwtProvider.sign({ userId: user.id });
        return { user, token };
    }

    async getCurrentUser(userId: string): Promise<User | null> {
        const user = await this.userRepository.findById(userId);
        return user;
    }

    async updateProfile(userId: string, data: any): Promise<User> {
        const user = await this.userRepository.update(userId, data);

        // Trigger Profile Updated Email
        await this.emailService.sendProfileUpdatedEmail(user.email, user.name);

        return user;
    }
}
