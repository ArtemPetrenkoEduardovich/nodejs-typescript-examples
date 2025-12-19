import express from 'express';

export class Application {
  private static app = express();
  private static routes = new Map<string, any[]>();

  static registerRoute(
    controller: any,
    route: { method: string; path: string; handler: Function },
  ) {
    const routes = this.routes.get(controller.name) || [];
    routes.push(route);
    this.routes.set(controller.name, routes);
  }

  static setupRoutes(target: any, basePath: string, instance: any) {
    const routes = this.routes.get(target.name) || [];
    routes.forEach((route) => {
      const fullPath = `${basePath}${route.path}`.replace(/\/+/g, '/');
      // this.app.get('/path', () => { ... })
      // this.app.post('/path', () => { ... })
      (this.app as any)[route.method](
        fullPath,
        async (req: express.Request, res: express.Response) => {
          const result = await route.handler.call(instance, req, res);
          if (result) {
            res.send(result);
          }
        },
      );
    });
  }

  static start(port: number) {
    this.app.listen(port, () =>
      console.log(`Server running on http://localhost:${port}`),
    );
  }
}
