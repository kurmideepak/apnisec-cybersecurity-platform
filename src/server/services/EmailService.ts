
import { Resend } from 'resend';
import { IEmailService } from './interfaces/IEmailService';
import { EmailTemplates } from '../utils/EmailTemplates';
import { AppError } from '../errors/AppError';

export class EmailService implements IEmailService {
    private resend: Resend;
    private fromEmail: string;

    constructor() {
        const apiKey = process.env.RESEND_API_KEY;
        if (!apiKey) {
            console.warn("RESEND_API_KEY is not set. Email service will fallback to console logging.");
        }
        this.resend = new Resend(apiKey || 're_123'); // Fallback for dev to prevent crash on init
        this.fromEmail = process.env.EMAIL_FROM || 'onboarding@resend.dev';
    }

    async sendWelcomeEmail(email: string, name: string): Promise<void> {
        try {
            if (!process.env.RESEND_API_KEY) {
                console.log(`[MOCK EMAIL] To: ${email}, Subject: Welcome, Body: ${EmailTemplates.welcome(name)}`);
                return;
            }

            await this.resend.emails.send({
                from: this.fromEmail,
                to: email,
                subject: 'Welcome to Apni Sec',
                html: EmailTemplates.welcome(name),
            });
        } catch (error) {
            console.error('Failed to send welcome email:', error);
            // We don't throw here to avoid failing the user registration if email fails
        }
    }

    async sendIssueCreatedEmail(email: string, name: string, issueTitle: string, issueId: string): Promise<void> {
        try {
            if (!process.env.RESEND_API_KEY) {
                console.log(`[MOCK EMAIL] To: ${email}, Subject: Issue Created, Body: ${EmailTemplates.issueCreated(name, issueTitle, issueId)}`);
                return;
            }

            await this.resend.emails.send({
                from: this.fromEmail,
                to: email,
                subject: 'New Issue Created - Apni Sec',
                html: EmailTemplates.issueCreated(name, issueTitle, issueId),
            });
        } catch (error) {
            console.error('Failed to send issue created email:', error);
        }
    }

    async sendProfileUpdatedEmail(email: string, name: string): Promise<void> {
        try {
            if (!process.env.RESEND_API_KEY) {
                console.log(`[MOCK EMAIL] To: ${email}, Subject: Profile Updated, Body: ${EmailTemplates.profileUpdated(name)}`);
                return;
            }

            await this.resend.emails.send({
                from: this.fromEmail,
                to: email,
                subject: 'Profile Updated - Apni Sec',
                html: EmailTemplates.profileUpdated(name),
            });
        } catch (error) {
            console.error('Failed to send profile updated email:', error);
        }
    }
}
