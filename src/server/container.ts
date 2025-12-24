
import { PrismaClient } from '@prisma/client';
import { AuthHandler } from './handlers/AuthHandler';
import { AuthService } from './services/AuthService';
import { UserRepository } from './repositories/UserRepository';
import { HashProvider } from './utils/HashProvider';
import { JwtProvider } from './utils/JwtProvider';
import { AuthValidator } from './validators/AuthValidator';
import { RateLimitService } from './services/RateLimitService';
import { RateLimitMiddleware } from './middleware/RateLimitMiddleware';
import { IssueHandler } from './handlers/IssueHandler';
import { IssueService } from './services/IssueService';
import { IssueRepository } from './repositories/IssueRepository';
import { IssueValidator } from './validators/IssueValidator';
import { AuthMiddleware } from './middleware/AuthMiddleware';
import { EmailService } from './services/EmailService';

class Container {
    private static instance: Container;

    public authHandler: AuthHandler;
    public issueHandler: IssueHandler;
    public prisma: PrismaClient;
    public rateLimitService: RateLimitService;
    public rateLimitMiddleware: RateLimitMiddleware;
    public authMiddleware: AuthMiddleware;
    public emailService: EmailService;

    private constructor() {
        this.prisma = new PrismaClient();
        this.emailService = new EmailService();

        // Auth Dependencies
        const userRepository = new UserRepository(this.prisma);
        const hashProvider = new HashProvider();
        const jwtProvider = new JwtProvider();

        // Pass EmailService to AuthService
        const authService = new AuthService(userRepository, hashProvider, jwtProvider, this.emailService);
        const authValidator = new AuthValidator();

        this.authHandler = new AuthHandler(authService, authValidator, jwtProvider);

        // Issue Dependencies
        const issueRepository = new IssueRepository(this.prisma);
        const issueValidator = new IssueValidator();
        // Pass EmailService to IssueService
        const issueService = new IssueService(issueRepository, userRepository, this.emailService);

        this.issueHandler = new IssueHandler(issueService, issueValidator);

        // Middleware
        this.rateLimitService = new RateLimitService();
        this.rateLimitMiddleware = new RateLimitMiddleware(this.rateLimitService);
        this.authMiddleware = new AuthMiddleware(jwtProvider);
    }

    static getInstance(): Container {
        if (!Container.instance) {
            Container.instance = new Container();
        }
        return Container.instance;
    }
}

export const container = Container.getInstance();
