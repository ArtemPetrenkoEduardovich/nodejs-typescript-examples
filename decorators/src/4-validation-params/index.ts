// prototype -> (methodName -> [parameterIndexes])
const positiveParams: WeakMap<
  Object,
  Map<string | symbol, number[]>
> = new WeakMap();

// ---------------- Parameter Decorator ----------------
function Positive(): ParameterDecorator {
  return (
    target: Object,
    propertyKey: string | symbol | undefined,
    parameterIndex: number,
  ): void => {
    if (!propertyKey) return;

    let methods: Map<string | symbol, number[]> | undefined =
      positiveParams.get(target);

    if (!methods) {
      methods = new Map<string | symbol, number[]>();
      positiveParams.set(target, methods);
    }

    const indexes: number[] = methods.get(propertyKey) ?? [];
    indexes.push(parameterIndex);
    methods.set(propertyKey, indexes);
  };
}

// ---------------- Method Decorator ----------------
function Validate(): MethodDecorator {
  return <T>(
    target: Object,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<T>,
  ): TypedPropertyDescriptor<T> | void => {
    const originalMethod = descriptor.value;

    if (typeof originalMethod !== 'function') return;

    descriptor.value = function (this: unknown, ...args: unknown[]): unknown {
      const methods = positiveParams.get(target);
      const indexes: number[] = methods?.get(propertyKey) ?? [];

      for (const index of indexes) {
        const value = args[index];

        if (typeof value !== 'number' || value <= 0) {
          throw new Error(
            `Parameter #${index + 1} of "${String(
              propertyKey,
            )}" must be a positive number (received: ${value})`,
          );
        }
      }

      return originalMethod.apply(this, args);
    } as T;

    return descriptor;
  };
}

// ---------------- Usage ----------------
class Shop {
  @Validate()
  addToCart(@Positive() quantity: number, product: string): void {
    console.log(`Added ${quantity} x ${product}`);
  }

  @Validate()
  setPrice(@Positive() price: number): void {
    console.log(`Price set to ${price}`);
  }
}

export const apply = (): void => {
  const shop = new Shop();

  shop.addToCart(3, 'Book');
  shop.setPrice(1999);

  shop.addToCart(0, 'Book'); // Error
  shop.setPrice(-100); // Error
};
