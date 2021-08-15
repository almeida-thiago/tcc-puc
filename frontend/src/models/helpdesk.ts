export interface Ticket {
  id?: string;
  title: string;
  type_id: number;
  type_name?: string;
  status_id: number;
  status_name?: string;
  channel_id: number;
  channel_name?: string;
  departament_id?: number;
  departament_name?: string;
  owner_id: string;
  owner_name?: string;
  agent_id?: string;
  agent_name?: string
  created_at?: string;
}

export interface TicketMessage {
  id?: number;
  ticket_id: string
  message: string;
  person_id: string;
  person_name?: string;
  attachaments?: TicketMessageAttachament[];
  status?: number;
  created_at?: string;
}

export interface TicketMessageAttachament {
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

export interface TicketStatus {
  id?: number;
  name: string;
  status?: boolean;
  last_updated_at?: string;
  created_at?: string;
}

export interface TicketType {
  id?: number;
  name: string;
  status?: boolean;
  last_updated_at?: string;
  created_at?: string;
}

export interface Departament {
  id?: number;
  name: string;
  status?: boolean;
  last_updated_at?: string;
  created_at?: string;
}

export interface Channel {
  id?: number;
  name: string;
  status?: boolean;
  last_updated_at?: string;
  created_at?: string;
}
