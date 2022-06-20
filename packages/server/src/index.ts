import express, { Application } from "express";
import * as bodyParser from "body-parser";
import { router } from "./routes/router";
import DbConnector from "./DbConnector";
import cors from "cors";
import helmet from "helmet";
// import redisClient from "./helpers/redis/redisClientLoader";

const app: Application = express();

// Call midlewares
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
// redisClient.connect();


const PORT = process.env.port || 6000;
app.listen(PORT, () => {
  console.log("Express server listening on port 127.0.0.1:" + PORT);
});

router(app);
const dbURL = "mongodb://mongo:27017/dashtyad";
DbConnector(dbURL);
