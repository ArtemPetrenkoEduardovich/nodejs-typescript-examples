import { ErrorHandler } from './ErrorHandler';

export class ThrowErrorTest {
  @ErrorHandler()
  async throwError() {
    throw new Error('throwError');
  }

  @ErrorHandler()
  async executeSuccessfully() {
    console.log('Success');
  }
}
