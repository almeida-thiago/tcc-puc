import { Attachament } from '@models/attachament'

export interface Message {
  id?: number;
  ticket_id: string;
  person_id: string;
  message: string;
  status?: boolean;
  attachaments?: Attachament[];
  last_updated_at?: string;
  created_at?: string;
}
