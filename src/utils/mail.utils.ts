import nodemailer, { TransportOptions } from "nodemailer";
import path from "path";
import log from "../logs/log";
import hbs from "nodemailer-express-handlebars";

interface IOptions {
  from: string | undefined;
  to: string | undefined;
  subject: string | undefined;
  template: string;
  context: any;
}

export async function sendMailVerifyLoginCodeTemplate(mailTo: string, loginCode: string) {
  try {
    const configs: TransportOptions | any = {
      service: process.env.MAIL_SERVICE,
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      secure: true,
      auth: {
        user: process.env.MAIL_FROM,
        pass: process.env.MAIL_PASSWORD,
      },
    };

    const hbsOptions: any = {
      viewEngine: {
        extName: ".handlebars",
        partialsDir: path.resolve("./src/views"),
        defaultLayout: false,
        layoutsDir: "./src/views",
      },
      viewPath: path.resolve("./src/views"),
      extName: ".handlebars",
    };

    const options: IOptions = {
      from: process.env.MAIL_FROM,
      to: mailTo,
      subject: "THÔNG BÁO XÁC THỰC ĐĂNG NHẬP",
      template: "verify-login-code-template",
      context: {
        loginCode: loginCode,
      },
    };

    const transporter = nodemailer.createTransport(configs);
    transporter.use("compile", hbs(hbsOptions));

    transporter.sendMail(options, (err, info) => {
      if (err) {
        log.error(err);
        return;
      }
      log.info(info.response);
    });
  } catch (err) {
    log.error(err);
  }
}

export async function sendMailVerifyPasswordCodeTemplate(mailTo: string, passwordCode: string, userName: string) {
  try {
    const configs: TransportOptions | any = {
      service: process.env.MAIL_SERVICE,
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      secure: true,
      auth: {
        user: process.env.MAIL_FROM,
        pass: process.env.MAIL_PASSWORD,
      },
    };

    const hbsOptions: any = {
      viewEngine: {
        extName: ".handlebars",
        partialsDir: path.resolve("./src/views"),
        defaultLayout: false,
        layoutsDir: "./src/views",
      },
      viewPath: path.resolve("./src/views"),
      extName: ".handlebars",
    };

    const options: IOptions = {
      from: process.env.MAIL_FROM,
      to: mailTo,
      subject: "THÔNG BÁO YÊU CẦU CẤP LẠI MẬT KHẨU",
      template: "verify-password-code-template",
      context: {
        passwordCode: passwordCode,
        userName: userName
      },
    };

    const transporter = nodemailer.createTransport(configs);
    transporter.use("compile", hbs(hbsOptions));

    transporter.sendMail(options, (err, info) => {
      if (err) {
        log.error(err);
        return;
      }
      log.info(info.response);
    });
  } catch (err) {
    log.error(err);
  }
}

export async function sendMailGeneratorPasswordTemplate(mailTo: string, password: string, userName: string) {
  try {
    const configs: TransportOptions | any = {
      service: process.env.MAIL_SERVICE,
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      secure: true,
      auth: {
        user: process.env.MAIL_FROM,
        pass: process.env.MAIL_PASSWORD,
      },
    };

    const hbsOptions: any = {
      viewEngine: {
        extName: ".handlebars",
        partialsDir: path.resolve("./src/views"),
        defaultLayout: false,
        layoutsDir: "./src/views",
      },
      viewPath: path.resolve("./src/views"),
      extName: ".handlebars",
    };

    const options: IOptions = {
      from: process.env.MAIL_FROM,
      to: mailTo,
      subject: "THÔNG BÁO CẬP NHẬT MẬT KHẨU MỚI",
      template: "generator-password-template",
      context: {
        password: password,
        userName: userName
      },
    };

    const transporter = nodemailer.createTransport(configs);
    transporter.use("compile", hbs(hbsOptions));

    transporter.sendMail(options, (err, info) => {
      if (err) {
        log.error(err);
        return;
      }
      log.info(info.response);
    });
  } catch (err) {
    log.error(err);
  }
}
