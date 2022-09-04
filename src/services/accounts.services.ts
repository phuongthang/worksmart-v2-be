import { omit } from "lodash";
import log from "../logs/log";
import Accounts, { IAccounts } from "../models/accounts.models";
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
    return omit(account.toJSON(), "password");
  } catch (e) {
    log.error(e);
    return false;
  }
}
