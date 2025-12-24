
import bcrypt from 'bcrypt';

export class HashProvider {
    private readonly saltRounds = 10;

    async hash(data: string): Promise<string> {
        return bcrypt.hash(data, this.saltRounds);
    }

    async compare(data: string, encrypted: string): Promise<boolean> {
        return bcrypt.compare(data, encrypted);
    }
}
