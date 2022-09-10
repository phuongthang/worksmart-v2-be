import log from "../logs/log";
import Accounts, { IAccounts } from "../models/accounts.models";
import { generatorCode } from "../utils/auth.utils";
import { sendMailGeneratorPasswordTemplate, sendMailVerifyPasswordCodeTemplate } from "../utils/mail.utils";
import { generatorPassword, hashSyncPassword, verifyPassword } from "../utils/password.utils";

export async function verifyEmailAndGeneratorCode(email: string) {
  try {
    const account: IAccounts | any = await Accounts.findOne({ email: email });
    if (!account) {
      return false;
    }
    const passwordCode = generatorCode();
    account.passwordCode = passwordCode;
    account.save();

    const mailTo = account.email;
    await sendMailVerifyPasswordCodeTemplate(mailTo, passwordCode, account.userName);

    return true;
  } catch (e) {
    log.error(e);
    return false;
  }
}

export async function verifyPasswordCode(email: string, passwordCode: string) {
  try {
    const account: IAccounts | any = await Accounts.findOne({ email: email });
    if (!account || !account.passwordCode) {
      return false;
    }
    const isVerify = account.passwordCode === passwordCode ? true : false;
    if (!isVerify) {
      return false;
    }

    const password = await generatorPassword();
    account.password = await hashSyncPassword(password);
    account.passwordCode = "";
    account.save();

    const mailTo = account.email;
    await sendMailGeneratorPasswordTemplate(mailTo, password, account.userName);

    return true;
  } catch (e) {
    log.error(e);
    return false;
  }
}

export async function verifyChangePassword(email: string, passwordOld: string, passwordNew: string) {
  try {
    const account: IAccounts | any = await Accounts.findOne({ email: email });
    if (!account) {
      return false;
    }
    const isVerify = await verifyPassword(passwordOld, account.password);
    if (!isVerify) {
      return false;
    }

    account.password = await hashSyncPassword(passwordNew);
    if (account.isLoginFirstTime) {
      account.isLoginFirstTime = 0;
    }
    account.save();

    return true;
  } catch (e) {
    log.error(e);
    return false;
  }
}
