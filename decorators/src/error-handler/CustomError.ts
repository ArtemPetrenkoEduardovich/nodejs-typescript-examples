export class CustomError extends Error {
  public errorCode: string | number;

  constructor(message: string, errorCode: string | number) {
    super(message);
    this.name = 'CustomError';
    this.errorCode = errorCode;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError);
    }
  }
}
