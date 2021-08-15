export interface Ticket {
  id?: number;
  title: string;
  type_id: number;
  type_name?: string;
  status_id: number;
  status_name?: string;
  departament_id: number;
  departament_name?: string;
  channel_id: number;
  channel_name?: string;
  owner_id: string;
  owner_name?: string;
  owner_email?: string;
  owner_phone_number?: string;
  agent_id: string;
  agent_name?: string;
  message?: string;
  created_at?: string;
}
