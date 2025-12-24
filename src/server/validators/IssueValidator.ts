import { AppError } from "../errors/AppError";

const IssueType = {
    CLOUD_SECURITY: 'CLOUD_SECURITY',
    RETEAM_ASSESSMENT: 'RETEAM_ASSESSMENT',
    VAPT: 'VAPT'
};

export class IssueValidator {
    validateCreate(data: any): void {
        const { title, description, type } = data;
        if (!title || title.length < 3) {
            throw new AppError("Title is required and must be at least 3 characters", 400);
        }
        if (!description) {
            throw new AppError("Description is required", 400);
        }
        if (!type || !Object.values(IssueType).includes(type)) {
            throw new AppError(`Invalid type. Must be one of: ${Object.values(IssueType).join(", ")}`, 400);
        }
    }

    validateUpdate(data: any): void {
        if (data.type && !Object.values(IssueType).includes(data.type)) {
            throw new AppError(`Invalid type. Must be one of: ${Object.values(IssueType).join(", ")}`, 400);
        }
    }
}
