import bcrypt from "bcrypt";

export async function comparePassword(password: string, passwordConfirm: string) {
  return bcrypt.compareSync(password, passwordConfirm);
}
