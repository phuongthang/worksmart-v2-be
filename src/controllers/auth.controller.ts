import { NextFunction, Request, Response } from "express";
import log from "../logs/log";
import { verifyAccount } from "../services/accounts.services";

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;
    const account = await verifyAccount(email, password);

    if (!account) {
      return res.status(401).json({
        code: 401,
        message: "Thông tin tài khoản hoặc mật khẩu không chính xác !",
      });
    }
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
