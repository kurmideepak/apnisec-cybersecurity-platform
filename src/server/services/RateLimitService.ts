
interface RateLimitStore {
    timestamps: number[];
}

export class RateLimitService {
    private store: Map<string, RateLimitStore> = new Map();
    private readonly limit: number;
    private readonly windowMs: number;

    constructor(limit: number = 100, windowMs: number = 15 * 60 * 1000) {
        this.limit = limit;
        this.windowMs = windowMs;
    }

    public checkLimit(key: string): {
        allowed: boolean;
        remaining: number;
        resetTime: number
    } {
        const now = Date.now();
        const record = this.store.get(key) || { timestamps: [] };

        // Filter out timestamps outside the window
        const validTimestamps = record.timestamps.filter(t => now - t < this.windowMs);

        // Calculate reset time (oldest timestamp + window) or now + window if empty
        const resetTime = validTimestamps.length > 0
            ? validTimestamps[0] + this.windowMs
            : now + this.windowMs;

        if (validTimestamps.length >= this.limit) {
            this.store.set(key, { timestamps: validTimestamps });
            return {
                allowed: false,
                remaining: 0,
                resetTime
            };
        }

        // Add new request
        validTimestamps.push(now);
        this.store.set(key, { timestamps: validTimestamps });

        return {
            allowed: true,
            remaining: this.limit - validTimestamps.length,
            resetTime
        };
    }

    // Clean up old entries periodically if needed, 
    // though built-in filter handles logic correcty.
}
