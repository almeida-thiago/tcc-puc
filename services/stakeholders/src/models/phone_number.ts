export interface PhoneNumber {
  id?: number;
  phone_number: string;
  person_id?: string;
  is_primary?: boolean;
  status?: boolean;
  last_updated_at?: string;
  created_at?: string;
}