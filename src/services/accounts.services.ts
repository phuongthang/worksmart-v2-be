import { omit } from "lodash";
import log from "../logs/log";
import Accounts, { IAccounts } from "../models/accounts.models";
import { generatorCode } from "../utils/auth.utils";
import { comparePassword } from "../utils/password.utils";

export async function verifyAccount(email: string, password: string) {
  try {
    const account: IAccounts | any = await Accounts.findOne({ email: email });
    if (!account) {
      return false;
    }
    const isVerify = await comparePassword(password, account.password);
    if (!isVerify) {
      return false;
    }
    account.loginCode = generatorCode();
    account.save();
    return omit(account.toJSON(), "password", "loginCode");
  } catch (e) {
    log.error(e);
    return false;
  }
}

export async function compareLoginCode(email: string, loginCode: string) {
  try {
    const account: IAccounts | any = await Accounts.findOne({ email: email });
    if (!account) {
      return false;
    }
    const isVerify = account.loginCode === loginCode ? true : false;
    if (!isVerify) {
      return false;
    }
    return omit(account.toJSON(), "password", "loginCode");
  } catch (e) {
    log.error(e);
    return false;
  }
}
