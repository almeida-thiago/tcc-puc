export interface Person {
  id?: number;
  name: string;
  email_id?: number;
  email?: string;
  phone_number_id?: number;
  phone_number?: string;
  status?: boolean;
  last_updated_at?: string;
  created_at?: string;
}

export interface Email {
  id?: number;
  email: string;
  person_id: number;
  is_primary?: boolean;
  status?: boolean;
  last_updated_at?: string;
  created_at?: string;
}

export interface PhoneNumber {
  id?: number;
  phone_number: string;
  person_id: number;
  is_primary?: boolean;
  status?: boolean;
  last_updated_at?: string;
  created_at?: string;
}
