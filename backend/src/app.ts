import express, { Application } from "express";

class App {
  private app: Application;

  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  private middlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private routes() {}

  public Start(port: number) {
    const appRuning = this.app.listen(port, () => {
      console.log(`🚀 Servidor rodando em http://localhost:${port}`);
    });
    appRuning.on("error", (e: Error) => {
      console.error("Erro no servidor:", e);
    });
  }

  public getApp(): Application {
    return this.app;
  }
}

export default App;
