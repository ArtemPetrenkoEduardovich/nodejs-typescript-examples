import { Application } from './Application';
import { DIContainer } from './DIContainer';

export const Controller =
  (path: string = ''): ClassDecorator =>
  (target: any) => {
    const instance = DIContainer.register(target);
    Application.setupRoutes(target, path, instance);
  };
