import { Application } from "express";
import { login, verifyCode } from "../controllers/auth.controllers";
import { resetPassword, verifyResetPasswordCode } from "../controllers/password.controllers";
import { verifyAccessToken } from "../middlewares/middlewares";
import validateRequest from "../middlewares/validateRequest.middlewares";
import { loginCodeSchema, loginSchema } from "../schema/auth.schema";
import { emailSchema, passwordCodeSchema } from "../schema/password.schema";

const initRoutes = (app: Application) => {
  app.post("/api/v1/login", validateRequest(loginSchema), login);
  app.post("/api/v1/verify-login-code", validateRequest(loginCodeSchema), verifyAccessToken, verifyCode);
  app.post("/api/v1/reset-password", validateRequest(emailSchema), resetPassword);
  app.post("/api/v1/verify-password-code", validateRequest(passwordCodeSchema), verifyAccessToken, verifyResetPasswordCode);
};

export default initRoutes;
