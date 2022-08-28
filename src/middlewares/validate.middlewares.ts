import { AnySchema } from "yup";
import { Request, Response, NextFunction } from "express";
import log from "../logs/log";

const validate = (schema: AnySchema) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await schema.validate({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    return next();
  } catch (e: any) {
    log.error(e);
    return res.status(422).json({
      code: 422,
      message: "Đã có lỗi sảy ra. Vui lòng thử lại !",
      errors: e.errors,
    });
  }
};

export default validate;
