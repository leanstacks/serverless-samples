export class ValidationError extends Error {
  code: number = 400;
  name: string = 'ValidationError';
  status: number = 400;
}
