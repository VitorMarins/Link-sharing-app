import express from "express";
import type { Application } from "express";
import morgan from "morgan";
import { userRoutes } from "./routes/UserRoutes";
import { linkRoutes } from "./routes/LinkRoutes";

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
    this.app.use(morgan("dev"));
  }

  private routes() {
    this.app.use("/users", userRoutes);
    this.app.use("/links", linkRoutes);
  }

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
