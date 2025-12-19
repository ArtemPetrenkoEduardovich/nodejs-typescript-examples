export const LogMethod =
  (
    target: Object,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
  ) => {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const methodName = String(propertyKey);
      console.log(`Calling '${methodName}' with args:`, args);

      const start = performance.now();
      const result = originalMethod.apply(this, args);
      const end = performance.now();
      console.log(`${methodName} took ${end - start}ms`);

      console.log(`Result from '${methodName}':`, result);
      console.log('\n');
      return result;
    };

    return descriptor;
  };
