declare module '@modelcontextprotocol/sdk' {
    export class Server {
      setRequestHandler(name: string, handler: (request: any) => Promise<any>): void;
      setResource(name: string, resource: (params: any) => Promise<any>): void;
      setPrompts(prompts: any): void;
      setContextManager(manager: any): void;
      start(): void;
    }
  }