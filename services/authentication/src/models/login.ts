export interface SignIn {
  recaptchaToken?: string;
  username?: string;
  password?: string;
  service?: string;
  accessToken?: string;
  keep_conected?: boolean;
}