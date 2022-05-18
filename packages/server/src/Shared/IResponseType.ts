export interface IResponseType {
  message: string;
  status: number;
  auth?: {
    accessToken: string;
    refreshToken: string;
    userId: string;
  };
  response?: object; 
  success: boolean;
}