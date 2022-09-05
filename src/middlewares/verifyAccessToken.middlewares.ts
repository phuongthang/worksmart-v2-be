import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import log from "../logs/log";

const validateRequest = async (req: Request | any, res: Response, next: NextFunction) => {
  try {
    if (!req.headers["authorization"]) {
      log.error(req);
      return res.status(401).json({
        code: 401,
        message: "Vui lòng đăng nhập !",
      });
    }
    const authHeader = req.headers["authorization"];
    const bearerToken = authHeader.split(" ");
    const token = bearerToken[1];
    jwt.verify(token, process.env.JWT_SECRET_KEY as string, (err: any, data: any) => {
      if (err) {
        log.error(err);
        return res.status(400).json({
          code: 400,
          message: "Đã có lỗi sảy ra. Vui lòng thử lại sau !",
        });
      }
      req.data = data;
      next();
    });
  } catch (e: any) {
    log.error(e);
    return res.status(400).json({
      code: 400,
      message: "Đã có lỗi sảy ra. Vui lòng thử lại !",
      errors: e.errors,
    });
  }
};

export default validateRequest;
