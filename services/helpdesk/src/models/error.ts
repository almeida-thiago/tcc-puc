export interface Error {
  httpCode: number;
  errorCode: string;
  errorMessage: string;
  errorDetails: string | null;
}