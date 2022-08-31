export interface HttpExeptionResponse {
  statusCode: number;
  message: string;
}

export interface CustomHttpExeptionResponse extends HttpExeptionResponse {
  path: string;
  method: string;
  timeStamp: Date;
}
