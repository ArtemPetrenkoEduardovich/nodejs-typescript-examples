import { CustomError } from './CustomError';

export const ErrorHandler =
  (): MethodDecorator =>
  (
    target: Object,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
  ) => {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      try {
        return await originalMethod.apply(this, args);
      } catch (error) {
        const message = 'Throwing CustomError';
        throw new CustomError(message, 400);
      }
    };

    return descriptor;
  };
