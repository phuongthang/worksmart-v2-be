import { object, string } from "yup";

export const loginSchema = object({
  body: object({
    password: string().required("Mật khẩu là mục bắt buộc !").min(8, "Mật khẩu phải có ít nhất 8 kí tự !"),
    email: string().email("Sai định dạng Email").required("Email là mục bắt buộc !"),
  }),
});
