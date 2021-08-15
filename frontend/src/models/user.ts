export interface User {
  username: string;
  password?: string;
  person_id: string;
  person_name?: string;
  permission_id: number;
  permission_name?: string;
  permission_level?: number;
  facebook_id?: string;
  google_id?: string;
  status?: boolean;
  last_updated_at?: string;
  created_at?: string;
}

export interface Permission {
  id?: number;
  name: string;
  status?: boolean;
  last_updated_at?: string;
  created_at?: string;
}

export interface LoggedUser {
  permission_id?: number;
  permission_name?: string;
  permission_level?: number;
  person_id?: string;
  person_name?: string;
  token?: string;
}
