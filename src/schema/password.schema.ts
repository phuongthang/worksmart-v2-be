import { object, string } from "yup";
export const emailSchema = object({
  body: object({
    email: string().email("Sai định dạng Email").required("Email là mục bắt buộc !"),
  }),
});

export const passwordCodeSchema = object({
  body: object({
    passwordCode: string().required("Mã xác thực là mục bắt buộc !"),
  }),
});
