import { Application } from "express";
import { login } from "../controllers/auth.controller";
import validate from "../middlewares/validate.middlewares";
import { loginSchema } from "../schema/auth.schema";

const initRoutes = (app: Application) => {
  app.post("/api/v1/login", validate(loginSchema), login);
};

export default initRoutes;
