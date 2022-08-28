import { NextFunction, Request, Response } from "express";
import log from "../logs/log";

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;
    console.log("email, password", email, password);
    res.status(200).json({
      code: 200,
      message: "Thành công !",
    });
    next();
  } catch (e) {
    log.error(e);
    res.status(400).json({
      code: 400,
      message: "Đã có lỗi sảy ra. Vui lòng thử lại !",
    });
    next();
  }
}
