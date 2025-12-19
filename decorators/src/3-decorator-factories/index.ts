// ----------------- Class Decorator -----------------
function ClassLogger(prefix: string): ClassDecorator {
  return function <TFunction extends Function>(target: TFunction): void {
    console.log(`${prefix} ClassDecorator applied to:`, target.name);
  };
}

// ----------------- Property Decorator -----------------
function PropertyLogger(prefix: string): PropertyDecorator {
  return function (target: Object, propertyKey: string | symbol): void {
    console.log(
      `${prefix} PropertyDecorator applied to property:`,
      String(propertyKey),
    );
  };
}

// ----------------- Method Decorator -----------------
function MethodLogger(prefix: string): MethodDecorator {
  return function <T>(
    target: Object,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<T>,
  ): void {
    console.log(
      `${prefix} MethodDecorator applied to method:`,
      String(propertyKey),
    );
  };
}

// ----------------- Parameter Decorator -----------------
function ParameterLogger(prefix: string): ParameterDecorator {
  return function (
    target: Object,
    propertyKey: string | symbol | undefined,
    parameterIndex: number,
  ): void {
    console.log(
      `${prefix} ParameterDecorator applied to parameter #${parameterIndex} of:`,
      propertyKey ? String(propertyKey) : 'constructor',
    );
  };
}

// ----------------- Example Usage -----------------
@ClassLogger('class >>')
class Example {
  @PropertyLogger('property >>')
  myProp: string = 'hello';

  constructor(@ParameterLogger('parameter 1 >>') param1: string) {}

  @MethodLogger('method >>')
  myMethod(@ParameterLogger('parameter 2 >>') param2: number) {}
}

export const apply = () => {
  new Example('constructor');
};