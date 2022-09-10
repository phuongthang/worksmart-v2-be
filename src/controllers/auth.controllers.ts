import { NextFunction, Request, Response } from "express";
import log from "../logs/log";
import { verifyAccountAndGeneratorCode, verifyLoginCode } from "../services/auth.services";
import { generatorAccessToken } from "../utils/auth.utils";

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;
    const account = await verifyAccountAndGeneratorCode(email, password);

    if (!account) {
      return res.status(401).json({
        code: 401,
        data: false,
        message: "Thông tin tài khoản hoặc mật khẩu không chính xác !",
      });
    }

    const token = generatorAccessToken(account);
    res.status(200).json({
      code: 200,
      data: {
        token: token,
      },
      message: "Đăng nhập thành công !",
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

export async function verifyCode(req: Request | any, res: Response, next: NextFunction) {
  try {
    const { loginCode } = req.body;
    const { data } = req.data;

    const account = await verifyLoginCode(data.email, loginCode);
    if (!account) {
      return res.status(401).json({
        code: 401,
        data: false,
        message: "Mã xác thực không chính xác. Vui lòng thử lại !",
      });
    }

    res.status(200).json({
      code: 200,
      data: {
        account: account,
      },
      message: "Xác thực thành công !",
    });
    next();

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
