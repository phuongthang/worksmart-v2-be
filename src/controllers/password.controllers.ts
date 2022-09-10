import { NextFunction, Request, Response } from "express";
import log from "../logs/log";
import { verifyChangePassword, verifyEmailAndGeneratorCode, verifyPasswordCode } from "../services/password.services";

export async function resetPassword(req: Request | any, res: Response, next: NextFunction) {
  try {
    const { email } = req.body;

    const isSuccess = await verifyEmailAndGeneratorCode(email);
    if (!isSuccess) {
      return res.status(400).json({
        code: 400,
        data: false,
        message: "Email không tồn tại. Vui lòng thử lại !",
      });
    }

    res.status(200).json({
      code: 200,
      data: true,
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

export async function verifyResetPasswordCode(req: Request | any, res: Response, next: NextFunction) {
  try {
    const { passwordCode } = req.body;
    const { data } = req.data;

    const isSuccess = await verifyPasswordCode(data.email, passwordCode);
    if (!isSuccess) {
      return res.status(400).json({
        code: 400,
        data: false,
        message: "Mã xác thực không chính xác. Vui lòng thử lại !",
      });
    }

    res.status(200).json({
      code: 200,
      data: true,
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

export async function changePassword(req: Request | any, res: Response, next: NextFunction) {
  try {
    const { passwordOld, passwordNew } = req.body;
    const { data } = req.data;

    const isSuccess = await verifyChangePassword(data.email, passwordOld, passwordNew);
    if (!isSuccess) {
      return res.status(400).json({
        code: 400,
        data: false,
        message: "Mật khẩu cũ không chính xác. Vui lòng thử lại !",
      });
    }

    res.status(200).json({
      code: 200,
      data: true,
      message: "Thay đổi mật khẩu thành công !",
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
