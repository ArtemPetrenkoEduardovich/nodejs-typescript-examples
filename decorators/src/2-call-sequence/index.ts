const ClassLog = (constructor: Function) => {
  console.log('Class decorator');
};

const MethodLog = (
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor,
) => {
  console.log('Method decorator:', propertyKey);
};

const PropertyLog = (target: any, propertyKey: string) => {
  console.log('Property decorator:', propertyKey);
};

const ParamLog = (target: any, propertyKey: string, parameterIndex: number) => {
  console.log(`Parameter decorator: ${propertyKey}, index ${parameterIndex}`);
};

@ClassLog
class Example {
  @PropertyLog
  name!: string;

  @MethodLog
  greet(@ParamLog message: string) {
    console.log('Hello', message);
  }
}

export const apply = () => {
  // new Example().greet('world');
};
