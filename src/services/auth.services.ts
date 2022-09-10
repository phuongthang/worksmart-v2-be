import { omit } from "lodash";
import log from "../logs/log";
import Accounts, { IAccounts } from "../models/accounts.models";
import { generatorCode } from "../utils/auth.utils";
import { sendMailVerifyLoginCodeTemplate } from "../utils/mail.utils";
import { verifyPassword } from "../utils/password.utils";

export async function verifyAccountAndGeneratorCode(email: string, password: string) {
  try {
    const account: IAccounts | any = await Accounts.findOne({ email: email });
    if (!account) {
      return false;
    }
    const isVerify = await verifyPassword(password, account.password);
    if (!isVerify) {
      return false;
    }

    const loginCode = generatorCode();
    account.loginCode = loginCode;
    account.save();

    const mailTo = account.email;
    await sendMailVerifyLoginCodeTemplate(mailTo, loginCode);

    return omit(account.toJSON(), "password", "loginCode", "passwordCode");
  } catch (e) {
    log.error(e);
    return false;
  }
}

export async function verifyLoginCode(email: string, loginCode: string) {
  try {
    const account: IAccounts | any = await Accounts.findOne({ email: email });
    if (!account) {
      return false;
    }
    const isVerify = account.loginCode === loginCode ? true : false;
    if (!isVerify) {
      return false;
    }
    return omit(account.toJSON(), "password", "loginCode", "passwordCode");
  } catch (e) {
    log.error(e);
    return false;
  }
}
