import { Application, Request, Response } from "express";

const initAppRoutes = (app: Application) => {
  app.get("/", (req: Request, res: Response) => {
    res.send("Hello world");
  });
};

export default initAppRoutes;
