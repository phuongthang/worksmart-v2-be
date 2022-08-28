import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import path from "path";
import morgan from "morgan";
import { createStream, RotatingFileStream } from "rotating-file-stream";
import initAppRoutes from "./src/routes/init.routes";
import database from "./src/configs/db.configs";

dotenv.config();
database.connectDatabase();

const port: string | number = process.env.PORT || 3001;
const isProduction: boolean = process.env.NODE_ENV === "production";

const app: Application = express();
app.use(helmet({ crossOriginResourcePolicy: false }));

const accessLogStream: RotatingFileStream = createStream("access.log", {
  interval: "1d",
  path: path.join(__dirname, "log"),
});
app.use(isProduction ? morgan("combined", { stream: accessLogStream }) : morgan("dev"));
app.use(cors());
app.use(express.json());

initAppRoutes(app);

app.listen(port, () => {
  console.log(`Server running port ${port}`);
});
