import nodemailer, { TransportOptions } from "nodemailer";
import log from "../logs/log";

interface IOptions {
  from: string | undefined;
  to: string | undefined;
  subject: string | undefined;
  text: string | undefined;
}

export async function sendMail(mailTo: string, subject: string, text: string) {
  try {
    const configs: TransportOptions | any = {
      service: process.env.MAIL_SERVICE,
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    };

    const options: IOptions = {
      from: process.env.USER,
      to: mailTo,
      subject: subject,
      text: text,
    };

    const transporter = nodemailer.createTransport(configs);

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
