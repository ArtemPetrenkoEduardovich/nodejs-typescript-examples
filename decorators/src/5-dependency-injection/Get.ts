import { Application } from './Application';

export const Get = (path: string = ''): MethodDecorator => {
  return (
    target: any,
    key: string | symbol,
    descriptor: PropertyDescriptor,
  ): void => {
    const route = { method: 'get', path, handler: descriptor.value };
    Application.registerRoute(target.constructor, route);
  };
};
