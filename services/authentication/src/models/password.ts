export interface ChangePassword {
  recaptchaToken?: string;
  username: string;
  password: string;
  secret_code: string;
}

export interface ForgotPassword {
  recaptchaToken?: string;
  username: string;
  method?: string;
}