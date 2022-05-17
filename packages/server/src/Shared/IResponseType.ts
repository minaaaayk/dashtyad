export interface IResponseType {
  prettyMessage: string;
  status: number;
  data?: {
    accessToken: string;
    userId: string;
    refreshToken: string;
  };
  success: boolean;
  message?: string;
}