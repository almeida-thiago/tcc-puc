export interface EmailSend {
  to: string;
  subject: string;
  message: string;
}

export interface EmailRead {
  id: number;
  from: string;
  fromEmail: string;
  date: string;
  subject: string;
  text: string;
  textAsHtml?: string;
  html?: boolean;
  attachments: any[];
}

export interface EmailSettings {
  email_user: string;
  email_password?: string;
  email_imap_host: string;
  email_imap_port: number;
  email_smtp_host: string;
  email_smtp_port: number;
}
