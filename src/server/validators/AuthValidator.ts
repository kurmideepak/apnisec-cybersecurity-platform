
import { AppError } from "../errors/AppError";

export class AuthValidator {
    validateRegister(data: any): void {
        const { email, password, name } = data;
        if (!email || !email.includes('@')) {
            throw new AppError("Invalid email address", 400);
        }
        if (!password || password.length < 6) {
            throw new AppError("Password must be at least 6 characters", 400);
        }
        if (!name) {
            throw new AppError("Name is required", 400);
        }
    }

    validateLogin(data: any): void {
        const { email, password } = data;
        if (!email || !password) {
            throw new AppError("Email and password are required", 400);
        }
    }
}
