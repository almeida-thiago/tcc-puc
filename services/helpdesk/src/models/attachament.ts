export interface Attachament {
  id?: number;
  ticket_id: string;
  message_id: number;
  name: string;
  link: string;
  extention: string;
  size: number;
  status?: boolean;
  created_at?: string;
}