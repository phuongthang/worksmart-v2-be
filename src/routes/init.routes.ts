import { Application } from "express";
import { login, verifyCode } from "../controllers/auth.controller";
import { verifyAccessToken } from "../middlewares/middlewares";
import validateRequest from "../middlewares/validateRequest.middlewares";
import { loginCodeSchema, loginSchema } from "../schema/auth.schema";

const initRoutes = (app: Application) => {
  app.post("/api/v1/login", validateRequest(loginSchema), login);
  app.post("/api/v1/verify-code", validateRequest(loginCodeSchema), verifyAccessToken, verifyCode);
};

export default initRoutes;
