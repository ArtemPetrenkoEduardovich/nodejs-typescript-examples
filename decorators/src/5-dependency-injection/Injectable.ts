import { DIContainer } from './DIContainer';

export const Injectable = (): ClassDecorator => (target: any) => {
  DIContainer.register(target);
};
