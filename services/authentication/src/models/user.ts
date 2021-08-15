export interface User {
  username: string;
  password?: string;
  person_id: string;
  person_name?: string;
  permission_id: number;
  permission_level?: number;
  permission_name?: string;
  login_tries?: number;
  secret_code?: string;
  google_id?: string;
  status?: boolean;
  created_at?: string;
  last_updated_at?: string;
}

export interface UserSignUp {
  username: string;
  password?: string;
  name: string;
  email: string;
  phone_number?: number;
}
