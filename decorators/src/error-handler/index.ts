import { ThrowErrorTest } from './ThrowErrorTest';
import { CustomError } from './CustomError';

export const apply = async () => {
  const throwErrorTest = new ThrowErrorTest();
  await throwErrorTest.executeSuccessfully();
  try {
    await throwErrorTest.throwError();
  } catch (error) {
    if (error instanceof CustomError) {
      console.log(error.message, error.errorCode);
    } else {
      throw error;
    }
  }
};
