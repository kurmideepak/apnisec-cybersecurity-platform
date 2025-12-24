
import { AppError } from "./AppError";

export class AuthError extends AppError {
    constructor(message: string = "Authentication failed", statusCode: number = 401) {
        super(message, statusCode);
    }

    static invalidCredentials() {
        return new AuthError("Invalid email or password", 401);
    }

    static unauthorized() {
        return new AuthError("Unauthorized access", 401);
    }

    static forbidden() {
        return new AuthError("Access forbidden", 403);
    }
}
