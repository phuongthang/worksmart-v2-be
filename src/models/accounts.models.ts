import mongoose from "mongoose";

const { Schema } = mongoose;

export interface IAccounts extends mongoose.Document {
  userName: string;
  email: string;
  password: string;
  loginCode: string;
  role: string;
  fullName: string;
  avatar: string;
  description: string;
  dob: Date;
  gender: string;
  isLoginFirstTime: number;
  isLock: number;
  createdAt: Date;
  updatedAt: Date;
}

const Account = new Schema(
  {
    userName: { type: String },
    email: { type: String },
    password: { type: String },
    loginCode: { type: String },
    role: { type: Number },
    fullName: { type: String },
    avatar: { type: String },
    description: { type: String },
    dob: { type: Date },
    gender: { type: Number },
    isLoginFirstTime: { type: Number, default: 1 },
    isLock: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const Accounts = mongoose.model<IAccounts>("Accounts", Account, "accounts");

export default Accounts;
