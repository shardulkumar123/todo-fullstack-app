import dotenv from "dotenv";
import createServer from "./app";
import { connectPostgres } from "./config/database";

dotenv.config();
const port = process.env.PORT || 5000;
const app = createServer();

if (process.env.POSTGRES_HOST) {
  try {
    connectPostgres()

    app.listen(port, (): void => {
      console.info(`Connected successfully on port http://localhost:${port}`);
    });
  } catch (error) {
    console.error(`Error occured: ${(error as any).message}`);
  }
}
