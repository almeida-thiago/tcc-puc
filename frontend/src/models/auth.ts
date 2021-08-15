export interface SignUp {
  recaptchaToken: string;
  name: string;
  email: string;
  phone_number?: number;
  username: string;
  password: string;
}

export interface SignIn {
  recaptchaToken?: string;
  username?: string;
  password?: string;
  service?: 'google';
  accessToken?: string;
  keep_conected?: boolean;
}

export interface Token {
  person_id: string;
  person_name: string;
  permission_id: number;
  permission_name: string;
  permission_level: number;
  iat?: number;
  exp?: number;
}

export interface ForgotPassword {
  recaptchaToken?: string;
  username: string;
  method: 'email' | 'sms';
}

export interface ChangePassword {
  recaptchaToken?: string;
  username: string;
  password: string;
  secret_code: string;
}
