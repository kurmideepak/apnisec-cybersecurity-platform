
export interface IEmailService {
    sendWelcomeEmail(email: string, name: string): Promise<void>;
    sendIssueCreatedEmail(email: string, name: string, issueTitle: string, issueId: string): Promise<void>;
    sendProfileUpdatedEmail(email: string, name: string): Promise<void>;
}
