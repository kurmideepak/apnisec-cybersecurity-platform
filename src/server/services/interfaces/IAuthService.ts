
import { User } from '@prisma/client';

import { RegisterDto, LoginDto, UpdateProfileDto } from '../../validators/AuthValidator';

export interface IAuthService {
    register(data: RegisterDto): Promise<{ user: User; token: string }>;
    login(data: LoginDto): Promise<{ user: User; token: string }>;
    getCurrentUser(userId: string): Promise<User | null>;
    updateProfile(userId: string, data: UpdateProfileDto): Promise<User>;
}
