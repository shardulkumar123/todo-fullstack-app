import express, { Application } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";
import userRouter from "./routes/users";
import itemsRouter from './routes/items'

const createServer = (): express.Application => {
  const app: Application = express();

  app.use(express.json());
  app.use(cors());
  app.use(express.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.use("/api/user", userRouter);
  app.use("/api/item", itemsRouter);

  app.use(cookieParser());

  app.get("/", (_req, res) => {
    res.status(200).send("Hello World!");
  });

  return app;
};

export default createServer;
