import 'reflect-metadata';

export class DIContainer {
  private static services = new Map<string, any>();

  static register<T>(target: new (...args: any[]) => T): T {
    const className = target.name;
    if (this.services.has(className)) {
      return this.services.get(className);
    }

    const paramTypes: any[] =
      Reflect.getMetadata('design:paramtypes', target) || [];

    const resolvedDeps = paramTypes.map((dep) => this.register(dep));

    const instance = new target(...resolvedDeps);
    this.services.set(className, instance);
    return instance;
  }

  static resolve<T>(service: new (...args: any[]) => T): T {
    const instance = this.services.get(service.name);
    if (!instance) {
      throw new Error('Error: unable to resolve service');
    }
    return instance;
  }
}
