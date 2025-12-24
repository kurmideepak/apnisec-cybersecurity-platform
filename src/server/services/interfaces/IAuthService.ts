
import { User } from '@prisma/client';

export interface IAuthService {
    register(data: any): Promise<{ user: User; token: string }>;
    login(data: any): Promise<{ user: User; token: string }>;
    getCurrentUser(userId: string): Promise<User | null>;
    updateProfile(userId: string, data: any): Promise<User>;
}
