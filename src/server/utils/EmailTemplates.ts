
export class EmailTemplates {
    static welcome(name: string): string {
        return `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h1>Welcome to Apni Sec, ${name}!</h1>
        <p>We are excited to have you on board.</p>
        <p>Start tracking your security assessments effectively.</p>
        <br>
        <p>Best Regards,<br>Apni Sec Team</p>
      </div>
    `;
    }

    static issueCreated(userName: string, issueTitle: string, issueId: string): string {
        return `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h2>New Issue Created</h2>
        <p>Hello ${userName},</p>
        <p>You have successfully reported a new issue:</p>
        <blockquote style="border-left: 4px solid #ccc; padding-left: 10px; color: #555;">
          <strong>Title:</strong> ${issueTitle}<br>
          <strong>ID:</strong> ${issueId}
        </blockquote>
        <p>Our team will review it shortly.</p>
      </div>
    `;
    }

    static profileUpdated(userName: string): string {
        return `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h2>Profile Updated</h2>
        <p>Hello ${userName},</p>
        <p>Your profile information has been successfully updated.</p>
        <p>If you did not make this change, please contact support immediately.</p>
      </div>
    `;
    }
}
