import express, { Application } from "express";
import * as bodyParser from "body-parser";
import { router } from "./routes/router";
import DbConnector from "./DbConnector";
const app: Application = express();
app.use(bodyParser.json());

const PORT = process.env.port || 6000;
app.listen(PORT, () => {
  console.log("Express server listening on port " + PORT);
});

router(app);
const dbURL = "mongodb://localhost:27017/dashtyad";
DbConnector(dbURL);
